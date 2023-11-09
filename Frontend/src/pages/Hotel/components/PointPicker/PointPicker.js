import styles from "./RoomAndBedRoomPicker.module.scss";
import NumberPicker from "../NumberPicker";

function PointPicker({ pickers, point, onSelect }) {
  return (
    <div id={styles["r-n-b-r-picker-section"]}>
      <div className={styles["r-n-b-r-picker"]}>
        {pickers.map(({ title, name, length }) => (
          <NumberPicker
            key={title}
            name={name}
            title={title}
            setValue={onSelect}
            length={length}
            currentValue={point[name]}
          />
        ))}
      </div>
    </div>
  );
}

export default PointPicker;
