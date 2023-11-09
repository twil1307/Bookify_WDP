import BookListStyle from "../../../HotelManage.module.scss";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState, Suspense, lazy } from "react";
import { GetAllTodayBooking } from "@/services/hotel";
import { useOutletContext } from "react-router-dom";

const BookingTabs = lazy(() => import("@/components/Tabs/BookingTabs"));
const tabPanelStyle = {
  padding: "1em 0",
  paddingRight: "1em",
  maxHeight: "40vh",
  overflowY: "scroll",
};

function BookingList() {
  const [value, setValue] = useState("pending");
  const [bookingList, setBookingList] = useState([]);
  const [hotel, setHotel] = useOutletContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabChange = async () => {
    if (!hotel) {
      return;
    }
    // console.log(hotel);
    await GetAllTodayBooking(hotel._id, value).then((data) => {
      // console.log(data.data);
      setBookingList(data.data);
    });
  };

  useEffect(() => {
    handleTabChange();
    //eslint-disable-next-line
  }, [value, hotel]);

  return (
    <>
      <div className={BookListStyle["tabs"]}>
        <Box sx={{ width: "50%", typography: "body1" }}>
          <TabContext value={value} sx={{ padding: 0 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className={BookListStyle["task1"]}
                TabIndicatorProps={{
                  sx: {
                    backgroundColor: "black",
                    borderRadius: "10px",
                    height: 2,
                  },
                }}
                sx={{
                  "& button": {},

                  "& button.Mui-selected": {
                    color: "black",
                    fontWeight: 550,
                  },
                }}
              >
                <Tab label="Đang chờ" value="pending" />
                <Tab label="Đang được đặt" value="booked" />
                <Tab label="Trả phòng" value="checkout" />
              </TabList>
            </Box>
            <TabPanel value="pending" sx={tabPanelStyle}>
              <Suspense fallback={<div>Loading...</div>}>
                <BookingTabs
                  list={bookingList}
                  setBookingList={setBookingList}
                />
              </Suspense>
            </TabPanel>
            <TabPanel value="booked" sx={tabPanelStyle}>
              <Suspense fallback={<div>Loading...</div>}>
                <BookingTabs
                  list={bookingList}
                  setBookingList={setBookingList}
                />
              </Suspense>
            </TabPanel>
            <TabPanel value="checkout" sx={tabPanelStyle}>
              <Suspense fallback={<div>Loading...</div>}>
                <BookingTabs
                  list={bookingList}
                  setBookingList={setBookingList}
                />
              </Suspense>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}
export default BookingList;
