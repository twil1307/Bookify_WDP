import { guestsInitial } from "@/pages/Hotel/hotelInitState";
import style from "./room.module.scss";
export default function RoomPicker({
  roomType,
  setChooseType,
  handleClick,
  setGuests,
}) {
  return (
    <div className={style["container"]}>
      {roomType.map((type, index) => (
        <div
          key={index}
          className={style["item"]}
          onClick={() => {
            setChooseType({ ...type, index: index });
            setGuests(guestsInitial);
            handleClick("roomTypeBox");
          }}
        >
          <p>
            Phòng loại {index + 1}: ${type.roomPrice}/đêm
          </p>
          <p>
            ({type.bedNum} giường,{type.bathNum} bồn tắm)
          </p>
        </div>
      ))}
    </div>
  );
}
