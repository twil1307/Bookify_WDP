import style from "./room.module.scss";
export default function RoomPicker({
  roomType,
  setChooseType,
  handleClick,
  handleResetState,
}) {
  return (
    <div className={style["container"]}>
      {roomType.map((type, index) => (
        <div
          key={index}
          className={style["item"]}
          onClick={() => {
            setChooseType({ ...type, index: index });
            handleResetState();
            handleClick("roomTypeBox");
          }}
        >
          <p>
            Phòng loại {index + 1}:{" "}
            {(type.roomPrice * 24000)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VND/đêm
          </p>
          <p>
            ({type.bedNum} giường,{type.bathNum} bồn tắm)
          </p>
        </div>
      ))}
    </div>
  );
}
