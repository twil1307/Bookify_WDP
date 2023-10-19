import { types } from "@/services/hotel/searchHotelTypes";

const timeFormat = (time) => {
  const timeSplitted = time.split(":");
  return {
    hour: timeSplitted[0],
    minutes: timeSplitted[1],
  };
};

export default async function GetHotel(id) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel/${id}`;
  console.log(url);
  const option = {
    method: "GET",
    credentials: "include",
    withCredentials: true,
  };
  try {
    return await fetch(url, option).then((resp) => {     
      return resp.json();
    });
  } catch (e) {
    console.log(e);
  }

  // try {
  //   const data = await fetch(`http://localhost:3001/api/hotel/?id=${id}`)
  //     .then((res) => res.json())
  //     .then((data) => data);
  //   const {
  //     hotelTypeId,
  //     hotelName,
  //     backgroundImg,
  //     isAllowPet,
  //     isHasCamera,
  //     description,
  //     country,
  //     district,
  //     city,
  //     address,
  //     closing,
  //     opening,
  //     checkin,
  //     checkout,
  //     hotelAmenities,
  //     images,
  //     roomType,
  //   } = data;
  //   const basicHotelInfor = {
  //     name: hotelName,
  //     type: types.find(({ code }) => code === hotelTypeId).name,
  //     country: country,
  //     province: city,
  //     district: district,
  //     address: address,
  //     description: description,
  //   };
  //   const roomInfor = {
  //     id: roomType.id,
  //     numberOfGuests: roomType.numberOfGuests,
  //     numberOfRoom: roomType.numberOfRoom,
  //     numberOfBed: roomType.numberOfBed,
  //     numberOfBathroom: roomType.numberOfBathroom,
  //     price: roomType.price,
  //     rooms: roomType.rooms,
  //     isPrivateBathRoom: roomType.isPrivateBathroom,
  //   };
  //   const extraInfor = {
  //     isHasCamera,
  //     isAllowPet,
  //     checkin: timeFormat(checkin),
  //     checkout: timeFormat(checkout),
  //     closing: timeFormat(closing),
  //     opening: timeFormat(opening),
  //   };
  //   const viewImages = images.filter(({ type }) => type === 0);
  //   const roomImages = images.filter(({ type }) => type === 1);

  //   return {
  //     basicHotelInfor,
  //     roomInfor,
  //     extraInfor,
  //     viewImages,
  //     backgroundImg,
  //     roomImages,
  //     hotelAmenities,
  //   };
  // } catch (error) {
  //   throw new Error(error);
  // }
}
