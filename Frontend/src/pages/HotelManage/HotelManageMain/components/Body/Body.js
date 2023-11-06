import BodyStyle from "../../HotelManage.module.scss";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useState, useMemo } from "react";
import { ModalContext } from "@/utils/contexts";
import { useContext } from "react";
import Setting from "./Setting";
import BookingList from "./BookingList";
import {
  faPencil,
  faMoneyBill,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import {
  getHotelSettingModal,
  getSignInModal,
} from "@/utils/reducers/modalReducer";

function Body() {
  const { dispatch } = useContext(ModalContext);
  const navigate = useNavigate();
  const [hotel, setHotel] = useOutletContext();

  const options = useMemo(
    () => [
      {
        icon: faPencil,
        title: "Thay đổi cài đặt khách sạn",
        handleClick: () => {
          if (hotel) {
            navigate(`/hosting/update/${hotel._id}`);
          }
        },
      },
      {
        icon: faMoneyBill,
        title: "Tinh chỉnh giá phòng",
        handleClick: () => {
          if (hotel) {
            navigate(`/hosting/update/${hotel._id}`);
          }
        },
      },
      {
        icon: faCalendarWeek,
        title: "Cập nhật trạng thái khả dụng",
        handleClick: () => {
          if (hotel) {
            navigate(`/hosting/update/${hotel._id}`);
          }
        },
      },
    ],
    [hotel]
  );

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={10}>
        <div className={BodyStyle["body"]}>
          <div className={BodyStyle["body-header"]}>
            <h3>Lịch đặt phòng hôm nay</h3>
          </div>
          <BookingList width="30rem" />
          <div className={BodyStyle["change-setting"]}>
            <h3>Thay đổi và chỉnh sửa</h3>
            <Grid container className={BodyStyle["grid-display"]} spacing={2}>
              {options.map((setting, index) => (
                <Setting key={index} setting={setting} />
              ))}
            </Grid>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
export default Body;
