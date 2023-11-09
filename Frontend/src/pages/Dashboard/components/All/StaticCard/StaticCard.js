import StaticStyle from "./StaticCard.module.scss";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMemo, useContext, useEffect } from "react";
import { getIncreasePercent2 } from "../AllService";
import { MonthContext } from "../All";

function StaticCard({ prevMonthData, currentMonthData, month }) {
  // const [month, setMonth] = useContext(MonthContext);
  let staticTracking = getIncreasePercent2(
    prevMonthData.overallData,
    currentMonthData.overallData,
    month
  );
  // useEffect(() => {
  //   console.log(staticTracking);
  // }, [prevMonthData, currentMonthData]);

  const options = [
    {
      class: "booking-number",
      title: "Lượt đặt phòng",
      data: currentMonthData?.overallData?.numberOfBooking?.total || 0,
      tracking: staticTracking.booking,
    },
    {
      class: "views-number",
      title: "Lượt truy cập",
      data: currentMonthData?.overallData?.numberOfVisitors?.total || 0,
      tracking: staticTracking.views,
    },
    {
      class: "checkout-number",
      title: "Lượt thanh toán",
      data: currentMonthData?.overallData?.numberOfPayment?.total || 0,
      tracking: staticTracking.checkOut,
    },
    {
      class: "rate-number",
      title: "Lượt đánh giá",
      data: currentMonthData?.overallData?.numberOfRating?.total || 0,
      tracking: staticTracking.rating,
    },
    {
      class: "register-number",
      title: "Lượt đăng ký",
      data: currentMonthData?.overallData?.numberOfNewUser?.total || 0,
      tracking: staticTracking.register,
    },
  ];

  return (
    <div className={StaticStyle["static-wrapper"]}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {options.map((option, index) => {
            return (
              <Grid item xs={12} md={2.4} key={index}>
                <div
                  className={[
                    StaticStyle["static-card"],
                    StaticStyle[`${option.class}`],
                  ].join(" ")}
                >
                  <div className={StaticStyle["static"]}>
                    <h1 className={StaticStyle["number"]}>{option.data}</h1>
                    <span className={StaticStyle["increase-number"]}>
                      {option.tracking != 0 ? (
                        option.tracking >= 0 ? (
                          <span>
                            <FontAwesomeIcon icon={faArrowUp} />{" "}
                            {option.tracking}%
                          </span>
                        ) : (
                          <span>
                            <FontAwesomeIcon icon={faArrowDown} />{" "}
                            {option.tracking}%
                          </span>
                        )
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </div>
                  <p className={StaticStyle["static-des"]}>{option.title}</p>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default StaticCard;
