import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import numberPickerStyles from "./NumberPicker.module.scss";
import { useEffect, useState } from "react";

function NumberPicker({
  title,
  description,
  limit,
  value,
  setValue,
  disabled = false,
  total,
  isAllowPet = true,
}) {
  const [isExceedLimit, setExceedLimit] = useState(false);
  const [isZero, setZero] = useState(value === 0);

  const handleDecrease = (event) => {
    event.stopPropagation();
    if (value - 1 < 0) {
      return;
    }
    setValue(value - 1);
  };

  const handleIncrease = (event) => {
    event.stopPropagation();
    if (value === limit || disabled || !isAllowPet) {
      return;
    }
    setValue(value + 1);
  };

  useEffect(() => {
    // if number less than zero
    if (value - 1 < 0) {
      setZero(true);
    } else {
      setZero(false);
    }
    // if number exceed limit
    if (value === limit || disabled || !isAllowPet) {
      setExceedLimit(true);
    } else {
      setExceedLimit(false);
    }

    //eslint-disable-next-line
  }, [value]);

  return (
    <div key={title} className={numberPickerStyles["number-picker"]}>
      <div className={numberPickerStyles["picker-info"]}>
        <p className={numberPickerStyles["title"]}>{title}</p>
        <p className={numberPickerStyles["description"]}>{description}</p>
      </div>
      <div className={numberPickerStyles["picker"]}>
        <button
          className={[
            numberPickerStyles["decrease-button"],
            isZero ? numberPickerStyles["disabled"] : "",
            1,
          ].join(" ")}
          onClick={handleDecrease}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          className={numberPickerStyles["value"]}
          value={value}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value > limit - total || value > limit) {
              setValue(limit - total);
            } else {
              setValue(value);
            }
          }}
        ></input>
        <button
          className={[
            numberPickerStyles["increase-button"],
            isExceedLimit ? numberPickerStyles["disabled"] : "",
            disabled ? numberPickerStyles["disabled"] : "",
          ].join(" ")}
          onClick={handleIncrease}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
}

export default NumberPicker;
