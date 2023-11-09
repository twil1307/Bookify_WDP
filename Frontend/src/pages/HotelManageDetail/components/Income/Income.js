import IncomeStyle from "./Income.module.scss";
import SelectBox from "./components/SelectBox";
import { income } from "./fakeIncomeData";
import { lazy, useState, Suspense, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getRandomExpected, getTotal } from "./IncomeService";
import getHotelManage from "@/services/hotel/getHotelManage";

const Chart = lazy(() => import("./components/Chart"));

function Income() {
  const [hotel, setHotel] = useOutletContext();
  const [days2, setDays2] = useState([]);
  const [totalIncome, setTotalIncome] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const incomeByMonth = [];

  useEffect(() => {
    // console.log(hotel);
    getHotelManage(hotel._id, "income", month).then((result) => {
      // console.log(result);
      setDays2(result.income.label);
      setTotalIncome(result.income.value);
    });
  }, [month]);

  const expectIncome2 = getRandomExpected(totalIncome);
  const total2 = getTotal(totalIncome);
  const expectIncomeTotal2 = getTotal(expectIncome2);

  const onChangeMonth = (data) => {
    setMonth(data);
  };

  return (
    <div className={IncomeStyle["income-wrapper"]}>
      <SelectBox onChangeMonth={onChangeMonth} />
      <div className={IncomeStyle["chart-wrapper"]}>
        <Suspense fallback={<div>Loading...</div>}>
          <Chart
            monthSelected={month}
            total={total2}
            days={days2}
            dayIncome={totalIncome}
            daysTotal={total2}
            expectIncome={expectIncomeTotal2}
            months={month}
            incomeByMonth={incomeByMonth}
            expected={expectIncome2}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default Income;
