import { useState, useCallback, useMemo } from "react";
import FormStyle from "../HotelSetting.module.scss";
function HotelSettingForm(requirement) {
  const [settings, setSettings] = useState({
    adults: 2,
    kids: 0,
    infants: 0,
    pets: 0,
    beds: null,
  });
  const [isValid, setIsValid] = useState({
    adults: true,
    kids: true,
    infants: true,
    pets: true,
    beds: true,
  });
  const checkVerify = useMemo(
    () => {
      const inputsValid = Object.keys(settings).every((key) => {
        return settings[key] != null;
      });
      const capacityValid =
        settings.adults + settings.kids + settings.infants <=
          requirement.roomCapacity && settings.pets <= requirement.petsAllow;

      const requirementValid = Object.keys(isValid).every((key) => {
        return isValid[key];
      });
      return inputsValid && requirementValid && capacityValid;
    },
    //eslint-disable-next-line
    [settings, isValid]
  );
  const handleClick = () => {
    setSettings();
  };
  console.log(checkVerify);
  const handleForm = (e) => {
    e.preventDefault();
  };
  const clickHandler = () => {
    setSettings()
  };
  return (
    <>
      <form onSubmit={handleForm} className={FormStyle["form-container"]}>
        <div>
          <p>Giới hạn số người tối đa mỗi phòng</p>
          <div>
            <div class="container">
              <p>Người lớn</p>
              <button onClick>-</button>
              <input type="text" value={settings.adults} viewOnly="true" />
              <button>+</button>
            </div>
            <div class="container">
              <p>Trẻ em</p>
              <button>-</button>
              <input type="text" value={settings.kids} viewOnly="true" />
              <button>+</button>
            </div>
            <div class="container">
              <p>trẻ em dưới 2 tuổi</p>
              <button>-</button>
              <input type="text" value={settings.infants} viewOnly="true" />
              <button>+</button>
            </div>
            <div class="container">
              <p>Thú cưng</p>
              <button data-decrease>-</button>
              <input
                data-value
                type="text"
                value={settings.pets}
                viewOnly="true"
              />
              <button data-increase>+</button>
            </div>
          </div>
        </div>
        <div>
          <b>Chọn loại giường bạn đang có</b>
          <div>
            <div>Giường đơn</div>
            <div>Giường đôi</div>
            <div>Giường đôi</div>
          </div>
        </div>
      </form>
    </>
  );
}

export default HotelSettingForm;
