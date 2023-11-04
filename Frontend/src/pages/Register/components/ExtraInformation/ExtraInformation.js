import TimeInput from "../TimeInput";
import { useContext, useMemo } from "react";
import { RegisterContext } from "@/utils/contexts";
import Checkbox from "../Checkbox";
import ExtraStyle from "./ExtraInformation.module.scss";

const getExtraInforLabel = (key) => {
  switch (key) {
    case "isHasCamera":
      return "Có camera an ninh 24/7";
    case "isAllowPet":
      return "Có cho phép động vật lưu trú";
    case "checkin":
      return "Giờ nhận phòng";
    case "checkout":
      return "Giờ trả phòng";
    case "opening":
      return "Giờ đóng cửa khách sạn";
    case "closing":
      return "Giờ mở cửa khách sạn";
      case "accessibility":
        return "Các cách truy cập"
    default:
      throw new Error("Invalid type");
  }
};

function ExtraInformation() {
  const { extraInfor, setExtraInfor } = useContext(RegisterContext);
  const extraInforKeys = useMemo(() => Object.keys(extraInfor), [extraInfor]);

  return (
    <div className={ExtraStyle["extra-info"]}>
      <h3>Một vài thông tin cuối cùng trước khi bắt đầu với Bookify</h3>
      <div className={ExtraStyle["body"]}>
        <div className={ExtraStyle["extra-checkbox"]}>
          <h4>Hãy cho chúng tôi biết nếu bạn có những thứ này</h4>
          <div className={ExtraStyle["select-box"]}>
            {extraInforKeys.reduce((prev, key) => {
              if (key === "isHasCamera" || key === "isAllowPet") {
                return [
                  ...prev,
                  <Checkbox
                    key={key}
                    id={key}
                    name="radio"
                    isChecked={extraInfor[key]}
                    label={getExtraInforLabel(key)}
                    setChecked={(state) => {
                      setExtraInfor((prev) => ({
                        ...prev,
                        [key]: state,
                      }));
                    }}
                  />,
                ];
              } else {
                return prev;
              }
            }, [])}
          </div>
        </div>
        <div className={ExtraStyle["input-time"]}>
          <h4>Thêm một vài thông tin hữu ích cho khách hàng</h4>

          <form>
            {extraInforKeys.reduce((prev, key) => {
              if (key !== "isHasCamera" && key !== "isAllowPet" && key !== "accessibility") {
                return [
                  ...prev,
                  <TimeInput
                    id={key}
                    label={getExtraInforLabel(key)}
                    time={extraInfor[key]}
                    key={key}
                    setTime={setExtraInfor}
                  />,
                ];
              } else {
                return prev;
              }
            }, [])}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExtraInformation;
