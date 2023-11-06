import { data } from "./FakeHistoryData";

const monthsKey = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getLabelAndData(month) {
  let labels = [];
  let dataLabel = [];
  let hotelData = [];
  data
    .filter((item) => splitTime(item.time) === month)
    .map((hotel) => {
      labels.push(getDay(hotel.time));
      dataLabel.push(hotel.price);
      hotelData.push(hotel);
    });

  return {
    labels,
    dataLabel,
    hotelData,
  };
}

function splitTime(date) {
  if (!date) {
    return;
  }
  const dateValue = date?.split("-")[1];

  const month = dateValue.split("/")[1];

  return monthsKey[parseInt(month) - 1];
}

function getDay(date) {
  if (!date) {
    return;
  }
  const dateValue = date.split("-")[1];

  const day = dateValue.split("/")[0];

  return day;
}
