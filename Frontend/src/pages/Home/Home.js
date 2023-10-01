import { Grid, Box } from "@mui/material";
import { BannerCarousel, TabItem, Loading } from "./components";
import homeStyles from "./Home.module.scss";
import categories from "./categories";
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
import {
  AdvanceFilterContext,
  SearchContext,
  UserContext,
} from "@/utils/contexts";
import {
  priceInitState,
  roomAndBedRoomInitialState,
} from "./advanceFilterInitState";
import { useClsx } from "@/utils/hooks";




const HotelCards = lazy(() => import("./components/HotelCards"));
const AdvanceFilter = lazy(() => import("./components/AdvanceFilter"));

// testing purpose only
const trendingHotels = [
  {
    backgroundImage:
      "photo/Hotel-Gardens-The-10-Most-Beautiful-Around-the-World-1.jpg",
    name: "Hotel 1",
  },
  {
    backgroundImage:
      "photo/Hotel-Gardens-The-10-Most-Beautiful-Around-the-World-1.jpg",
    name: "Hotel 2",
  },
  {
    backgroundImage:
      "photo/Hotel-Gardens-The-10-Most-Beautiful-Around-the-World-1.jpg",
    name: "Hotel 3",
  },
];

function Home() {
  const [type, setType] = useState({});
  // const currentCoordinates = useContext(CoordinatesContext);
  const { user } = useContext(UserContext);
  const [isAdvanceFilterOpen, setAdvanceFilterOpen] = useState(false);
  const [hotelsList, setHotelsList] = useState([]);
  const [numberOfFilterPicked, setNumberOfFilterPicked] = useState(0);
  const [roomAndBedRoom, setRoomAndBedRoom] = useState(
    roomAndBedRoomInitialState
  );
  const [houseType, setHouseType] = useState(null);
  const [price, setPrice] = useState(priceInitState);
  const [amenitiesPicked, setAmenitiesPicked] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {
    place,
    selectedDays,
    guests,
    isSearchAdvanceMode,
    setSearchAdvanceMode,
  } = useContext(SearchContext);
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
    fetch(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel/`, {
      method: "GET",
      credentials: "include",
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((result) => {
        setHotelsList(result.hotels);
        setLoading(false);
      });
  };

  const getAdvanceSearchHotel = async () => {
    setLoading(true);
    await GetAdvanceSearchHotels(place, selectedDays, guests).then((data) => {
      setHotelsList(data.hotels);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(type);
    if (type.filterType || type.filterTypeId) {
      const filterPayload = `${type.filterType}=${type.filterTypeId}`;
      getAdvancedTab(filterPayload).then((result) => {
        setHotelsList(result.hotels);
      });
    } else {
      getHotel();
    }
  }, [type]);

  useEffect(() => {
    if (isSearchAdvanceMode) {
      getAdvanceSearchHotel();
    } else {
      setSearchAdvanceMode(false);
      getHotel();
    }
  }, [isSearchAdvanceMode]);

  useEffect(() => {
    document.title = "Bookify";
  }, []);

  // console.log(isSearchAdvanceMode);
  return (
    <AdvanceFilterContext.Provider value={advanceFilterContextValue}>
      <div
        id={homeStyles["home"]}
        className={useClsx(isAdvanceFilterOpen ? homeStyles["no-scroll"] : "")}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Box
              sx={{
                borderRadius: "1.6em",
                overflow: "hidden",
              }}
            >
              <BannerCarousel trendingHotels={trendingHotels} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div className={homeStyles["filter-bar-container"]}>
              <div className={homeStyles["filter-bar"]}>
                <div className={homeStyles["category-tab"]}>
                  {categories.map(
                    ({ filterType, filterTypeId, icon, name }) => (
                      <TabItem
                        key={name}
                        type={type}
                        filterType={filterType}
                        filterTypeId={filterTypeId}
                        icon={icon}
                        name={name}
                        handleClick={setType}
                      />
                    )
                  )}
                </div>
              </div>
              <button
                className={useClsx(
                  homeStyles["filter-button"],
                  numberOfFilterPicked ? homeStyles["active"] : ""
                )}
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
                <AdvanceFilter
                  isAdvanceFilterOpen={isAdvanceFilterOpen}
                  setAdvanceFilterOpen={setAdvanceFilterOpen}
                 
                />
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
    </AdvanceFilterContext.Provider>
  );
}

export default Home;
