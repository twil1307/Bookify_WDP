import HotelManageStyle from "./HotelManageDetail.module.scss";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import Income from "./components/Income";
import Views from "./components/Views";
import Rating from "./components/Rating";

function HotelManageDetail() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={HotelManageStyle["container"]}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              className={HotelManageStyle["task1"]}
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
              <Tab label="Thu nhập" value="1" />
              <Tab label="Đánh giá" value="2" />
              <Tab label="Lượt xem" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Income />
          </TabPanel>
          <TabPanel value="2">
            <Rating />
          </TabPanel>
          <TabPanel value="3">
            <Views />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default HotelManageDetail;
