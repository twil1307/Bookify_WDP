import { CheckStatus } from "@/utils/validation";
import { format } from "date-fns";

export default async function bookingRoom(bookingDetail) {
  // console.log(bookingDetail);

  const bookingData = new FormData();
  const book = bookingDetail.map((il) => {
    return {
      aldult: il.adult,
      checkin: il.checkin,
      hotelId: il.hotelId,
      infant: il.infant,
      pet: il.pet,
      price: il.price,
      roomType: il.roomType,
      checkout: il.checkout,
      child: il.child,
    };
  });
  console.log(book);
  bookingData.append("bookingDetail", JSON.stringify(book));

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
