import { Grid, Box } from "@mui/material";
import hotelStyles from "./Hotel.module.scss";
import { Album } from "./components";
import { useHref, useParams, Outlet } from "react-router-dom";
import { useContext, useState, useMemo } from "react";
import { UserContext, BookingContext, ModalContext } from "@/utils/contexts";
import { useEffect, Suspense, lazy } from "react";
import { useClsx } from "@/utils/hooks";
import { Loading } from "../Home/components";
import Report from "./components/Report";
import Review from "./components/Review";
import { createContext } from "react";
import { GetHotel } from "@/services/hotel";
import Info from "./components/Info";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Cart from "./components/Cart";

const Booking = lazy(() => import("./components/Booking"));
const HotelInfo = lazy(() => import("./components/HotelInfo"));
export const reportContext = createContext();
export const reviewContext = createContext();
export const reviewDataContext = createContext();

function Hotel() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [hotelInfo, setHotelInfo] = useState({});
  const [bookedDays, setBookedDays] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const { dispatch } = useContext(ModalContext);

  const [isAllImageOpen, setAllImageOpen] = useState(false);
  const [isAdvanceFilterOpen, setAdvanceFilterOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState([]);
  const href = useHref();
  useEffect(() => {
    GetHotel(id).then((resp) => {
      setHotelInfo(resp.hotel);
      setBookedDays(resp.fullyBookedDates);
      setCurrentReview(resp.hotel.reviews);
    });
  }, [user, id]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };
  const getAdvanceFilterHotel = () => {
    setAdvanceFilterOpen(false);
  };

  const getReviewHotel = () => {
    setAdvanceFilterOpen(false);
  };

  const bookingContextValue = useMemo(
    () => ({
      bookedDays,
      bookList,
      setBookList,
    }),
    [bookedDays, bookList]
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
                        marginBottom: "2em",
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
                          {/* <Info hotelInfo={hotelInfo} /> */}
                          <Booking
                            roomType={hotelInfo?.roomType}
                            isAllowPet={hotelInfo?.isAnimalAccept}
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
            {bookList.length != 0 ? (
              <div
                className={hotelStyles["cartIcon"]}
                onClick={toggleDrawer(true)}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className={hotelStyles["CartIcon"]}
                />

                {bookList.length != 0 ? (
                  bookList.length < 10 ? (
                    <div className={hotelStyles["cartNumber"]}>
                      <p>{bookList.length}</p>
                    </div>
                  ) : (
                    <div className={hotelStyles["cartNumber"]}>
                      <p>9+</p>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              <></>
            )}
            <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
              <Cart setDrawer={setDrawer} />
            </Drawer>
          </reviewDataContext.Provider>
        </reviewContext.Provider>
      </reportContext.Provider>
    </BookingContext.Provider>
  );
}

export default Hotel;
