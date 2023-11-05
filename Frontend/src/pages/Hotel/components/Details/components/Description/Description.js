import DescriptionStyle from "./Description.module.scss";

function Description({
  description,
  hotelOwner,
  country,
  address,
  checkin,
  checkout,
  city,
  district,
}) {
  return (
    <div>
      <h3 className={DescriptionStyle["title"]}>Giới thiệu về khách sạn</h3>
      <p className={DescriptionStyle["description"]}>
        Địa chỉ khách sạn: {address},{district},{city} {country}
      </p>
      <p className={DescriptionStyle["description"]}>Ghi chú: {description}</p>
      <div className={DescriptionStyle["host-info"]}>
        <div className={DescriptionStyle["img-container"]}>
          <img
            src={
              hotelOwner?.avatar ||
              "https://images.assetsdelivery.com/compings_v2/tuktukdesign/tuktukdesign1606/tuktukdesign160600119.jpg"
            }
            alt=""
          />
        </div>
        <div className={DescriptionStyle["host"]}>
          <h4 className={DescriptionStyle["host-name"]}>
            {hotelOwner?.subName || hotelOwner?.name
              ? hotelOwner?.subName + " " + hotelOwner?.name
              : hotelOwner?.username}
          </h4>
          <p className={DescriptionStyle["host-sub"]}>
            Đã tham gia vào tháng {new Date(hotelOwner?.createdAt).getMonth()}{" "}
            năm {new Date(hotelOwner?.createdAt).getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Description;
