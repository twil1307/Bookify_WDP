import { dashboarData } from "./FakeDataDashBoardAll";

export const getStatic = (month) => {
  let staticObj = {
    views: 0,
    booking: 0,
    checkOut: 0,
    rating: 0,
    register: 0,
  };
  const dataByMonth = dashboarData
    .filter((data) => data.month === month)
    .map((monthStatic) => {
      return monthStatic.details;
    });

  dataByMonth[0]?.forEach((data) => {
    staticObj.views += data.views;
    staticObj.booking += data.booking;
    staticObj.checkOut += data.checkOut;
    staticObj.rating += data.rating;
    staticObj.register += data.register;
  });

  return staticObj;
};

export const getIncreasePercent = (month) => {
  let increasePercent = {
    views: 0,
    booking: 0,
    checkOut: 0,
    rating: 0,
    register: 0,
  };

  if (month === 1) {
    return increasePercent;
  }
  // monthsKey[monthsKey.indexOf(month) - 1]
  const prevMonth = getStatic(month - 1);
  const curMonth = getStatic(month);
  increasePercent.views =
    Math.round(
      ((curMonth.views - prevMonth.views) / prevMonth.views) * 100 * 100
    ) / 100;
  increasePercent.booking =
    Math.round(
      ((curMonth.booking - prevMonth.booking) / prevMonth.booking) * 100 * 100
    ) / 100;
  increasePercent.checkOut =
    Math.round(
      ((curMonth.checkOut - prevMonth.checkOut) / prevMonth.checkOut) *
        100 *
        100
    ) / 100;
  increasePercent.rating =
    Math.round(
      ((curMonth.rating - prevMonth.rating) / prevMonth.rating) * 100 * 100
    ) / 100;
  increasePercent.register =
    Math.round(
      ((curMonth.register - prevMonth.register) / prevMonth.register) *
        100 *
        100
    ) / 100;

  return increasePercent;
};

export const typeBookingData = (month) => {
  let typeBookingObj = {
    type: [],
    numberBooking: [],
  };
  const dataByMonth = dashboarData
    .filter((data) => data.month === month)
    .map((data) => data.types);

  dataByMonth[0]?.forEach((data) => {
    typeBookingObj.type.push(data.type);
    typeBookingObj.numberBooking.push(data.numberOfBooking);
  });
  return typeBookingObj;
};

export const BookingNumberData = (month) => {
  let bookingObj = {
    day: [],
    numberBooking: [],
  };
  const dataByMonth = dashboarData
    .filter((data) => data.month === month)
    .map((data) => data.details);
  dataByMonth[0]?.forEach((data) => {
    bookingObj.day.push(data.day);
    bookingObj.numberBooking.push(data.booking);
  });
  return bookingObj;
};

export const ReportData = (month) => {
  const dataByMonth = dashboarData
    .filter((data) => data.month === month)
    .map((data) => data.report);

  return dataByMonth[0];
};

export const getIncreasePercent2 = (prevData, curData, month) => {
  let increasePercent = {
    views: 0,
    booking: 0,
    checkOut: 0,
    rating: 0,
    register: 0,
  };

  if (month === 1) {
    return increasePercent;
  }

  // prevData.numberOfPayment?.total = 1;
  // prevData.numberOfRating?.total = 1;
  // prevData.numberOfNewUser?.total = 1;
  // prevData.bookingNumber = 1;
  // prevData.numberOfNewUser?.total = 5;

  if (
    prevData?.numberOfVisitors?.total !== 0 &&
    curData?.numberOfVisitors?.total !== 0
  ) {
    increasePercent.views = parseFloat(
      (
        ((1 -
          (curData?.numberOfVisitors?.total -
            prevData?.numberOfVisitors?.total) /
            prevData?.numberOfVisitors?.total) *
          100 *
          100) /
        100
      ).toFixed(1)
    );
  }

  if (
    prevData?.numberOfBooking?.total !== 0 &&
    curData?.numberOfBooking?.total !== 0
  ) {
    increasePercent.booking = parseFloat(
      (
        ((1 -
          (curData?.numberOfBooking?.total - prevData?.numberOfBooking?.total) /
            curData?.numberOfBooking?.total) *
          100 *
          100) /
        100
      ).toFixed(1)
    );
  }

  if (
    prevData?.numberOfPayment?.total !== 0 &&
    curData?.numberOfPayment?.total !== 0
  ) {
    increasePercent.checkOut = parseFloat(
      (
        ((1 -
          (curData?.numberOfPayment?.total - prevData?.numberOfPayment?.total) /
            curData?.numberOfPayment?.total) *
          100 *
          100) /
        100
      ).toFixed(1)
    );
  }

  if (
    prevData?.numberOfRating?.total !== 0 &&
    curData?.numberOfRating?.total !== 0
  ) {
    increasePercent.rating = parseFloat(
      (
        (((curData?.numberOfRating?.total - prevData?.numberOfRating?.total) /
          prevData?.numberOfRating?.total) *
          100 *
          100) /
        100
      ).toFixed(1)
    );
  }

  if (
    prevData?.numberOfNewUser?.total !== 0 &&
    curData?.numberOfNewUser?.total !== 0
  ) {
    increasePercent.register = parseFloat(
      (
        (((curData?.numberOfNewUser?.total - prevData?.numberOfNewUser?.total) /
          prevData?.numberOfNewUser?.total) *
          100 *
          100) /
        100
      ).toFixed(1)
    );
  }

  return increasePercent;
};
