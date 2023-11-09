import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useState } from "react";
import YearPickerStyle from "./YearPicker.module.scss";

const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

function YearPicker({ yearChanging }) {
  const [year, setYear] = useState(2023);
  const [yearCur, setYearCur] = useState(years[year]);
  const refLeft = useRef();
  const refRight = useRef();

  useEffect(() => {
    if (year <= 2014) {
      refLeft.current.style.display = "none";
      setYear(2014);
      setYearCur(years[year]);
    } else if (year >= 2023) {
      refRight.current.style.display = "none";
      setYear(2023);
      setYearCur(years[year]);
    } else {
      setYearCur(years[year]);
      refRight.current.style.display = "block";
      refLeft.current.style.display = "block";
    }
  }, [year]);

  const yearChangingHandle = (data) => {
    yearChanging(data);
  };

  return (
    <div className={YearPickerStyle["month-picker-wrapper"]}>
      <div>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => {
            setYear(year - 1);
            yearChangingHandle(year - 1);
          }}
          className={YearPickerStyle["arrow-left"]}
          ref={refLeft}
        />
      </div>
      <div className={YearPickerStyle["month-label"]}>
        <h3>{year}</h3>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => {
            setYear(year + 1);
            yearChangingHandle(year + 1);
          }}
          className={YearPickerStyle["arrow-right"]}
          ref={refRight}
        />
      </div>
    </div>
  );
}

export default YearPicker;
