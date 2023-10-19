import {
  basicHotelInforInitState,
  roomInfoInitState,
  extraInforInitState,
  viewImagesInitState,
  backgroundImageInitState,
  roomImagesInitState,
  amenitiesInitState,
} from "./registerInitStates";
import RegisterSection from "./RegisterSection";

function Register() {
  return (
    <RegisterSection
      basicHotelInforInitState={basicHotelInforInitState}
      roomInfoInitState={roomInfoInitState}
      extraInforInitState={extraInforInitState}
      viewImagesInitState={viewImagesInitState}
      backgroundImageInitState={backgroundImageInitState}
      roomImagesInitState={roomImagesInitState}
      amenitiesInitState={amenitiesInitState}
    />
  );
}

export default Register;
