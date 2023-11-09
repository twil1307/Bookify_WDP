import { useState, useRef } from "react";
import TimeInputStyle from "./TimeInput.module.scss";
function TimeInput({ label, time, setTime, id }) {
  const maxHour = 24;
  const maxMinutes = 60;
  const hourInputRef = useRef();
  const minutesInputRef = useRef();
  const reg = /\d{1,}/gm;

  const handleHourChange = (e) => {
    if (e.target.value.length > 2) {
      return;
    }

    if (e.target.value.length === 0) {
      setTime((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          hour: "",
        },
      }));
    } else if (e.target.value.match(reg)) {
      if (parseInt(e.target.value) > maxHour) {
        minutesInputRef.current.focus();
        setTime((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            hour: maxHour,
          },
        }));
      } else {
        setTime((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            hour: e.target.value.trim(),
          },
        }));
      }
    }
  };

  const handleMinutesChange = (e) => {
    if (e.target.value.length > 2) {
      return;
    }

    if (e.target.value.length === 0) {
      setTime((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          minutes: "",
        },
      }));
    } else if (e.target.value.match(reg)) {
      if (parseInt(e.target.value) > maxMinutes) {
        setTime((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            minutes: maxMinutes,
          },
        }));
      } else {
        setTime((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            minutes: e.target.value.trim(),
          },
        }));
      }
    }
  };

  return (
    <div className={TimeInputStyle["input-time"]}>
      <label>{label}</label>
      <div className={TimeInputStyle["input-grid"]}>
        <input
          type="text"
          value={time.hour}
          onChange={handleHourChange}
          ref={hourInputRef}
        />
        <span>:</span>
        <input
          type="text"
          value={time.minutes}
          onChange={handleMinutesChange}
          ref={minutesInputRef}
        />
      </div>
    </div>
  );
}

export default TimeInput;
