import { CheckStatus } from "@/utils/validation";

export default async function getHotelType() {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel/type`;
  const option = {
    method: "GET",
    credentials: "include",
    withCredentials: true,
  };
  return await fetch(url, option).then((resp) => {
    if (CheckStatus(resp.json)) {
      //   console.log(resp.json().types);
      return resp.json();
    }
    CheckStatus(resp.json);
  });
}
