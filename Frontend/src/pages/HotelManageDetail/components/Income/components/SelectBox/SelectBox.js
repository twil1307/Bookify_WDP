import SelectBoxStyle from "./SelectBox.module.scss";

const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 8",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

function SelectBox({ onChangeMonth }) {
  const currentMonth = new Date().getMonth() + 1;
  // console.log(currentMonth);
  const monthSelect = (e) => {
    onChangeMonth(e.target.value);
  };

  return (
    <div className={SelectBoxStyle["select-wrapper"]}>
      <label htmlFor="months" className={SelectBoxStyle["months-label"]}>
        Chọn một tháng để xem doanh thu
      </label>
      <div className={SelectBoxStyle["styled-select"]}>
        <select
          name="months"
          id="months"
          onChange={monthSelect}
          className={SelectBoxStyle["months"]}
        >
          {months.map((data, index) => {
            return (
              <option
                value={index + 1}
                key={index}
                disabled={index + 1 > currentMonth ? true : false}
                selected={index + 1 === currentMonth ? true : false}
              >
                {data}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default SelectBox;
