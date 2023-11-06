import { OverrallDataContext } from "@/pages/Payment/Payment";
import { useContext, useEffect, useState } from "react";
import HistoryData from "./components/HistoryData";
import MonthPicker from "./components/MonthPicker";
import HistoryStyle from "./History.module.scss";

function History({ data }) {
  const [showmore, setShowmore] = useState(false);
  useEffect(() => {
    document.getElementById("list-history").scrollTo(0, 0);
  }, [showmore]);

  const [paymentList, setPaymentList] = useContext(OverrallDataContext);

  return (
    <div className={HistoryStyle["history-list"]}>
      <MonthPicker />
      <div
        className={
          showmore
            ? HistoryStyle["stat-list-active"]
            : HistoryStyle["stat-list"]
        }
        id="list-history"
      >
        {paymentList == null || paymentList.length === 0 ? (
          <h3>Bạn chưa thực hiện giao dịch nào</h3>
        ) : (
          <HistoryData data={paymentList} />
        )}
      </div>
      {paymentList == null || paymentList.length === 0 ? (
        <div></div>
      ) : (
        <button
          className={
            paymentList.length > 4
              ? HistoryStyle["show-btn"]
              : HistoryStyle["hide-btn"]
          }
          onClick={() => {
            setShowmore(!showmore);
          }}
        >
          {showmore ? "Ẩn đi" : "Hiển thị thêm"}
        </button>
      )}
    </div>
  );
}

export default History;
