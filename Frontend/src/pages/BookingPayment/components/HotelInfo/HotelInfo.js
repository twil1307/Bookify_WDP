import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOutletContext } from "react-router-dom";
import About from "./About";
import Amenities from "./Amenities";
import HotelInfoStyle from "./HotelInfo.module.scss";
import Location from "./Location";
import Photos from "./Photos";

function HotelInfo() {
  const hotelInfo = useOutletContext();
  console.log(hotelInfo);

  return (
    <div className={HotelInfoStyle["hotelInfo-wrapper"]}>
      <div className={HotelInfoStyle["hotel-header"]}>
        <h2 className={HotelInfoStyle["hotel-name"]}>{hotelInfo?.hotelName}</h2>
        <h4 className={HotelInfoStyle["rating-stars"]}>
          {hotelInfo?.rating?.valuePoint} <FontAwesomeIcon icon={faStar} />
        </h4>
      </div>
      <div className={HotelInfoStyle["photo-section"]}>
        <Photos />
      </div>
      <div className={HotelInfoStyle["about-section"]}>
        <About />
      </div>
      <div className={HotelInfoStyle["amenities-section"]}>
        <Amenities />
      </div>
      <div className={HotelInfoStyle["location-section"]}>
        <Location />
      </div>
    </div>
  );
}

export default HotelInfo;
