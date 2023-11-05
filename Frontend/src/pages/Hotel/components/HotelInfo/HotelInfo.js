import HotelInfoStyle from "./HotelInfo.module.scss";
import InfoHeader from "../InfoHeader";
import Details from "../Details";
import { useContext, useEffect, useState } from "react";
import { reviewDataContext } from "../../Hotel";

function HotelInfo({ hotelInfo }) {
  const {
    _id: hotelId,
    description,
    hotelAmenities,
    user,
    hotelName,
    rating,
    reviews,
    roomType,
    isBookmarked,
    signAt,
    isVerified,
    Rooms,
    country,
    address,
    checkin,
    checkout,
    city,
    district,
    hotelType,
  } = hotelInfo;
  // console.log(isVerified);
  // console.log(user);
  return (
    <div>
      <div className={HotelInfoStyle["header"]}>
        <InfoHeader
          reviews={reviews}
          roomType={roomType}
          hotelName={hotelName}
          rating={rating}
          isBookmarked={isBookmarked}
          Rooms={Rooms}
          hotelId={hotelId}
          isVerified={isVerified}
        />
      </div>
      <div className={HotelInfoStyle["details"]}>
        <Details
          country={country}
          address={address}
          checkin={checkin}
          checkout={checkout}
          city={city}
          district={district}
          reviews={reviews}
          description={description}
          hotelAmenities={hotelAmenities}
          hotelOwner={user}
          roomType={roomType}
          rating={rating}
          hotelId={hotelId}
          signAt={signAt}
        />
      </div>
    </div>
  );
}

export default HotelInfo;
