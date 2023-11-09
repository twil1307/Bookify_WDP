export default async function GetAllTodayBooking(hotelId, type) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/dashboard/hotels/manage/booking/today/${hotelId}?type=${type}`;
  console.log(hotelId, type);
  const data = await fetch(url, {
    method: "GET",
    credentials: "include",
    withCredentials: true,
  }).then((res) => res.json());
  return data;
}
