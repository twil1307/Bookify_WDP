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
  numberOfGuests: 1,
  numberOfRoom: 1,
  numberOfBed: 6,
  numberOfBathroom: 1,
  price: 100,
  rooms: 10,
  isPrivateBathRoom: false,
};

const extraInforInitState = {
  isHasCamera: false,
  isAllowPet: false,
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
