import RoomPickers from "../RoomPickers";
import RoomStyle from "./RoomInformation.module.scss";
import { RegisterContext } from "@/utils/contexts";
import { useContext, useState } from "react";
import { roomInfoInitState } from "../../registerInitStates";

function RoomInformation() {
  const { roomType, setRoomType } = useContext(RegisterContext);
  const [indicator, setIndicator] = useState(0);
  const onChangeValue = (e) => {
    console.log(e);
    const newState = roomType.map((room) => {
      if (room.roomTypeID === e.roomTypeID) {
        return e;
      } else {
        return room;
      }
    });
    setRoomType(newState);
  };
  return (
    <>
      <div className={RoomStyle["header"]}>
        <h3 className={RoomStyle["heading"]}>
          Thiết lập các giá trị cho phòng thuê của khách
        </h3>
        <h3 style={{ textAlign: "center" }}>Loại phòng {indicator + 1}</h3>
      </div>

      <div className={RoomStyle["container"]}>
        {roomType.map((element, index) => (
          <div
            className={
              indicator == index
                ? RoomStyle["display-block"]
                : RoomStyle["display-hidden"]
            }
            key={element.roomTypeID}
          >
            <RoomPickers
              roomInfor={element}
              setRoomInfor={onChangeValue}
              index={index}
            />
          </div>
        ))}
      </div>
      <div className={RoomStyle["roomPagination"]}>
        {roomType.map((element, index) => (
          <div
            key={index}
            className={
              indicator == index
                ? RoomStyle["roomTypeNum_select"]
                : RoomStyle["roomTypeNum_unselect"]
            }
            onClick={() => setIndicator(index)}
          >
            <p>{index + 1}</p>
          </div>
        ))}
        <div
          className={RoomStyle["roomTypeNum_plus"]}
          onClick={() => {
            setRoomType([
              ...roomType,
              {
                ...roomInfoInitState,
                roomTypeID: Math.floor(Math.random() * 100),
              },
            ]);
            setIndicator(roomType.length);
          }}
        >
          <p>+</p>
        </div>
        <div
          className={
            roomType.length > 1
              ? RoomStyle["roomTypeNum_minus"]
              : RoomStyle["display-hidden"]
          }
          onClick={() => {
            setRoomType(roomType.slice(0, -1));
            setIndicator(roomType.length - 2);
          }}
        >
          <p>-</p>
        </div>
      </div>
    </>
  );
}

export default RoomInformation;
