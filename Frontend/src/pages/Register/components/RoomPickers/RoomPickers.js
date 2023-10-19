import { RegisterContext } from "@/utils/contexts";
import { useContext } from "react";
import NumberPicker from "@/components/NumberPicker";
import PickerStyle from "./RoomPickers.module.scss";

const getTitle = (key) => {
  switch (key) {
    case "numberOfGuests":
      return "Số khách";
    case "numberOfRoom":
      return "Số phòng ngủ";
    case "numberOfBed":
      return "Số giường";
    case "numberOfBathroom":
      return "Số phòng tắm";
    case "price":
      return "Giá tiền mỗi đêm";
    case "rooms":
      return "Số lượng phòng";
    case "isPrivateBathRoom":
      return "Phòng tắm là chung hay riêng";
    default:
      throw new Error("Invalid key");
  }
};

function RoomPickers() {
  const { roomInfor, setRoomInfor } = useContext(RegisterContext);
  const limitPrice = 10000;

  return (
    <div className={PickerStyle["picker"]}>
      {Object.keys(roomInfor).reduce((prev, key) => {
        if (
          key === "price" ||
          key === "isPrivateBathRoom" || key === 'id'
        ) {
          return prev;
        } else {
          return [
            ...prev,
            <NumberPicker
              title={getTitle(key)}
              description={""}
              limit={100}
              value={roomInfor[key]}
              setValue={(value) => {
                setRoomInfor((prevState) => ({
                  ...prevState,
                  [key]: value || 0,
                }));
              }}
              disabled={false}
            />,
          ];
        }
      }, [])}
      <div className={PickerStyle["bath-picker"]}>
        <h4>Phòng tắm:</h4>
        <div className={PickerStyle["bath-picker-button"]}>
          <div className={PickerStyle["picker-button"]}>
            <input
              type="radio"
              id="bath-picker-1"
              name="picker"
              onClick={(e) =>
                setRoomInfor((prev) => ({
                  ...prev,
                  isPrivateBathRoom: false,
                }))
              }
            />
            <label for="bath-picker-1"> Phòng tắm chung</label>
          </div>
          <div className={PickerStyle["picker-button"]}>
            <input
              type="radio"
              id="bath-picker-2"
              name="picker"
              onClick={(e) =>
                setRoomInfor((prev) => ({
                  ...prev,
                  isPrivateBathRoom: true,
                }))
              }
            />
            <label for="bath-picker-2"> Phòng tắm riêng</label>
          </div>
        </div>
      </div>
      <div className={PickerStyle["price-picker"]}>
        <p>Giá tiền mỗi đêm</p>
        <div>
          <NumberPicker
            description={""}
            limit={limitPrice}
            value={roomInfor["price"]}
            setValue={(value) => {
              setRoomInfor((prevState) => ({
                ...prevState,
                price: value || 0,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomPickers;
