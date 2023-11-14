import { CheckStatus } from "@/utils/validation";

export default async function checkHotelBook(_id) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel/${_id}/isUserEverStayHere`;
  const option = {
    method: "GET",
    credentials: "include",
    withCredentials: true,
  };
  try {
    return await fetch(url, option).then((resp) => {
      return resp.status;
    });
  } catch (e) {
    console.log(e);
  }
}
