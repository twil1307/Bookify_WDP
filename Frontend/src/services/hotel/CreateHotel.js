import { CheckStatus } from "@/utils/validation";
import { types } from "./searchHotelTypes";

export default async function CreateHotel(
  amenities,
  basicHotelInfor,
  backgroundImage,
  roomImages,
  viewImages,
  extraInfor,
  roomInfor
) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel`;
  const hotelForm = new FormData();

  hotelForm.append("hotelType", basicHotelInfor.hotelType._id);
  hotelForm.append("hotelName", basicHotelInfor.name);
  hotelForm.append("backgroundImage", backgroundImage);
  hotelForm.append("description", basicHotelInfor.description);
  hotelForm.append("country", basicHotelInfor.country);
  hotelForm.append("district", basicHotelInfor.province);
  hotelForm.append("city", basicHotelInfor.district);
  hotelForm.append("address", basicHotelInfor.address);
  hotelForm.append("amenities", JSON.stringify(amenities));
  hotelForm.append("roomType", JSON.stringify([roomInfor]));

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
