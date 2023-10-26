export default async function verifiedHotel(hotelId) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/dashboard/hotels/verify/${hotelId}`;
  const data = await fetch(url, {
    method: "PUT",
    credentials: "include",
    withCredentials: true,
  })
    .then((res) => res.json())
    .then((data) => data);
  return data;
}
