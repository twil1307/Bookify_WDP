import getHotel, { getHotelbyOwner } from "@/services/hotel";
import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

const RegisterSection = lazy(() => import("../Register/RegisterSection"));
function Update() {
  const { hotelId } = useParams();
  // console.log(hotelId);
  const [hotelInfor, setHotelInfor] = useState(null);
  // đm em đức nhá làm be mà ko check cái attribute bên fe
  useEffect(() => {
   
    getHotelbyOwner()
      .then((resp) => resp.hotel)
      .then((resp) => {
        setHotelInfor({
          basicHotelInfor: {
            name: resp?.hotelName,
            hotelType: resp?.hotelName,
            country: resp.country,
            province: resp.province,
            district: resp.district,
            address: resp.address,
            description: resp.description,
          },
          roomInfor: {
            numberOfGuests: resp.roomType.maxGuest,
            numberOfRoom: resp.roomType.bedroomNum,
            numberOfBed: resp.roomType.bedNum,
            numberOfBathroom: resp.roomType.bathNum,
            price: resp.roomType.roomPrice,
            rooms: 10,
            isPrivateBathRoom: resp.roomType.isbathPrivate,
            bedType: resp.roomType.bedType,
            bathroomType: resp.roomType.bathroomType,
          },
          extraInfor: {
            isHasCamera: resp.isCamera,
            isAllowPet: resp.isAnimalAccept,
            checkin: resp.checkin,
            checkout: resp.checkout,
            opening: resp.opening,
            closing: resp.closing,
          },
          viewImages: [...resp.images],
          backgroundImg: resp.backgroundImg,
          roomImages: [],
          hotelAmenities: [...resp.hotelAmenities],
        });
      });

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
