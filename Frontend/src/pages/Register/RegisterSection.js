// libraries
import { Grid, Box } from "@mui/material";
import { useState, useMemo, Suspense, useEffect, useContext } from "react";
import { useHref } from "react-router-dom";

// app defined
import { Jumbotron, TabBar } from "./components";
import {
  RegisterContext,
  UserContext,
  ToastMessageContext,
} from "@/utils/contexts";
import registerStyles from "./Register.module.scss";
import { useClsx } from "@/utils/hooks";
import { useNavigate } from "react-router-dom";
import tabs from "./tabs";
import { getSuccessToastMessage } from "@/utils/reducers/toastMessageReducer";
import {
  CreateHotel,
  getDefaultAmenities,
  UpdateHotel,
  getDefaultAmenityTypes,
} from "@/services/hotel";

function RegisterSection({
  hotelId,
  basicHotelInforInitState,
  roomInfoInitState,
  extraInforInitState,
  viewImagesInitState,
  backgroundImageInitState,
  roomImagesInitState,
  amenitiesInitState,
  displayAmenitiesInitState = null,
}) {
  // show BasicInformation first
  const [inputTabIndex, setInputTabIndex] = useState(0);
  const navigate = useNavigate();
  const { user, setUser, isLogin, setLogin } = useContext(UserContext);
  const { setToastMessages } = useContext(ToastMessageContext);
  const [basicHotelInfor, setBasicHotelInfo] = useState(
    basicHotelInforInitState
  );
  const [isNextTabValid, setNextTabValid] = useState(false);
  const [amenities, setAmenities] = useState(amenitiesInitState);
  const [roomType, setRoomType] = useState([roomInfoInitState]);
  const [roomInfor, setRoomInfor] = useState(roomInfoInitState);
  const [viewImages, setViewImages] = useState(viewImagesInitState);
  const [roomImages, setRoomImages] = useState(roomImagesInitState);
  const [backgroundImage, setBackgroundImage] = useState(
    backgroundImageInitState
  );

  const [extraInfor, setExtraInfor] = useState(extraInforInitState);
  const [displayAmenities, setDisplayAmenities] = useState(
    displayAmenitiesInitState || []
  );
  const [displayAmenitiesType, setDisplayAmenitiesType] = useState();
  const [updatedViewImages, setUpdatedViewImages] = useState([]);
  const [updatedRoomImages, setUpdatedRoomImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const href = useHref();

  useEffect(() => {
    getDefaultAmenityTypes().then((defaultAmenityTypes) => {
      console.log(defaultAmenityTypes);
      setDisplayAmenitiesType(defaultAmenityTypes.amenityTypes);
    });

    getDefaultAmenities().then((defaultAmenties) => {
      setDisplayAmenities((prev) => {
        const mergedAmenities = [...prev];
        Array.from(defaultAmenties?.amenities).forEach((defaultAmenity) => {
          // console.log(defaultAmenity);
          let isIncluded = false;
          prev.forEach(({ amenityName }) => {
            if (amenityName === defaultAmenity.amenityName) {
              isIncluded = true;
            }
          });
          if (!isIncluded) {
            mergedAmenities.push(defaultAmenity);
          }
        });

        return mergedAmenities;
      });
    });

    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    // console.log(displayAmenities);
  }, [displayAmenities]);
  const registerContextValue = useMemo(
    () => ({
      hotelId,
      basicHotelInfor,
      setBasicHotelInfo,
      amenities,
      setAmenities,
      roomInfor,
      setRoomInfor,
      viewImages,
      setViewImages,
      roomImages,
      setRoomImages,
      backgroundImage,
      setBackgroundImage,
      extraInfor,
      setExtraInfor,
      displayAmenities,
      setDisplayAmenities,
      displayAmenitiesType,
      setDisplayAmenitiesType,
      updatedViewImages,
      setUpdatedViewImages,
      updatedRoomImages,
      setUpdatedRoomImages,
      deletedImages,
      setDeletedImages,
      roomType,
      setRoomType,
    }),
    [
      hotelId,
      basicHotelInfor,
      amenities,
      roomInfor,
      viewImages,
      roomImages,
      backgroundImage,
      extraInfor,
      displayAmenities,
      displayAmenitiesType,
      updatedViewImages,
      updatedRoomImages,
      deletedImages,
      roomType,
      setRoomType,
    ]
  );

  const registerSubmit = async (e) => {
    e.preventDefault();
    if (href.includes("/update")) {
      const response = await UpdateHotel(
        amenities,
        basicHotelInfor,
        backgroundImage,
        extraInfor,
        roomInfor,
        updatedViewImages,
        updatedRoomImages,
        deletedImages
      );
      setToastMessages(
        getSuccessToastMessage({ message: "Cập nhật khách sạn thành công" })
      );
    } else {
      console.log(roomType);
      const data = await CreateHotel(
        amenities,
        basicHotelInfor,
        backgroundImage,
        roomImages,
        viewImages,
        extraInfor,
        roomInfor,
        roomType
      );

      setToastMessages(
        getSuccessToastMessage({ message: "Đăng ký khách sạn thành công" })
      );
    }
    // navigate("/manager/hotel");
  };

  const toNextTab = (e) => {
    if (inputTabIndex + 1 === tabs.length) {
      registerSubmit(e);
    } else {
      setInputTabIndex((prev) => prev + 1);
    }
  };

  const toPreviousTab = () => {
    if (inputTabIndex === 0) {
      return;
    } else {
      setInputTabIndex((prev) => prev - 1);
    }
  };

  return (
    <RegisterContext.Provider value={registerContextValue}>
      <div id={registerStyles["register"]}>
        <Grid container>
          <Grid item xs={4} className={registerStyles["left"]}>
            <Jumbotron />
          </Grid>
          <Grid item xs={8} className={registerStyles["right"]}>
            <Box
              sx={{
                width: "60%",
                margin: "0 auto",
                overflowX: "hidden",
              }}
              className={registerStyles["form"]}
            >
              <Suspense fallback={<div>Loading...</div>}>
                {tabs[inputTabIndex].render(setNextTabValid)}
              </Suspense>
              {/* Buttons */}
              <div className={registerStyles["nav-buttons"]}>
                <button className={useClsx()} onClick={toNextTab}>
                  {inputTabIndex + 1 === tabs.length ? "Đăng ký" : "Tiếp theo"}
                </button>
                <button
                  className={useClsx(registerStyles["back"])}
                  onClick={toPreviousTab}
                >
                  Quay lại
                </button>
              </div>
            </Box>
            <TabBar
              inputTabIndex={inputTabIndex}
              handleChangeTab={setInputTabIndex}
              tabIdList={tabs.map(({ id }) => id)}
              isNextTabValid={isNextTabValid}
            />
          </Grid>
        </Grid>
      </div>
    </RegisterContext.Provider>
  );
}

export default RegisterSection;
