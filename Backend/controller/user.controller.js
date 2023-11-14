const User = require("../models/User");
const { hashPassword, comparePassword } = require("../service/passwordService");
const {
  generateAccessToken,
  generateRefreshToken,
  expireTokens,
} = require("../service/jwtService");
const {
  getUserBookingHistoryTypeAll,
  getUserBookingHistoryTypeToday,
  getUserBookingHistoryTypeBooked,
  getUserBookingHistoryTypeCanceled,
} = require("../service/userService");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const BankingAccount = require("../models/BankingAccount");
const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

module.exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select("-password");

  if (user) {
    return res.status(200).json(user);
  } else {
    return next(new AppError("User not found", 404));
  }
});

module.exports.signUpUser = catchAsync(async (req, res, next) => {
  // check existed user
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    // return res.status(422).json({ error: "Username already exists" });
    return next(new AppError("Username already exists", 422));
  }

  // Hash user password
  const userObj = new User(req.body);
  const hashedPassword = await hashPassword(userObj.password);
  userObj.password = hashedPassword;

  // Save user
  await userObj.save();
  return res.status(200).json({
    message: "User saved successfully",
  });
});

module.exports.updateUser = catchAsync(async (req, res, next) => {
  const file = req.file;
  let imageUrl = null;
  const userObj = req.body;
  if (file) {
    imageUrl = file.path;
    userObj.avatar = imageUrl.split("public")[1].replaceAll("\\", "/");
  }
  if (userObj.dob) {
    userObj.dob = new Date(userObj.dob).toDateString();
  }
  const userId = req.user._id;

  const newUser = await User.findByIdAndUpdate(userId, userObj, { new: true });
  return res.status(200).json({
    user: newUser,
  });
});

module.exports.updateUserBankingAccount = catchAsync(async (req, res, next) => {
  console.log(req.body.bankingAccountNumber);

  const bankingAccount2 = await BankingAccount.find({
    bankingAccountNumber: req.body.bankingAccountNumber,
  });

  if (!bankingAccount2) {
    return res.status(404).send({
      message: "Banking account is not existed",
    });
  }

  const newUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { bankingAccountNumber: bankingAccount2._id } },
    { new: true }
  );

  return res.status(200).json({
    user: newUser,
  });
});

module.exports.logIn = catchAsync(async (req, res, next) => {
  const userObj = new User(req.body);

  const user = await User.findOne({ username: userObj.username });

  console.log(user);

  if (user) {
    const result = await comparePassword(userObj.password, user.password);

    if (!result) {
      return next(new AppError("Password is incorrect", 403));
    } else {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      return res
        .status(200)
        .cookie("accessToken", "Bearer " + accessToken, {
          httpOnly: true,
          secure: false,
        })
        .cookie("refreshToken", "Refresh " + refreshToken, {
          httpOnly: true,
          secure: false,
        })
        .json({
          message: "Login successfully",
          user: {
            _id: user._id,
            role: user.role,
            username: user.username,
            displayName: `${user.subName} ${user.name}`,
            hotelBookmarked: user.hotelBookmarked,
            bankingAccount: user.bankingAccountNumber || null,
          },
        });
    }
  } else {
    return next(new AppError("No user found", 404));
  }
});

module.exports.refreshNewTokens = (req, res, next) => {
  const { refreshToken } = req.cookies;

  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ error: "Login required" });
  }

  const token = refreshToken.replace("Refresh ", "");

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(479).json({ error: err.message });
    }

    const idFind = decoded._id;

    User.findOne({ _id: idFind })
      .then((user) => {
        if (user) {
          return user;
        } else {
          return res.status(422).json({ error: "User is not available" });
        }
      })
      .then((user) => {
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        return res
          .status(200)
          .cookie("accessToken", "Bearer " + newAccessToken, {
            httpOnly: true,
            secure: false,
          })
          .cookie("refreshToken", "Refresh " + newRefreshToken, {
            httpOnly: true,
            secure: false,
          })
          .json({
            message: "Retrieve new token successfully",
          });
      })
      .catch((err) => {
        console.log("haha");
        console.log(err);
      });
  });
};

module.exports.compareCurrentPassword = catchAsync(async (req, res, next) => {
  // Hash user password
  const passwordPlain = req.body.currentPassword;

  const { password } = await User.findById(req.user._id).select("password");

  const compareRes = await comparePassword(passwordPlain, password);

  if (compareRes) {
    return res.status(202).json({
      message: "Password matched",
    });
  } else {
    return next(new AppError("Password is incorrect", 401));
  }
});

module.exports.verifyJwtToken = catchAsync(async (req, res, next) => {
  // Hash user password
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({
      message: "Login required",
    });
  }

  const token = accessToken.replace("Bearer ", "");

  const result = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const userData = await User.findOne({ _id: result._id });

  if (userData) {
    return res.status(202).json({
      message: "User already login",
    });
  } else {
    return res.status(405).json({
      message: "User has not login yet",
    });
  }
});

module.exports.testIsTokenSave = catchAsync(async (req, res, next) => {
  console.log("Here");

  // Hash user password
  return res
    .status(200)
    .cookie("refreshToken33", "Refresh iawdhdh1982dh1928hd9182dh1892hd1982hd", {
      httpOnly: true,
      secure: false,
    })
    .json({
      message: "Retrieve new token successfully",
    });
});

module.exports.logOut = catchAsync(async (req, res, next) => {
  res.setHeader("Set-Cookie", expireTokens);

  return res.status(200).json({ message: "Log out successfully" });
});

module.exports.changePassword = catchAsync(async (req, res, next) => {
  const newPasword = req.body.newPassword;
  const userId = req.user._id;

  const newHashPassword = await hashPassword(newPasword);

  const user = await User.updateOne(
    { _id: userId },
    { $set: { password: newHashPassword } }
  );

  if (user) {
    // Clear the cookie by setting an expired token value and past expiration date
    res.setHeader("Set-Cookie", expireTokens);

    return res.status(200).json({ message: "Passwords updated successfully" });
  } else {
    return next(new AppError("Passwords updated failed", 500));
  }
});

module.exports.addOrRemoveFavorite = catchAsync(async (req, res, next) => {
  const hotelIdBookmark = req.params.hotelId;

  const hotel = await Hotel.findById(hotelIdBookmark);

  if (!hotel) {
    return res.status(400).json({
      message: "This hotel does not exist",
    });
  }

  const currentUser = await User.findById(req.user.id);

  if (!currentUser.hotelBookmarked.includes(hotelIdBookmark)) {
    currentUser.hotelBookmarked.push(hotelIdBookmark);
  } else {
    // remove hotelId when found existed in array
    currentUser.hotelBookmarked.splice(
      currentUser.hotelBookmarked.indexOf(hotelIdBookmark),
      1
    );
  }

  await currentUser.save();

  const hotels = await Hotel.find({
    _id: { $in: currentUser.hotelBookmarked },
  }).select(
    "_id hotelName country district address roomType rating backgroundImage"
  );

  return res.json({
    bookmarks: hotels,
  });
});

module.exports.enableHost = catchAsync(async (req, res, next) => {});

module.exports.updateBankAccount = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  await User.findByIdAndUpdate(userId, {
    bankingAccountNumber: req.body.bankingAccountNumber,
  });

  return res.status(200).json({
    message: "Update banking acocunt successfully",
  });
});

module.exports.getUserRemainingAmount = catchAsync(async (req, res, next) => {
  const bankingAccountId = await User.findById(req.user._id)
    .populate("bankingAccountNumber", "amount")
    .select("bankingAccountNumber -_id");

  return res.status(200).json({
    amount: bankingAccountId.bankingAccountNumber.amount,
  });
});

module.exports.getUserBookmarkedHotels = catchAsync(async (req, res, next) => {
  const hotelBookmarkedId = req.user.hotelBookmarked;

  const hotels = await Hotel.find({ _id: { $in: hotelBookmarkedId } }).select(
    "_id hotelName country district address roomType rating backgroundImage"
  );

  const bookmarkHotels = hotels.map((hotel) => {
    const { roomType, ...hotelData } = hotel._doc;

    return {
      ...hotelData,
      averagePrice: roomType.roomPrice,
    };
  });

  return res.status(200).json({
    bookmarkedHotel: bookmarkHotels,
  });
});

module.exports.getUserBookingHistory = catchAsync(async (req, res, next) => {
  const type = req.query.type;

  switch (type) {
    case "all":
      getUserBookingHistoryTypeAll(req, res, next);
      break;
    case "today":
      getUserBookingHistoryTypeToday(req, res, next);
      break;
    case "booked":
      getUserBookingHistoryTypeBooked(req, res, next);
      break;
    case "canceled":
      getUserBookingHistoryTypeCanceled(req, res, next);
      break;

    default:
      return res.status(400).json({
        message: `Invalid request, type all, today, booked, canceled is accepted only`,
      });
  }
});
