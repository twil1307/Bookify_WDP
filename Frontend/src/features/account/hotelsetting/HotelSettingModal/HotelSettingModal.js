import HotelSettingForm from "../HotelSettingForm";
import ModalStyle from "../HotelSetting.module.scss";
function HotelSettingModal() {
  return (
    <div className={ModalStyle["modal-container"]}>
      <p>Thay đổi cài đặt khách sạn</p>
      <HotelSettingForm roomCapacity={6} petsAllow={2} />
    </div>
  );
}
export default HotelSettingModal;
