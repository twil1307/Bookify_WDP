import TableStyle from "../Hotel.module.scss";
import moment from "moment";
import { useMemo } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Table({ data, filter, hotels }) {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <th>Tên chủ khách sạn</th>
        <th style={{ marginLeft: "2rem" }}>Tên khách sạn</th>
        <th>Thời gian</th>
        <th>Trạng thái</th>
        <th>Chi tiết</th>
      </thead>
      <tbody>
        {hotels?.map((row) => (
          <tr>
            <td>
              <p>
                {row.user.subName && row.user.name
                  ? row.user.subName + " " + row.user.name
                  : row.user.username}
              </p>
              <p>ID:{row.user._id}</p>
            </td>
            <td style={{ marginLeft: "2rem" }}>
              <p>{row.hotelName}</p>
            </td>
            <td>
              <p>{format(new Date(row.createdAt), "MM dd,yyyy")}</p>
              <p>Lúc: 12:00</p>
            </td>
            <td>
              {row.isVerified === true ? (
                <p className={TableStyle["active"]}>Hoạt động</p>
              ) : row.isVerified === false ? (
                <p className={TableStyle["waiting"]}>Xét duyệt</p>
              ) : (
                <p className={TableStyle["cancel"]}></p>
              )}
            </td>
            <td>
              <button
                onClick={() => {
                  navigate(`/hotel/${row._id}`);
                }}
              >
                <b>Chi tiết</b>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;
