// icon
import {
    faHotel,
    faHouseChimney,
    faHouse,
    faUmbrellaBeach,
  } from "@fortawesome/free-solid-svg-icons";
  
  const pickers = [
    {
      title: "Phòng ngủ",
      name: "rooms",
      length: 9,
    },
    {
      title: "Giường",
      name: "numberOfBed",
      length: 9,
    },
    {
      title: "Phòng tắm",
      name: "numberOfBathroom",
      length: 9,
    },
  ];
  
  const houseAndRoomTypes = [
    {
      id: "646d87a5768a15b96656358c",
      type: "Private House",
      icon: faHouse,
    },
    {
      id: "646d87b5768a15b96656358f",
      type: "Resort",
      icon: faUmbrellaBeach,
    },
  
    {
      id: "64909fb613adcb5397bf961f",
      type: "Hotel",
      icon: faHotel,
    },
    {
      id: "6490a14fb92c2e38f936b1d5",
      type: "Expensive Apartment",
      icon: faHouseChimney,
    },
  ];
  
  const roomAndBedRoomInitialState = {
    rooms: null,
    numberOfBed: null,
    numberOfBathroom: null,
  };
  
  const priceInitState = {
    min: 0,
    max: 0,
  };
  
  export {
    pickers,
    houseAndRoomTypes,
    roomAndBedRoomInitialState,
    priceInitState,
  };
  