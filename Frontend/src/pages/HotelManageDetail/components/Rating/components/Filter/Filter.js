import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FitlerStyle from "./Filter.module.scss";
import { RatingContext } from "../../Rating";
import { useContext } from "react";
const ratePoint = [1, 2, 3, 4, 5];

function Filter() {
  const [filter, setFilter] = useContext(RatingContext);
  return (
    <div>
      <div
        className={[
          FitlerStyle["label-wrapper"],
          filter === 0 ? FitlerStyle["active"] : FitlerStyle["unactive"],
        ].join(" ")}
        onClick={() => setFilter(0)}
      >
        <div className={FitlerStyle["filter-label"]}>
          <h6>Tất cả</h6>
        </div>
      </div>
      {ratePoint.map((rate, index) => {
        return (
          <div
            className={[
              FitlerStyle["label-wrapper"],
              filter === rate ? FitlerStyle["active"] : FitlerStyle["unactive"],
            ].join(" ")}
            key={index}
            onClick={() => setFilter(rate)}
          >
            <div className={FitlerStyle["filter-label"]}>
              <h6>{rate}</h6>
              <FontAwesomeIcon icon={faStar} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Filter;
