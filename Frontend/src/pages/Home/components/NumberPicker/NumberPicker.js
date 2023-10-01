import numberPickerStyles from "./NumberPicker.module.scss";
import { memo } from "react";

function NumberChoice({ value, currentValue, handlePicked }) {
  const displayValue = value || "Bất kỳ";
  const maxValue = 8;

  return (
    <button
      className={[
        numberPickerStyles["number-choice"],
        currentValue === (value || null) ? numberPickerStyles["active"] : "",
      ].join(" ")}
      onClick={(event) => {
        event.stopPropagation();
        handlePicked(value || null);
      }}
    >
      {displayValue === maxValue ? `${value}+` : displayValue}
    </button>
  );
}

function NumberPicker({ title, name, currentValue, setValue, length }) {
  return (
    <div className={numberPickerStyles["number-picker"]}>
      <div className={numberPickerStyles["number-picker-heading"]}>{title}</div>
      <div>
        {Array.from(new Array(length)).map((unusedValue, index) => (
          <NumberChoice
            key={index}
            value={index}
            handlePicked={(value) => {
              setValue((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            currentValue={currentValue}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(NumberPicker);
