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
    createdAt,
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
  // console.log(createdAt);

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
          city={city}
          district={district}
          address={address}
          country={country}
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
          createdAt={createdAt}
        />
      </div>
    </div>
  );
}

export default HotelInfo;
