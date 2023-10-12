import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./DefaultLayout.module.scss";
import { memo, useEffect, useState, useMemo } from "react";
import { Outlet, useHref } from "react-router-dom";
import { Box } from "@mui/material";
import { Suspense, useContext } from "react";
import { UserContext, WebSocketContext } from "@/utils/contexts";
import { SearchContext } from "@/utils/contexts";

const guestsInitial = {
  adult: 0,
  child: 0,
  infant: 0,
  pet: 0,
};

function DefaultLayout() {
  const href = useHref();
  const { user } = useContext(UserContext);
  const current = useContext(WebSocketContext);
  const [bookmarkedHotels, setBookmarkedHotels] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [type, setType] = useState(1);
  const [place, setPlace] = useState("Hà Nội");
  const [selectedDays, setSelectedDays] = useState({});
  const [guests, setGuests] = useState(guestsInitial);
  const [isSearchAdvanceMode, setSearchAdvanceMode] = useState(false);

  const getBookmarkedHotel = () => {};

  const getNotifications = () => {};

  const resetSearchAdvance = () => {
    setPlace("");
    setSelectedDays({});
    setGuests(guestsInitial);
  };

  useEffect(() => {
    getBookmarkedHotel();
    getNotifications();

    //eslint-disable-next-line
  }, [user]);

  const handleOnMessage = (event) => {
    const newNotif = JSON.parse(event.data);
    setNotifs((prev) => [newNotif, ...prev]);
  };

  const handleClose = (event) => {};

  useEffect(() => {
    if (current) {
      current.addEventListener("message", handleOnMessage);
      current.addEventListener("close", handleClose);
    }
    return () => {
      current?.removeEventListener("message", handleOnMessage);
      current?.removeEventListener("close", handleClose);
    };
  }, [current]);

  const searchContextValue = useMemo(() => {
    return {
      place,
      setPlace,
      selectedDays,
      setSelectedDays,
      guests,
      setGuests,
      isSearchAdvanceMode,
      setSearchAdvanceMode,
      resetSearchAdvance,
    };
  }, [place, guests, selectedDays, isSearchAdvanceMode]);

  return (
    <SearchContext.Provider value={searchContextValue}>
      <div className={styles["default-layout"]}>
        <Header
          location={href}
          bookmarkedHotels={bookmarkedHotels}
          setBookmarkedHotels={setBookmarkedHotels}
          notifs={notifs}
          setNotifs={setNotifs}
        />
        <Box
          sx={{
            position: "relative",
            top: "72.78px",
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet context={setBookmarkedHotels} />
          </Suspense>
        </Box>
        {/* <Footer /> */}
      </div>
    </SearchContext.Provider>
  );
}

export default memo(DefaultLayout);
