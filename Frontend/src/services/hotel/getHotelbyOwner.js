import { CheckStatus } from "@/utils/validation";

export default async function getHotelbyOwner() {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel/getOwnerHotel`;
  const option = {
    method: "GET",
    credentials: "include",
    withCredentials: true,
  };

  try {
    return await fetch(url, option).then((resp) => {
      if (CheckStatus(resp.json)) return resp.json();
      return false;
    });
  } catch (e) {
    console.log(e);
  }
}
