export default async function getHotelManage(hotelid, type, month) {
  let url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/dashboard/hotels/manage/details/${hotelid}?`;
  if (type !== null || "") url += `type=${type}&`;
  if (month !== null || "" || undefined) url += `month=${month}&`;

  return await fetch(url, {
    method: "GET",
    credentials: "include",
    withCredentials: true,
  }).then((res) => res.json());
}
