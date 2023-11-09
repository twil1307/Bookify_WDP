const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");
const BankingAccount = require("../models/BankingAccount");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const BookingDetail = require("../models/BookingDetail");
const Room = require("../models/Room");
const { groupRoomIdBy } = require("../service/bookingService");
const RoomType = require("../models/RoomType");

module.exports.bookingRoom = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bookingRequest = new BookingDetail(req.body);
    const bookingRequest2 = new BookingDetail();
    bookingRequest2.user = req.user._id;

    const bookingRoomRequestData = JSON.parse(req.body.bookingDetail);

    // Check if user do not provide any room
    if (!bookingRoomRequestData || bookingRoomRequestData.length === 0) {
      throw new AppError("Pick a room please!", 400);
    }

    // get hotel Id
    const hotelId = bookingRoomRequestData[0].hotelId;

    // get out list room type booking request
    const bookingRoomRequest = []; // list type request (include a whole booking detail model)
    const roomTypeRequestId = []; // list room type id
    const bookingDetailIds = []; // get out the list of booking detail because when create a new instance of bookingdetail it will give out an _id
    let totalCost = 0;

    bookingRoomRequestData.forEach((bookingData) => {
      const bookingObjData = new BookingDetail(bookingData);
      bookingObjData.user = req.user._id;
      // change date time (default sooner 1 day ?due to Z?)
      bookingObjData.checkin = new Date(bookingData.checkin + "Z");
      bookingObjData.checkout = new Date(bookingData.checkout + "Z");

      // counting total cost
      totalCost += bookingObjData.price;

      // extract room type array
      roomTypeRequestId.push(bookingData.roomType);
      bookingRoomRequest.push(bookingObjData);
      bookingDetailIds.push(bookingObjData._id);
    });

    // find rooms by room type
    const allRoomsIdByRoomType = await Room.find(
      {
        roomTypeId: { $in: roomTypeRequestId },
      },
      {
        roomTypeId: 1, // Include 'roomTypeId'
        _id: 1, // Include '_id'
      }
    );

    // group room with roomTypeId is key and roomId is array value
    const groupedRoomIdByRoomType = groupRoomIdBy(allRoomsIdByRoomType);

    // filter the date which is overlap in the date range
    const bookedDateInRange = {};
    for (let i = 0; i < bookingRoomRequest.length; i++) {
      bookedDateInRange[`${bookingRoomRequest[i].roomType}`] =
        await bookingDateDuplicateCheck(
          bookingRoomRequest[i].checkin,
          bookingRoomRequest[i].checkout,
          bookingRoomRequest[i].hotelId,
          bookingRoomRequest[i].roomType
        );
    }

    // Get all available room (filter out the roomid )
    const availableRooms = {}; // no need this time
    const roomCheckIsFullyBooked = []; // error array
    for (let i = 0; i < roomTypeRequestId.length; i++) {
      const availableRoomId = compareRoomFilterId(
        groupedRoomIdByRoomType[roomTypeRequestId[i]],
        bookedDateInRange[roomTypeRequestId[i]]
      );

      // if the room type is fully booked push into an error array
      if (!availableRoomId || availableRoomId.length === 0) {
        const roomTypeName = await RoomType.findById(
          roomTypeRequestId[i]
        ).select("bedType bathroomType roomPrice");

        roomCheckIsFullyBooked.push(
          `The room type number ${i + 1} (${roomTypeName}) is fully booked`
        );
        continue;
      }

      availableRooms[roomTypeRequestId[i]] = availableRoomId;
      bookingRoomRequest[i].roomId = availableRoomId[0];
    }

    if (roomCheckIsFullyBooked.length > 0) {
      return res.status(400).json({
        error: roomCheckIsFullyBooked.join(", ") + ". Please pick another one!",
      });
    }

    // saving booking detail action
    await BookingDetail.insertMany(bookingRoomRequest, {
      session, // pass this attribute for aborting saving action when there is error
    });

    // saving booking here (not booking detail) ===============================================
    const guessBookingRequest = new Booking();
    guessBookingRequest.bookingDetail = bookingDetailIds;
    guessBookingRequest.user = req.user._id;
    guessBookingRequest.hotelId = hotelId;
    console.log(guessBookingRequest);

    guessBookingRequest.save({ session });

    // minus user money
    const bankingAccount = await BankingAccount.findById(
      req.user.bankingAccountNumber
    );

    if (bankingAccount.amount - totalCost < 0) {
      return res.status(400).json({
        error: "Your account doesn't have enough balance",
      });
    }

    await BankingAccount.findByIdAndUpdate(
      req.user.bankingAccountNumber,
      {
        $inc: { amount: -totalCost },
      },
      { session }
    );

    // // save transact history
    // await transact.save();

    // save booking to db
    // await bookingRequest.save();

    // await session.abortTransaction();

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Your booking has been successfully",
      booking: guessBookingRequest,
    });
  } catch (error) {
    console.log("Aborting booking request");

    await session.abortTransaction();

    session.endSession();

    next(error);
  }
});

// Compare 2 array
// Check if rooms id is equal to the rooms of overlap day, if equals => all the rooms in the date range are booked
// else => get out all the not booked room and set the first room to guest
const compareRoomFilterId = (hotelRoomIds, bookingCheck) => {
  const roomAvailable = hotelRoomIds.filter((element) =>
    bookingCheck.every((item) => item.toString() !== element.toString())
  );
  return roomAvailable;
};

// basically get all the room booked in the date range checkin and checkout given
const bookingDateDuplicateCheck = async (
  checkin,
  checkout,
  hotelId,
  roomType
) => {
  const bookingCheck = await BookingDetail.distinct("roomId", {
    $and: [
      {
        $or: [
          {
            $and: [
              { checkin: { $lte: checkin } },
              { checkout: { $gte: checkout } },
            ],
          },
          {
            $and: [
              { checkin: { $lte: checkin } },
              {
                checkout: {
                  $lt: checkout,
                  $gt: checkin,
                },
              },
            ],
          },
          {
            $and: [
              {
                checkin: {
                  $lt: checkout,
                  $gt: checkin,
                },
              },
              { checkout: { $gte: checkout } },
            ],
          },
          {
            $and: [
              { checkin: { $gt: checkin } },
              { checkout: { $lt: checkout } },
            ],
          },
        ],
      },
      {
        roomType: roomType,
      },
      {
        hotelId: hotelId,
      },
    ],
  });

  return bookingCheck;
};
