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
} = require("../service/hotelService");
const RoomType = require("../models/RoomType");

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

    const hotelAmenitySign = JSON.parse(
      JSON.stringify(eval(req.body.amenities))
    );

    // pushing data to Hotel missing data
    hotelSign.user = req.user._id;
    hotelSign.backgroundImg = backgroundImage;
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

    // add new room type
    const newRoomTypeData = new RoomType(roomTypeSign);
    await newRoomTypeData.save();
    const { _id, ...roomType } = newRoomTypeData;

    hotelSign.roomType = roomType;

    // add new room
    const listRoomId = await addNewRooms(hotelSign._id, roomNum, session);

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
