import infoStyle from "./info.module.scss";
import Button from "@mui/material/Button";

export default function Info({ hotelInfo }) {
  return (
    <div className={infoStyle["container"]}>
      <h3 className={infoStyle["title"]}>Các đặc điểm nổi bật</h3>
      <h5 className={infoStyle["title"]}>
        {hotelInfo.hotelType?.hotelType} có {hotelInfo.roomType?.length} loại
        phòng với các tiện nghi:
      </h5>
      {hotelInfo.hotelAmenities?.map((el, index) => (
        <p key={index}>- {el.amenityName}</p>
      ))}
      <h5 className={infoStyle["title"]}>Giờ mở cửa: {hotelInfo.opening}</h5>
      <h5 className={infoStyle["title"]}>Giờ đóng cửa: {hotelInfo.closing}</h5>
      <h5 className={infoStyle["title"]}>Giờ checkin: {hotelInfo.checkin}</h5>
      <h5 className={infoStyle["title"]}>Giờ checkout: {hotelInfo.checkout}</h5>

      <Button variant="contained" className={infoStyle["reserve"]}>
        Lưu chỗ ngay
      </Button>
    </div>
  );
}
