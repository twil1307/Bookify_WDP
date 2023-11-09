const getType = (type) => {
  switch (type) {
    case "0":
      return "incoming";
    case "1":
      return "pending";
    case "2":
      return "booked";
    case "3":
      return "checkout";
    default:
      return "";
  }
};

export default async function GetAllBooking(hotelId, type) {
  const url = `http://localhost:${
    process.env.REACT_APP_BACK_END_PORT
  }/dashboard/hotels/manage/booking/${hotelId}?type=${getType(type)}`;
  const data = await fetch(url, {
    method: "GET",
    credentials: "include",
    withCredentials: true,
  })
    .then((res) => res.json())
    .then((data) => data);
  return data;
}
