export default async function FilterHotel(
  roomAndBedRoom,
  hotelType,
  price,
  amenitiesPicked
) {
  //   console.log(roomAndBedRoom, hotelType, price, amenitiesPicked);
  let url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel?`;

  if (hotelType != null) url += `hotelType=${hotelType}&`;
  if (amenitiesPicked.length > 0) url += `hotelAmenities=${amenitiesPicked}&`;
  if (roomAndBedRoom.rooms > 0)
    url += `roomType.bedroomNum=${roomAndBedRoom.rooms}&`;
  if (roomAndBedRoom.numberOfBed > 0)
    url += `roomType.bedNum=${roomAndBedRoom.numberOfBed}&`;
  if (roomAndBedRoom.numberOfBathroom > 0)
    url += `roomType.bathNum=${roomAndBedRoom.numberOfBathroom}&`;
  if (price.min) url += `roomType.minPrice=${price.min}&`;
  if (price.max > 0) url += `roomType.maxPrice=${price.max}&`;
  console.log(url);
  const data = await fetch(url, {
    method: "GET",
    credentials: "include",
    withCredentials: true,
  })
    .then((res) => res.json())
    .then((result) => result);

  return data;
}
