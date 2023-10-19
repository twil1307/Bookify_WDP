import { CheckStatus } from "@/utils/validation";
import { format } from "date-fns";

export default async function bookingRoom(selectDays, guests, hotelId, price) {
  console.log(selectDays, guests, hotelId, price);
  const { from, to } = selectDays;
  const { adult, child, infant, pet } = guests;
  const dateFormatOption = "yyyy-MM-dd";
  const bookingData = new FormData();
  bookingData.append("hotelId", hotelId);
  bookingData.append("checkin", from);
  bookingData.append("checkout", to);
  bookingData.append("adult", adult);
  bookingData.append("child", child);
  bookingData.append("infant", infant);
  bookingData.append("price", price);
  bookingData.append("pet", pet);

  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/booking`;
  const data = await fetch(url, {
    method: "POST",
    body: bookingData,
    credentials: "include",
    withCredentials: true,
  }).then((res) => {
    if (CheckStatus(res.status)) return res.json();
    return false;
  });
  return data;
}
