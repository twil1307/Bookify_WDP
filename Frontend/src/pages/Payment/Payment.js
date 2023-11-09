import HeaderInfo from "./components/headerInfo";
import PaymentStyle from "./Payment.module.scss";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect, createContext, useContext } from "react";
import Grid from "@mui/material/Grid";
import BankCard from "./components/BankCard";
import Overall from "./components/Overrall/Overall";
import { UserContext } from "@/utils/contexts";

export const OverrallContext = createContext();
export const OverrallDataContext = createContext();
export const OverrallChartDataContext = createContext();
function Payment() {
  const [value, setValue] = useState("1");
  const { user } = useContext(UserContext);
  let date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [paymentList, setPaymentList] = useState([]);
  const [chartData, setChartData] = useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [walletAmount, setWalletAmount] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:8080/bookify/api/user/bookingHistory/transaction?userid=${user._id}&month=${month}`
    )
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setPaymentList(result.listTrans);
        setChartData(result.chartData);
        setWalletAmount(result.wallet);
      });
  }, [month]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <div className={PaymentStyle[""]}>
          <HeaderInfo />
          <OverrallContext.Provider value={[month, setMonth]}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={1}
                // direction={{
                //   xs: "column-reverse",
                //   sm: "column-reverse",
                //   md: "row",
                //   lg: "row",
                // }}
              >
                <Grid item xs={12} md={6}>
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                          className={PaymentStyle["task1"]}
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
                          <Tab label="Thanh toán" value="1" />
                          <Tab label="Phiếu giảm giá" value="2" />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <OverrallDataContext.Provider
                          value={[paymentList, setPaymentList]}
                        >
                          <OverrallChartDataContext.Provider
                            value={[chartData, setChartData]}
                          >
                            <Overall />
                          </OverrallChartDataContext.Provider>
                        </OverrallDataContext.Provider>
                      </TabPanel>
                      <TabPanel value="2">
                        <h1>Hiện chưa có</h1>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={PaymentStyle["bank-card"]}>
                    <BankCard bankWallet={walletAmount} />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </OverrallContext.Provider>
        </div>
      </Grid>
    </Grid>
  );
}

export default Payment;
