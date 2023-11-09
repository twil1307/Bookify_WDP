const basicHotelInforInitState = {
  name: "",
  hotelType: "",
  country: "Việt Nam",
  province: "",
  district: "",
  address: "",
  description: "",
};

const roomInfoInitState = {
  roomTypeID: Math.floor(Math.random() * 100),
  numberOfGuests: 1,
  numberOfRoom: 1,
  bedType: "",
  bathroomType: "",
  numberOfBed: 6,
  numberOfBathroom: 1,
  price: 100,
  rooms: 10,
  isPrivateBathRoom: false,
};
// "roomPrice": 100,
// "bedType": "King Size",
// "bedNum": 2,
// "bathroomType": "Ensuite",
// "bathNum": 1,
// "maxGuest": 4,
// "bedroomNum": 1,
// "isbathPrivate": true,
// "roomNumber": 2    
const extraInforInitState = {
  isHasCamera: false,
  isAllowPet: false,
  accessibility: [],
  checkin: {
    hour: 12,
    minutes: 30,
  },
  checkout: {
    hour: 12,
    minutes: 30,
  },
  opening: {
    hour: 12,
    minutes: 30,
  },
  closing: {
    hour: 12,
    minutes: 30,
  },
};

const viewImagesInitState = [];
const backgroundImageInitState = null;
const roomImagesInitState = [];
const amenitiesInitState = [];

export {
  basicHotelInforInitState,
  roomInfoInitState,
  extraInforInitState,
  viewImagesInitState,
  backgroundImageInitState,
  roomImagesInitState,
  amenitiesInitState,
};
