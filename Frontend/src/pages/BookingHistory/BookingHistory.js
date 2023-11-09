import Header from "./components/HeaderInfo";
import Body from "./components/Body";
import { HistoryContext, UserContext } from "@/utils/contexts";
import { useContext, useEffect, useMemo, useState } from "react";
import BookingHistoryStyle from "./BookingHistory.module.scss";
import { GetBookingHistory } from "@/services/user";
import { Grid } from "@mui/material";

function BookingHistory() {
  const { user } = useContext(UserContext);
  const [value, setValue] = useState([]);

  useEffect(() => {
    GetBookingHistory("all").then((result) => setValue(result));
  }, []);

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={10}>
        <div className={BookingHistoryStyle[""]}>
          <Header />
          <HistoryContext.Provider value={[value, setValue]}>
            <Body />
          </HistoryContext.Provider>
        </div>
      </Grid>
    </Grid>
  );
}
export default BookingHistory;
