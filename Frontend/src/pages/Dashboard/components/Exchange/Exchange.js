import ExchangeStyle from "./Exchange.module.scss";
import Chart from "./Chart";
import Table from "./Table";
import { TransactionDataYears } from "./AllService";
import { useEffect, useState } from "react";

function Exchange() {
  const [exchangeData, setExchangeData] = useState([]);
  const [year, setYear] = useState("2023");
  const [type, setType] = useState("month");

  useEffect(() => {
    const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/dashboard/exchange?year=${year}&type=${type}`;

    fetch(url, {
      method: "GET",
      credentials: "include",
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((result) => {
        setExchangeData(result);
      });
  }, [year, type]);

  return (
    <div className={ExchangeStyle["container"]}>
      <Chart
        exchangeData={exchangeData}
        year={year}
        setYear={setYear}
        type={type}
        setType={setType}
      />
      <Table exchangeData={exchangeData} />
    </div>
  );
}
export default Exchange;
