export default async function disabledHotel(hotelId) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/dashboard/hotels/disable/${hotelId}`;
  const data = await fetch(url, {
    method: "PUT",
    credentials: "include",
    withCredentials: true,
  })
    .then((res) => res.json())
    .then((data) => data);
  return data;
}
