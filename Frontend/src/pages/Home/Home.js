import { Grid, Box } from "@mui/material";
import homeStyles from "./Home.module.scss";
import { BannerCarousel, Loading } from "./components";
import {
  useState,
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

const HotelCards = lazy(() => import("./components/HotelCards"));





function Home() {
  const [type, setType] = useState({});

  const [isAdvanceFilterOpen, setAdvanceFilterOpen] = useState(false);
  const [hotelsList, setHotelsList] = useState([]);
  const [numberOfFilterPicked, setNumberOfFilterPicked] = useState(0);
  const [roomAndBedRoom, setRoomAndBedRoom] = useState(
    
  );
  const [houseType, setHouseType] = useState(null);
  const [price, setPrice] = useState();
  const [amenitiesPicked, setAmenitiesPicked] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const advanceFilterContextValue = useMemo(
    () => ({
      roomAndBedRoom,
      setRoomAndBedRoom,
      houseType,
      setHouseType,
      price,
      setPrice,
      amenitiesPicked,
      setAmenitiesPicked,
    }),
    [roomAndBedRoom, houseType, price, amenitiesPicked]
  );

  const getNumberOfFilterItemPicked = () => {
    const numberOfAmenitiesPicked = amenitiesPicked.length;
    const numberOfRoomAndBedRoomPicked = Object.keys(roomAndBedRoom).reduce(
      (prev, key) => {
        if (roomAndBedRoom[key] !== 0) {
          return prev + 1;
        } else {
          return prev;
        }
      },
      0
    );
    const numberOfHouseTypePicked = houseType !== null ? 1 : 0;
    const numberOfPricePicked = Object.keys(price).length;
    return (
      numberOfAmenitiesPicked +
      numberOfRoomAndBedRoomPicked +
      numberOfHouseTypePicked +
      numberOfPricePicked
    );
  };

  const getAdvanceFilterHotel = () => {
    // console.log(roomAndBedRoom, houseType, price, amenitiesPicked);
  
  };

  const getHotel = () => {
   
  };

  const getAdvanceSearchHotel = async () => {

  };

  // const trendingHotels = [
  //   {
  //     backgroundImage:
  //       "photo/Hotel-Gardens-The-10-Most-Beautiful-Around-the-World-1.jpg",
  //     name: "Hotel 1",
  //   },
  //   {
  //     backgroundImage:
  //       "photo/Hotel-Gardens-The-10-Most-Beautiful-Around-the-World-1.jpg",
  //     name: "Hotel 2",
  //   },
  //   {
  //     backgroundImage:
  //       "photo/Hotel-Gardens-The-10-Most-Beautiful-Around-the-World-1.jpg",
  //     name: "Hotel 3",
  //   },
  // ];


  useEffect(() => {
    document.title = "Bookify";
  }, []);

  // console.log(isSearchAdvanceMode);
  return (
   
      <div
        id={homeStyles["home"]}
     
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Box
              sx={{
                borderRadius: "1.6em",
                overflow: "hidden",
              }}
            >
              {/* <BannerCarousel trendingHotels={trendingHotels} /> */}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div className={homeStyles["filter-bar-container"]}>
              <div className={homeStyles["filter-bar"]}>
                <div className={homeStyles["category-tab"]}>
               
                </div>
              </div>
              <button
            
                onClick={() => {
                  setAdvanceFilterOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faSliders} />
                <span>Bộ lọc</span>
                {!!numberOfFilterPicked && (
                  <span className={homeStyles["filter-active"]}>
                    {numberOfFilterPicked}
                  </span>
                )}
              </button>
            </div>
          </Grid>
          <div className={homeStyles["hotel-cards"]}>
            <Grid container spacing={1.5} overflow={"hidden"}>
              <Suspense fallback={<Loading />}>
                {isLoading ? (
                  <Loading />
                ) : (
                 <HotelCards hotels={hotelsList} type={type} />
                )}
              </Suspense>
            </Grid>
          </div>
          {
            <Suspense fallback={<div>Loading...</div>}>
              {isAdvanceFilterOpen && (
             <></>
              )}
            </Suspense>
          }
        </Grid>
        {isAdvanceFilterOpen && (
          <Box
            sx={{
              position: "fixed",
              height: "100vh",
              top: "0",
              left: "0",
              right: "0",
              zIndex: "2",
              backgroundColor: "#000",
              opacity: "0.5",
            }}
          />
        )}
      </div>
    
  );
}

export default Home;