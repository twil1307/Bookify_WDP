// Components

import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// styles
import advanceFilterStyles from "./AdvanceFilter.module.scss";

import { usePopup } from "@/utils/hooks";
import { UserContext } from "@/utils/contexts";
import { ToastMessageContext } from "@/utils/contexts";
import {
  getSuccessToastMessage,
  getFailureToastMessage,
} from "@/utils/reducers/toastMessageReducer";

function AdvanceFilter({
  isAdvanceFilterOpen,
  setAdvanceFilterOpen,
  getAdvanceFilterHotel,
  hotelInfo,
}) {
  const [isOpen, handleClick, containerRef] = usePopup(isAdvanceFilterOpen);
  const { setToastMessages } = useContext(ToastMessageContext);
  // console.log(hotelInfo);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);
  // console.log(user._id);
  useEffect(() => {
    setAdvanceFilterOpen(isOpen);
    //eslint-disable-next-line
  }, [isOpen]);

  const submitReport = () => {
    // console.log(title);
    // console.log(content);
    const reportForm = new FormData();

    reportForm.append("title", title);
    reportForm.append("content", content);
    fetch(`http://localhost:3001/hotel/${hotelInfo._id}/report`, {
      method: "POST",
      body: reportForm,
      credentials: "include",
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((result) => {
        setAdvanceFilterOpen(false);
        // console.log(result);
        setToastMessages(
          getSuccessToastMessage({
            message: "Báo cáo thành công",
          })
        );
      });
  };

  useEffect(() => {
    if (!user._id) {
      setToastMessages(
        getFailureToastMessage({
          message: "Đăng nhập để thực hiện",
        })
      );
    }
  }, []);

  return (
    <div
      id={advanceFilterStyles["advance-filter"]}
      ref={containerRef}
      tabIndex={-1}
    >
      <div className={advanceFilterStyles["heading"]} tabIndex={-1}>
        <h4 className={advanceFilterStyles["filter-heading"]}>
          Báo cáo khách sạn
        </h4>
      </div>
      <Box
        sx={{
          marginTop: "54.11px",
          overflowY: "scroll",
          padding: "0 2em",
          height: "76vh",
        }}
      >
        <div className={advanceFilterStyles["report-description"]}>
          <p>
            Bạn vừa có 1 trải nghiệm không đáng có về chuyến đi hoặc bị đe dọa?
            Hãy báo cáo ngay cho chúng tôi. Lorem Ipsum is simply dummy text of
            the printing and typesetting industry.
          </p>
        </div>
        <div className={advanceFilterStyles["report-body"]}>
          <h4>Báo cáo về khách sạn</h4>
          <div className={advanceFilterStyles["report-title"]}>
            <label htmlFor="title">Tiêu đề</label>
            <input
              type="text"
              id={"title"}
              placeholder={"Tiêu đề của báo cáo"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={advanceFilterStyles["report-content"]}>
            <label htmlFor="content">Báo cáo</label>
            <textarea
              type="text"
              id={"content"}
              placeholder={"Nội dung báo cáo"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </Box>
      <div className={advanceFilterStyles["footer"]}>
        <Box>
          <button className={advanceFilterStyles["reset-button"]}>
            Xóa tất cả
          </button>
        </Box>
        <Box
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <button
            className={advanceFilterStyles["find-button"]}
            onClick={submitReport}
          >
            Gửi báo cáo
          </button>
        </Box>
      </div>
      <button
        className={advanceFilterStyles["close-button"]}
        onClick={(e) => {
          setAdvanceFilterOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}

export default AdvanceFilter;
