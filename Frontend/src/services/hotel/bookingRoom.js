import { CheckStatus } from "@/utils/validation";
import { format } from "date-fns";

export default async function bookingRoom(bookingDetail) {
  console.log(bookingDetail);

  const bookingData = new FormData();
  bookingData.append("bookingDetail", JSON.stringify(bookingDetail));

  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/booking`;
  const data = await fetch(url, {
    method: "POST",
    body: bookingData,
    credentials: "include",
    withCredentials: true,
  }).then((res) => {
   return res.json();
  });
  return data;
}
