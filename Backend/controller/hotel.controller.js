const Hotel = require("../models/Hotel");
const HotelType = require("../models/HotelType");
const Booking = require("../models/Booking");
const Review = require("../models/Review");
const Room = require("../models/Room");
const Reports = require("../models/Report");

require("dotenv").config();
const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fileDelete = require("../utils/fileDelete");
const { getUnavailableDateRanges } = require("../service/bookingService");
const {
  getAmenitiesInsertNotDuplicate,
  getListAmenityDuplicatedId,
  addNewAmenityNotExisted,
  addNewRooms,
  retrieveNewHotelImage,
  retrieveNewHotelImagePath,
  getAveragePoint,
  addNewHotelAccessibility,
  retrieveRestrictDate,
  addNewRoomType,
} = require("../service/hotelService");
const RoomType = require("../models/RoomType");
const Accessibility = require("../models/Accessibility");
const Voucher = require("../models/Voucher");

module.exports.signNewHotel = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const imagesPath = retrieveNewHotelImagePath(req);
  try {
    // Get image paths only for backgroundImage
    const { backgroundImage, hotelImages, viewImages } =
      retrieveNewHotelImage(req);

    // parse data
    const hotelSign = new Hotel(req.body);
    // let roomTypeSign = new RoomType(req.body);
    const { roomNum, ...rest } = req.body;

    let roomTypeSign = {
      hotelId: hotelSign._id,
      ...rest,
    };

    let roomTypeSign2 = JSON.parse(JSON.stringify(eval(req.body.roomType)));

    // retrieve amentities from req.body
    const hotelAmenitySign = JSON.parse(
      JSON.stringify(eval(req.body.amenities))
    );

    // retrieve Accessibility from req.body
    const hotelAccessibilitySign = JSON.parse(
      JSON.stringify(eval(req.body.accessibility))
    );

    // retrieve rules from req.body
    const hotelRulesSign = JSON.parse(JSON.stringify(eval(req.body.rules)));

    // retrieve additional fee from req.body
    const hotelAdditionalFeeSign = JSON.parse(
      JSON.stringify(eval(req.body.additionalFee))
    );

    // retrieve Restrict CheckIn Date from req.body
    const hotelRestrictCheckInDateSign = JSON.parse(
      JSON.stringify(eval(req.body.restrictDate || []))
    );

    // retrieve voucher from req.body
    const hotelVoucherSign = JSON.parse(req.body.voucher);

    // pushing data to Hotel missing data
    hotelSign.user = req.user._id;
    hotelSign.backgroundImage = backgroundImage;
    hotelImages.forEach((element) => {
      hotelSign.images.push(element);
    });
    viewImages.forEach((element) => {
      hotelSign.images.push(element);
    });

    // get new amenities which is not existed in the DB
    const newAmenities = await getAmenitiesInsertNotDuplicate(hotelAmenitySign);

    // get list id of existed amenties in DB
    const listExistedAmenitiesAdd = await getListAmenityDuplicatedId(
      hotelAmenitySign,
      newAmenities
    );

    // Add new amenities (not existed) return ID
    const newAmenitiesId = await addNewAmenityNotExisted(newAmenities, session);

    // Pass existed amenities ids and new amenities ids
    hotelSign.hotelAmenities = [...listExistedAmenitiesAdd, ...newAmenitiesId];

    // Add new hotel voucher
    if (hotelVoucherSign) {
      const voucher = new Voucher(hotelVoucherSign);
      const voucherId = await voucher.save();
      hotelSign.Vouchers.push(voucherId);
    }

    // Add new hotel accessibility
    const newAccessibility = await addNewHotelAccessibility(
      hotelAccessibilitySign,
      session
    );

    hotelSign.accessibility = newAccessibility;

    // Add new hotel additional fee
    hotelSign.additionalFee = hotelAdditionalFeeSign;

    // Add new hotel rules
    hotelSign.rules = hotelRulesSign;

    // Add restrict check in date
    const restrictDate = retrieveRestrictDate(hotelRestrictCheckInDateSign);
    hotelSign.restrictCheckInDate = restrictDate;

    // add new room type
    // const newRoomTypeData = new RoomType(roomTypeSign);
    // await newRoomTypeData.save();
    // const { _id, ...roomType } = newRoomTypeData;

    // hotelSign.roomType = roomType;
    const { listId, roomTypeData } = await addNewRoomType(
      roomTypeSign2,
      session
    );
    hotelSign.roomType = listId;

    // add new room
    const listRoomId = await addNewRooms(
      hotelSign._id,
      listId,
      roomTypeSign2,
      session
    );

    hotelSign.Rooms = [...listRoomId.flat()];

    // Saving new hotel
    const hotelSignComplete = await hotelSign.save();

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "Sign up new Hotel successfully",
      data: {
        hotel: hotelSignComplete,
      },
    });
  } catch (error) {
    console.log(error);

    fileDelete(imagesPath);
    await session.abortTransaction();

    session.endSession();

    if (error.code === 11000) {
      return res.status(401).json({
        message: "Hotel name is existed",
      });
    } else {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
};

module.exports.signNewHotelType = async (req, res) => {
  try {
    const hotelTypeSign = new HotelType(req.body);

    const newType = await hotelTypeSign.save();

    if (newType) {
      return res.status(200).json({
        message: "Sign new hotel type successfully",
        data: {
          hotelType: newType,
        },
      });
    } else {
      return res.status(500).json({
        message: "Couldn't sign new hotel type",
      });
    }
  } catch (error) {
    console.log(error);
    // Handle the error here
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getHotelTypes = catchAsync(async (req, res) => {
  const hotelTypes = await HotelType.find({});
  return res.status(200).json({
    types: hotelTypes,
  });
});

module.exports.getOwnerHotel = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const hotel = await Hotel.findOne({ user: userId });

  return res.status(200).json({
    hotel: hotel,
  });
});

module.exports.getHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.hotelId)
    .populate("hotelType")
    .populate({
      path: "user",
      select: "username subName name avatar createdAt",
    })
    .populate("hotelAmenities", "-createdAt -updatedAt")
    .populate("roomType")
    .populate("reviews")
    .populate("Vouchers")
    .populate({
      path: "accessibility",
      // populate: {
      //   path: "type",
      //   model: "AccessibilityType",
      // },
    })
    .populate("rating");

  const data = await getAveragePoint(hotel.reviews);

  hotel.rating = data;

  const bookedDate = await getUnavailableDateRanges(req.params.hotelId);

  if (hotel) {
    return res.status(200).json({
      hotel: hotel,
      fullyBookedDates: getExtractNewFormatDate(bookedDate),
    });
  } else {
    return next(new AppError("Hotel not found", 404));
  }
});

module.exports.getHotel2 = catchAsync(async (req, res, next) => {
  // const pipeline = [
  //   {
  //     $match: {
  //       _id: new mongoose.Types.ObjectId(req.params.hotelId),
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "user",
  //       foreignField: "_id",
  //       as: "owner",
  //     },
  //   },
  //   {
  //     $unwind: "$Rooms",
  //   },
  //   {
  //     $lookup: {
  //       from: "rooms",
  //       localField: "Rooms",
  //       foreignField: "_id",
  //       as: "hotelRoom",
  //     },
  //   },
  // ];

  const pipeline2 = [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        "user.username": 1,
        "user.subName": 1,
        "user.name": 1,
        "user.avatar": 1,
        "user.createdAt": 1,
      },
    },
  ];

  const hotelFind = await Review.aggregate(pipeline2);

  const avgPoint = await Hotel.calculateAveragePoints(req.params.hotelId);

  // const hotelFind2 = await Hotel.find({ isVerified: false });

  return res.json({
    avgPoint: avgPoint,
  });
});

const getExtractNewFormatDate = (bookedDate) => {
  return bookedDate.map((date) => {
    const [month, day, year] = date.split("/");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;
    return formattedDate;
  });
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

module.exports.getAllHotels = catchAsync(async (req, res, next) => {
  const DEFAULT_PAGE_LIMIT = 10;
  // Get all hotels
  const findHotelQuery = Object.keys(req.query).reduce(
    (acc, key) => {
      const queryParamValue = req.query[key];
      console.log(req.query[key]);
      if (queryParamValue != null) {
        if (queryParamValue.startsWith("[")) {
          return {
            ...acc,
            [key]: {
              $all: JSON.parse(queryParamValue).map((condition) => {
                return { _id: condition };
              }),
            },
          };
        } else if (key === "checkIn" || key === "checkOut" || key === "page") {
          return acc;
        } else if (key === "roomType.minPrice") {
          return {
            ...acc,
            "roomType.roomPrice": {
              $gte: parseInt(queryParamValue),
              ...acc["roomType.roomPrice"],
            },
          };
        } else if (key === "roomType.maxPrice") {
          return {
            ...acc,
            "roomType.roomPrice": {
              $lte: parseInt(queryParamValue),
              ...acc["roomType.roomPrice"],
            },
          };
        } else if (key === "roomType.maxGuest") {
          return {
            ...acc,
            [key]: { $gte: parseInt(queryParamValue) },
          };
        } else {
          return {
            ...acc,
            [key]: isNaN(queryParamValue)
              ? queryParamValue
              : parseInt(queryParamValue),
          };
        }
      }

      return acc;
    },
    {
      isVerified: "true",
    }
  );

  console.log(findHotelQuery);

  let hotels = await Hotel.find(findHotelQuery)
    .sort({ createdAt: "desc" })
    .skip(req.query.index ? req.query.index * DEFAULT_PAGE_LIMIT : 0)
    .limit(DEFAULT_PAGE_LIMIT)
    .select("_id hotelName country district address averagePrice rating images")
    .populate({ path: "hotelAmenities" });

  const { checkIn, checkOut } = req.query;

  if (checkIn && checkOut) {
    const filtered = await Promise.all(
      hotels.map((hotel) =>
        getHotelsStatusWithCheckInAndCheckOut(
          hotel,
          new Date(checkIn),
          new Date(checkOut)
        )
      )
    );
    hotels = hotels.filter((_, index) => !filtered[index]);
  }

  // Randomly select 3 images for each hotel
  const hotelsWithRandomImages = hotels.map((hotel) => {
    const randomImages = hotel.images
      .sort(() => 0.5 - Math.random()) // sort images array by an random way
      .slice(0, 3);
    return { ...hotel._doc, images: randomImages };
  });

  if (hotels) {
    return res.status(200).json({ hotels: hotelsWithRandomImages });
  } else {
    return next(new AppError("Hotels not found", 404));
  }
});

const getHotelsStatusWithCheckInAndCheckOut = async (
  hotel,
  checkIn,
  checkOut
) => {
  const rooms = await Room.find({
    hotelId: hotel._id,
  })
    .select("_id")
    .sort({ _id: 1 });

  const roomId = rooms.map(({ _id }) => _id);

  // Filter out _id only
  // Get all (distinct) the rooms Ids which is overlapped in the check in and check out date range
  const bookingCheck = await Booking.distinct("roomId", {
    $and: [
      {
        $or: [
          {
            $and: [
              { checkin: { $lte: checkIn } },
              { checkout: { $gte: checkOut } },
            ],
          },
          {
            $and: [
              { checkin: { $lte: checkIn } },
              { checkout: { $lt: checkOut, $gt: checkIn } },
            ],
          },
          {
            $and: [
              { checkin: { $lt: checkOut, $gt: checkIn } },
              { checkout: { $gte: checkOut } },
            ],
          },
          {
            $and: [
              { checkin: { $gt: checkIn } },
              { checkout: { $lt: checkOut } },
            ],
          },
        ],
      },
      {
        hotelId: hotel._id,
      },
    ],
  });

  return JSON.stringify(bookingCheck) === JSON.stringify(roomId);
};

module.exports.reviewHotel = catchAsync(async (req, res, next) => {
  // Get all hotels

  // Can use another way call "Using bulk write operations"
  const reviewObj = new Review(req.body);

  reviewObj.hotelId = req.params.hotelId;
  reviewObj.user = req.user._id;

  const hotel = await Hotel.findById(req.params.hotelId);

  if (hotel) {
    await reviewObj.save();

    await hotel.reviews.push(reviewObj._id);

    await hotel.save();

    return res.status(200).json({ message: "Review successfully" });
  } else {
    return next(new AppError("Hotels not found", 404));
  }
});

module.exports.reportHotel = catchAsync(async (req, res, next) => {
  // Can use another way call "Using bulk write operations"
  const reportObj = new Reports(req.body);
  reportObj.hotelId = req.params.hotelId;
  reportObj.user = req.user._id;

  const hotel = await Hotel.findById(req.params.hotelId);
  if (hotel) {
    await reportObj.save();

    return res
      .status(200)
      .json({ message: "Your report has been sent successfully" });
  } else {
    return next(new AppError("Hotels not found", 404));
  }
});

module.exports.reportHotel = catchAsync(async (req, res, next) => {
  // Can use another way call "Using bulk write operations"
  const reportObj = new Reports(req.body);
  reportObj.hotelId = req.params.hotelId;
  reportObj.user = req.user._id;

  const hotel = await Hotel.findById(req.params.hotelId);
  if (hotel) {
    await reportObj.save();

    return res
      .status(200)
      .json({ message: "Your report has been sent successfully" });
  } else {
    return next(new AppError("Hotels not found", 404));
  }
});

module.exports.getReviewsByAveragePoint = catchAsync(async (req, res, next) => {
  // Get all reviews
  const averagePoint = req.params.averagePoint;
  const reviews = await Review.find({ averagePoint: averagePoint });

  return res.status(200).json({
    data: reviews,
  });
});

module.exports.deleteHotel = catchAsync(async (req, res, next) => {
  const hotelId = req.params.hotelId;

  const hotelDelete = await Hotel.findByIdAndDelete(hotelId);

  const listImage = hotelDelete.images.map(
    (image) => "public/" + image.imagePath
  );

  fileDelete(listImage);

  // Get all reviews
  const roomsDelete = await RoomType.deleteMany({
    _id: { $in: hotelDelete.roomType },
  });

  const reviewsDelete = await Review.deleteMany({
    _id: { $in: hotelDelete.reviews },
  });

  return res.status(200).json({
    message: "Delete successfully completed",
    data: { roomsDelete, hotelDelete, reviewsDelete },
  });
});

module.exports.checkIsUserEverStayHere = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const hotelId = req.params.hotelId;

  const userBooking = await Booking.find({
    user: userId,
    hotelId: hotelId,
  });

  if (userBooking && userBooking.length > 0) {
    return res.status(200).json({
      message: "User stayed here",
    });
  } else {
    return res.status(405).json({
      message: "You have'nt stayed here before",
    });
  }
});

module.exports.signNewHotelAccessibility = catchAsync(
  async (req, res, next) => {
    // Get all hotels

    // Can use another way call "Using bulk write operations"
    const accessibilityObj = new Accessibility(req.body);

    const hotel = await Hotel.findById(req.hotelId);

    if (hotel) {
      await reviewObj.save();

      await hotel.reviews.push(reviewObj._id);

      await hotel.save();

      return res.status(200).json({ message: "Review successfully" });
    } else {
      return next(new AppError("Hotels not found", 404));
    }
  }
);

module.exports.updateHotel = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const imagesPath = retrieveNewHotelImagePath(req);
  try {
    const hotelIdUpdate = req.params.hotelId;

    // Get image paths only for backgroundImage`

    // Khi gui 1 list array image moi ve server (bao gom nhung cai moi va cu) xu li the nao
    const { backgroundImage, hotelImages, viewImages } =
      retrieveNewHotelImage(req);

    // parse data
    // const hotelUpdate = new Hotel(req.body);
    const { amenities, roomType, hotelImage, viewImage, ...basicHotelInfo } =
      req.body;

    req.body.amenities = JSON.parse(req.body.amenities);

    // update basic info
    const newHotelInfo = await Hotel.findByIdAndUpdate(
      hotelIdUpdate,
      basicHotelInfo,
      { new: true }
    );

    // update hotel amenities

    return res.status(200).json({
      message: "Successfully",
      data: {
        newHotelInfo,
      },
    });
  } catch (error) {
    console.log(error);

    fileDelete(imagesPath);
    await session.abortTransaction();

    session.endSession();

    if (error.code === 11000) {
      return res.status(401).json({
        message: "Hotel name is existed",
      });
    } else {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
});
