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
    case "bedType":
      return "Loại phòng ngủ";
    case "bathroomType":
      return "Loại phòng tắm";
    default:
  }
};

function RoomPickers({ roomInfor, setRoomInfor, index }) {
  const limitPrice = 10000;

  return (
    <div className={PickerStyle["picker"]}>
     
      {Object.keys(roomInfor).reduce((prev, key) => {
        if (
          key === "price" ||
          key === "isPrivateBathRoom" ||
          key === "id" ||
          key === "bedType" ||
          key === "bathroomType" ||
          key === "roomTypeID"
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
                setRoomInfor({
                  ...roomInfor,
                  [key]: value || 0,
                });
              }}
              disabled={false}
            />,
          ];
        }
      }, [])}
      <div className={PickerStyle["price-picker"]}>
        <div>
          <NumberPicker
            title={"Giá tiền mỗi đêm"}
            description={""}
            limit={limitPrice}
            value={roomInfor["price"]}
            setValue={(value) => {
              setRoomInfor({
                ...roomInfor,
                price: value || 0,
              });
            }}
          />
        </div>
      </div>
      <div className={PickerStyle["bath-picker"]}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <h4 style={{ width: "280px" }}>Phòng tắm:</h4>
          <div style={{ width: "200px" }}></div>
        </div>
        <div className={PickerStyle["bath-picker-button"]}>
          <div className={PickerStyle["picker-button"]}>
            <input
              type="radio"
              id={"picker-1" + roomInfor.roomTypeID}
              name={"picker-" + roomInfor.roomTypeID}
              checked={roomInfor.isPrivateBathRoom == false}
              onChange={(e) =>
                setRoomInfor({
                  ...roomInfor,
                  isPrivateBathRoom: false,
                })
              }
            />
            <label for={"picker-1" + roomInfor.roomTypeID}>
              {" "}
              Phòng tắm chung
            </label>
          </div>
          <div className={PickerStyle["picker-button"]}>
            <input
              type="radio"
              id={"picker-2" + roomInfor.roomTypeID}
              name={"picker-" + roomInfor.roomTypeID}
              checked={roomInfor.isPrivateBathRoom == true}
              onChange={(e) =>
                setRoomInfor({
                  ...roomInfor,
                  isPrivateBathRoom: true,
                })
              }
            />
            <label for={"picker-2" + roomInfor.roomTypeID}>
              {" "}
              Phòng tắm riêng
            </label>
          </div>
        </div>
      </div>
      <div className={PickerStyle["bath-picker"]}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <h4 style={{ width: "280px" }}>Loại phòng tắm:</h4>
          <div style={{ width: "200px" }}></div>
        </div>
        <div className={PickerStyle["bath-picker-button"]}>
          <div className={PickerStyle["picker-button"]}>
            <input
              type="radio"
              id={"picker-2-1-" + roomInfor.roomTypeID}
              name={"picker-2-" + roomInfor.roomTypeID}
              checked={roomInfor.bathroomType == "Ensuite"}
              onChange={(e) =>
                setRoomInfor({
                  ...roomInfor,
                  bathroomType: "Ensuite",
                })
              }
            />
            <label for={"picker-2-1-" + roomInfor.roomTypeID}> Ensuite</label>
          </div>
          <div className={PickerStyle["picker-button"]}>
            <input
              type="radio"
              id={"picker-2-2-" + roomInfor.roomTypeID}
              name={"picker-2-" + roomInfor.roomTypeID}
              checked={roomInfor.bathroomType == "Shared"}
              onChange={(e) =>
                setRoomInfor({
                  ...roomInfor,
                  bathroomType: "Shared",
                })
              }
            />
            <label for={"picker-2-2-" + roomInfor.roomTypeID}> Shared</label>
          </div>
        </div>
      </div>
      <div className={PickerStyle["bath-picker"]}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <h4 style={{ width: "280px" }}>Phòng ngủ:</h4>
          <div style={{ width: "200px" }}></div>
        </div>
        <div className={PickerStyle["bath-picker-button"]}>
          <div className={PickerStyle["picker-button"]}>
            <input
              type="radio"
              id={"bedpicker-" + roomInfor.roomTypeID}
              name={"bedpicker-" + roomInfor.roomTypeID}
              checked={roomInfor.bedType == "Queen Size"}
              onChange={(e) =>
                setRoomInfor({
                  ...roomInfor,
                  bedType: "Queen Size",
                })
              }
            />
            <label for={"bedpicker-" + roomInfor.roomTypeID}>Queen Size</label>
          </div>
          <div className={PickerStyle["picker-button"]}>
            <input
              type="radio"
              id={"bedpicker-2-" + roomInfor.roomTypeID}
              name={"bedpicker-" + roomInfor.roomTypeID}
              checked={roomInfor.bedType == "King Size"}
              onChange={(e) =>
                setRoomInfor({
                  ...roomInfor,
                  bedType: "King Size",
                })
              }
            />
            <label for={"bedpicker-2-" + roomInfor.roomTypeID}>
              {" "}
              King Size
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomPickers;
