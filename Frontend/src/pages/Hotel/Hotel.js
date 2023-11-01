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
import { GetHotel } from "@/services/hotel";

const Booking = lazy(() => import("./components/Booking"));
const HotelInfo = lazy(() => import("./components/HotelInfo"));
export const reportContext = createContext();
export const reviewContext = createContext();
export const reviewDataContext = createContext();

function Hotel() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [hotelInfo, setHotelInfo] = useState({});
  const [selectDays, setSelectedDays] = useState([]);
  const [guests, setGuests] = useState(guestsInitial);
  const [isAllImageOpen, setAllImageOpen] = useState(false);
  const [isAdvanceFilterOpen, setAdvanceFilterOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState([]);
  const href = useHref();
  useEffect(() => {
    GetHotel(id).then((resp) => {
      setHotelInfo(resp.hotel);
      setSelectedDays(resp.fullyBookedDates);
    });

    // console.log(selectDay);
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
    document.title = hotelInfo.hotelName;
  }, [hotelInfo]);

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
                      backgroundImage={hotelInfo.backgroundImage}
                      images={hotelInfo.images || []}
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
                          <HotelInfo hotelInfo={hotelInfo} />
                        </Suspense>
                        {/* Hotel Information */}
                      </div>
                      <div className={hotelStyles["right"]}>
                        {/* Booking Form */}
                        <Suspense fallback={<div>Loading...</div>}>
                          <Booking
                            roomType={hotelInfo?.roomType}
                            isAllowPet={hotelInfo?.isAllowPet}
                            hotelId={hotelInfo?._id}
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
                          hotelInfo={hotelInfo}
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
                          hotelInfo={hotelInfo}
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
