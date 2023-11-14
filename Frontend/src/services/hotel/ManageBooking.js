export default async function ManageBooking(state, id) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/dashboard/booking/${state}/${id} `;
  const option = {
    method: "PUT",
    credentials: "include",
    withCredentials: true,
  };
  return await fetch(url, option).then((res) => res.json());
}
