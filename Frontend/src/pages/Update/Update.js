import getHotel from "@/services/hotel";
import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

const RegisterSection = lazy(() => import("../Register/RegisterSection"));
function Update() {
  const Owner_hotel = "l";
  const { hotelId } = useParams();
  console.log(hotelId);
  const [hotelInfor, setHotelInfor] = useState(null);
  // đm em đức nhá làm be mà ko check cái attribute bên fe
  useEffect(() => {
    const hotelParse = Owner_hotel?.hotel || "";
    const hotel = {
      basicHotelInfor: {
        name: hotelParse?.hotelName,
        hotelType: hotelParse?.hotelName,
        country: hotelParse.country,
        province: hotelParse.province,
        district: hotelParse.district,
        address: hotelParse.address,
        description: hotelParse.description,
      },
      roomInfor: {
        numberOfGuests: hotelParse.roomType.maxGuest,
        numberOfRoom: hotelParse.roomType.bedroomNum,
        numberOfBed: hotelParse.roomType.bedNum,
        numberOfBathroom: hotelParse.roomType.bathNum,
        price: hotelParse.roomType.roomPrice,
        rooms: 10,
        isPrivateBathRoom: hotelParse.roomType.isbathPrivate,
        bedType: hotelParse.roomType.bedType,
        bathroomType: hotelParse.roomType.bathroomType,
      },
      extraInfor: {
        isHasCamera: hotelParse.isCamera,
        isAllowPet: hotelParse.isAnimalAccept,
        checkin: hotelParse.checkin,
        checkout: hotelParse.checkout,
        opening: hotelParse.opening,
        closing: hotelParse.closing,
      },
      viewImages: [...hotelParse.images],
      backgroundImg: hotelParse.backgroundImg,
      roomImages: [],
      hotelAmenities: [...hotelParse.hotelAmenities],
    };
    setHotelInfor(hotel);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {hotelInfor && (
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterSection
            hotelId={hotelId}
            basicHotelInforInitState={hotelInfor.basicHotelInfor}
            roomInfoInitState={hotelInfor.roomInfor}
            extraInforInitState={hotelInfor.extraInfor}
            viewImagesInitState={hotelInfor.viewImages}
            backgroundImageInitState={hotelInfor.backgroundImg}
            roomImagesInitState={hotelInfor.roomImages}
            amenitiesInitState={hotelInfor.hotelAmenities}
            displayAmenitiesInitState={hotelInfor.hotelAmenities}
          />
        </Suspense>
      )}
    </div>
  );
}

export default Update;
