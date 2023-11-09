import { faAirbnb } from "@fortawesome/free-brands-svg-icons";
import { faGrin } from "@fortawesome/free-regular-svg-icons";
import {
  faHotel,
  faHouseChimney,
  faCampground,
  faBowlFood,
  faBowlRice,
  faSwimmingPool,
  faHouse,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Căn hộ / Nhà / Phục vụ bữa sáng / Thiết kế riêng /
 */

const categories = [
  {
    filterType: "hotelAmenities",
    filterTypeId: "652d4b555365facd724ebf88",
    name: "Cam trai 5",
    icon: faCampground,
  },
  {
    filterType: "hotelAmenities",
    name: "BBQ 2",
    filterTypeId: "652d4b555365facd724ebf89",
    icon: faBowlFood,
  },
  {
    filterType: "hotelAmenities",
    name: "Restaurant",
    filterTypeId: "652d4b555365facd724ebf8a",
    icon: faBowlRice,
  },
  {
    filterType: "hotelAmenities",
    name: "Pool",
    filterTypeId: "652d4b555365facd724ebf8b",
    icon: faSwimmingPool,
  },
  {
    filterType: "hotelType",
    name: "Private house",
    filterTypeId: "646d87a5768a15b96656358c",
    icon: faHouse,
  },
  {
    filterType: "hotelType",
    name: "Resort",
    filterTypeId: "646d87b5768a15b96656358f",
    icon: faUmbrellaBeach,
  },
  {
    filterType: "hotelType",
    name: "Hotel",
    filterTypeId: "64909fb613adcb5397bf961f",
    icon: faHotel,
  },
  {
    filterType: "hotelType",
    name: "Expensive Apartment",
    filterTypeId: "6490a14fb92c2e38f936b1d5",
    icon: faHouseChimney,
  },
];

export default categories;