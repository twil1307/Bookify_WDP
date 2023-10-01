import priceRangePickerStyles from "./PriceRangePicker.module.scss";
import { useId } from "react";

function PriceRangePicker({ price, setPrice }) {
  const minInputPriceId = useId();
  const maxInputPriceId = useId();

  return (
    <div id={priceRangePickerStyles["price-range-picker"]}>
      <h4 className={priceRangePickerStyles["heading"]}>Khoảng giá phòng</h4>
      <p className={priceRangePickerStyles["sub-heading"]}>
        Giá trung bình mỗi đêm là{" "}
        <span className={priceRangePickerStyles["average-price"]}>$200</span>
      </p>
      <div className={priceRangePickerStyles["price-inputs"]}>
        <div
          className={[
            priceRangePickerStyles["price-range-input"],
            priceRangePickerStyles["lower-limit-input"],
          ].join(" ")}
        >
          <input
            id={minInputPriceId}
            value={price?.min || 0}
            onChange={(event) => setPrice(prev => ({
              ...prev,
              min: event.target.value
            }))}
          />
          <label
            htmlFor={minInputPriceId}
            className={priceRangePickerStyles["label-input"]}
          >
            Giá thấp nhất
          </label>
          <div className={priceRangePickerStyles["currency"]}>USD</div>
        </div>
        <span className={priceRangePickerStyles["line-separetor"]}></span>
        <div
          className={[
            priceRangePickerStyles["price-range-input"],
            priceRangePickerStyles["lower-limit-input"],
          ].join(" ")}
        >
          <input
            id={maxInputPriceId}
            value={price?.max || 1000}
            onChange={(event) => setPrice(prev => ({
              ...prev,
              max: event.target.value
            }))}
          />
          <label
            htmlFor={maxInputPriceId}
            className={priceRangePickerStyles["label-input"]}
          >
            Giá cao nhất
          </label>
        </div>
      </div>
    </div>
  );
}

export default PriceRangePicker;
