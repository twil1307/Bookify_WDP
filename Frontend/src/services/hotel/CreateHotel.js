import { CheckStatus } from "@/utils/validation";
import { types } from "./searchHotelTypes";

export default async function CreateHotel(
  amenities,
  basicHotelInfor,
  backgroundImage,
  roomImages,
  viewImages,
  extraInfor,
  roomInfor,
  roomType
) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel`;
  const hotelForm = new FormData();
  console.log(roomType);
  const roomsType = roomType.map((e) => {
    return {
      roomPrice: e.price,
      bedType: e.bedType,
      bedNum: e.numberOfBed,
      bathroomType: e.bathroomType,
      bathNum: e.numberOfBathroom,
      maxGuest: e.numberOfGuests,
      bedroomNum: e.numberOfRoom,
      isbathPrivate: e.isPrivateBathRoom,
      roomNumber: e.rooms,
    };
  });
  hotelForm.append("hotelType", basicHotelInfor.hotelType._id);
  hotelForm.append("hotelName", basicHotelInfor.name);
  hotelForm.append("backgroundImage", backgroundImage);
  hotelForm.append("description", basicHotelInfor.description);
  hotelForm.append("country", basicHotelInfor.country);
  hotelForm.append("district", basicHotelInfor.province);
  hotelForm.append("city", basicHotelInfor.district);
  hotelForm.append("address", basicHotelInfor.address);
  hotelForm.append("amenities", JSON.stringify(amenities));
  hotelForm.append("roomType", JSON.stringify(roomsType));
  hotelForm.append("accessibility", JSON.stringify([]));
  hotelForm.append("additionalFee", JSON.stringify([]));
  hotelForm.append("voucher", JSON.stringify([]));
  hotelForm.append("rules", JSON.stringify([]));
  hotelForm.append("restrictCheckInDate", JSON.stringify([]));

  if (roomImages) {
    for (const file of roomImages) {
      console.log(file);
      hotelForm.append("hotelImage", file);
    }
  } else {
    hotelForm.append("hotelImage", null);
  }

  if (viewImages) {
    for (const filetest of viewImages) {
      console.log(filetest);
      hotelForm.append("viewImage", filetest);
    }
  } else {
    hotelForm.append("viewImage", null);
  }
  hotelForm.append(
    "checkin",
    extraInfor.checkin.hour + ":" + extraInfor.checkin.minutes
  );
  hotelForm.append(
    "checkout",
    extraInfor.checkout.hour + ":" + extraInfor.checkout.minutes
  );
  hotelForm.append(
    "closing",
    extraInfor.closing.hour + ":" + extraInfor.closing.minutes
  );
  hotelForm.append(
    "opening",
    extraInfor.opening.hour + ":" + extraInfor.opening.minutes
  );
  hotelForm.append("isCamera", extraInfor.isAllowPet);
  hotelForm.append("isAnimalAccept", extraInfor.isHasCamera);

  const option = {
    method: "POST",
    body: hotelForm,
    credentials: "include",
    withCredentials: true,
  };
  return await fetch(url, option).then((resp) => {
    return resp.json();
  });
}
