export default async function checkRoomAvailable(
  hotelId,
  roomTypeId,
  checkin,
  checkout
) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel/${hotelId}/roomTypeAvaibility/${roomTypeId}`;
  const formData = new FormData();
  formData.append("checkin", checkin);
  formData.append("checkout", checkout);
  const option = {
    method: "POST",
    credentials: "include",
    body: formData,
    withCredentials: true,
  };
  return await fetch(url, option).then((resp) => resp.json());
}
