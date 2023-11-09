import HeaderStyle from "../../HotelManage.module.scss";
import { Grid } from "@mui/material";
import { useOutletContext } from "react-router-dom";

function Header() {
  const [hotel, setHotel] = useOutletContext();

  return (
    <div className={HeaderStyle["header"]}>
      <Grid container justifyContent={"center"}>
        <Grid item xs={10}>
          <div className={HeaderStyle["header-text"]}>
            <h2>{hotel?.hotelName}</h2>
            <p className={HeaderStyle["sub-title"]}>
              Xem xét hoạt động và đánh giá mức độ yêu thích của khách hàng dành
              cho khách sạn.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default Header;
