import { Grid, Box } from "@mui/material";
import hotelStyles from "./Hotel.module.scss";
import { Album } from "./components";
import { useHref, useParams, Outlet } from "react-router-dom";
import { useContext, useState, useMemo } from "react";
import { UserContext, BookingContext } from "@/utils/contexts";
import { useEffect, Suspense, lazy } from "react";
import { useClsx, useGetHotel } from "@/utils/hooks";
import { guestsInitial } from "./hotelInitState";
import { Loading } from "../Home/components";
import Report from "./components/Report";
import Review from "./components/Review";
import { createContext } from "react";

const Booking = lazy(() => import("./components/Booking"));
const HotelInfo = lazy(() => import("./components/HotelInfo"));
export const reportContext = createContext();
export const reviewContext = createContext();
export const reviewDataContext = createContext();

function Hotel() {
  const { hotel, getHotelbyId, selectDay } = useGetHotel();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [hotelInfo, setHotelInfo] = useState({});
  const [selectDays, setSelectedDays] = useState({});
  const [guests, setGuests] = useState(guestsInitial);
  const [isAllImageOpen, setAllImageOpen] = useState(false);
  const [isAdvanceFilterOpen, setAdvanceFilterOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState([]);
  const href = useHref();
  useEffect(() => {
    getHotelbyId(id);
    setSelectedDays(selectDay);
    // console.log(selectDay);
    setHotelInfo(hotel);
  }, [user, id]);
  useEffect(() => {
    console.log(hotelInfo);
  }, [hotelInfo]);

  const getAdvanceFilterHotel = () => {
    setAdvanceFilterOpen(false);
  };

  const getReviewHotel = () => {
    setAdvanceFilterOpen(false);
  };

  const bookingContextValue = useMemo(
    () => ({
      selectDays,
      setSelectedDays,
      guests,
      setGuests,
    }),
    [selectDays, guests]
  );

  useEffect(() => {
    document.title = hotel.hotelName;
  }, [hotel]);

  return (
    <BookingContext.Provider value={bookingContextValue}>
      <reportContext.Provider
        value={[isAdvanceFilterOpen, setAdvanceFilterOpen]}
      >
        <reviewContext.Provider value={[isReviewOpen, setIsReviewOpen]}>
          <reviewDataContext.Provider value={[currentReview, setCurrentReview]}>
            <>
              <div
                id={hotelStyles["hotel"]}
                className={useClsx(
                  isAllImageOpen ? hotelStyles["no-scroll"] : "",
                  href.includes("/booking") ? hotelStyles["d-none"] : ""
                )}
              >
                <Grid container justifyContent={"center"}>
                  <Grid item xs={10}>
                    <Album
                      backgroundImage={hotel.backgroundImg}
                      images={hotel.images || []}
                      isAllImageOpen={isAllImageOpen}
                      setAllImageOpen={setAllImageOpen}
                    />
                    <Box
                      sx={{
                        marginTop: "2em",
                        position: "relative",
                        display: "flex",
                        gap: "0.6em",
                      }}
                    >
                      <div className={hotelStyles["left"]}>
                        <Suspense fallback={<div>Loading...</div>}>
                          <HotelInfo hotelInfo={hotel} />
                        </Suspense>
                        {/* Hotel Information */}
                      </div>
                      <div className={hotelStyles["right"]}>
                        {/* Booking Form */}
                        <Suspense fallback={<div>Loading...</div>}>
                          <Booking
                            roomType={hotel?.roomType}
                            isAllowPet={hotel?.isAllowPet}
                            hotelId={hotel?._id}
                          />
                        </Suspense>
                      </div>
                    </Box>
                  </Grid>

                  {
                    <Suspense fallback={<div>Loading...</div>}>
                      {isAdvanceFilterOpen && (
                        <Report
                          isAdvanceFilterOpen={isAdvanceFilterOpen}
                          setAdvanceFilterOpen={setAdvanceFilterOpen}
                          getAdvanceFilterHotel={getAdvanceFilterHotel}
                          hotelInfo={hotel}
                        />
                      )}
                    </Suspense>
                  }
                  {
                    <Suspense fallback={<div>Loading...</div>}>
                      {isReviewOpen && (
                        <Review
                          isReviewOpen={isReviewOpen}
                          setIsReviewOpen={setIsReviewOpen}
                          getReviewHotel={getReviewHotel}
                          hotelInfo={hotel}
                        />
                      )}
                    </Suspense>
                  }
                </Grid>
              </div>
              {href.includes("/booking") ? <Outlet context={hotelInfo} /> : ""}
            </>
          </reviewDataContext.Provider>
        </reviewContext.Provider>
      </reportContext.Provider>
    </BookingContext.Provider>
  );
}

export default Hotel;
