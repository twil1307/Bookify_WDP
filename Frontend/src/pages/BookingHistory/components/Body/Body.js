import BodyStyle from "../../BookingHistory.module.scss";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import Tabs from "./components/Tabs";
import { StyledEngineProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";

const CustomizedTabPanel = styled(TabPanel)`
  padding: 0;
`;
const CustomizeTab = styled(Tab)`
  font-size: 12px;
  height: 30px;
  padding: 0 16px;
`;
function Body() {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <StyledEngineProvider injectFirst>
      <div className={BodyStyle["body"]}>
        <Box sx={{ width: "40rem", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className={BodyStyle["task1"]}
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
                <CustomizeTab label="Tất cả" value="1" />
                <CustomizeTab label="Hôm nay" value="2" />
                <CustomizeTab label="Đã đặt" value="3" />
                <CustomizeTab label="Đã hủy" value="4" />
              </TabList>
            </Box>

            <div className={BodyStyle["grid-container"]}>
              <CustomizedTabPanel value="1">
                <Tabs category={"all"} />
              </CustomizedTabPanel>
              <CustomizedTabPanel value="2">
                <Tabs
                  category={"today"}
                />
              </CustomizedTabPanel>
              <CustomizedTabPanel value="3">
                <Tabs category={"booked"} />
              </CustomizedTabPanel>
              <CustomizedTabPanel value="4">
                <Tabs category={"canceled"} />
              </CustomizedTabPanel>
              {/* <div className={BodyStyle["alert"]}>
                <div className={BodyStyle["alert-body"]}>
                  <h3>
                    <span>
                      <FontAwesomeIcon icon={faExclamationCircle} />
                    </span>
                    Lưu ý
                  </h3>
                  <p>
                    Bạn chỉ có thể hủy phòng trong vòng 4 giờ đồng hồ kể từ lúc
                    đặt phòng, mọi thanh toán sẽ được hoàn trả về tài khoản của
                    bạn trong vòng 24 tiếng. Nếu quá thời gian hủy phòng quy
                    định, bạn sẽ không thể hủy phòng đã đặt.{" "}
                    <span> - Bookify</span>
                  </p>
                </div>
              </div> */}
            </div>
          </TabContext>
        </Box>
      </div>
    </StyledEngineProvider>
  );
}
export default Body;
