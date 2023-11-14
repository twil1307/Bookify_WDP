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
import { pickers, pointInitialState } from "./ReviewInitState";
import PointPicker from "../PointPicker";
import { reviewDataContext } from "../../Hotel";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

function AdvanceFilter({
  isReviewOpen,
  setIsReviewOpen,
  getReviewHotel,
  hotelInfo,
}) {
  const [isOpen, handleClick, containerRef] = usePopup(isReviewOpen);
  const { setToastMessages } = useContext(ToastMessageContext);
  const [point, setPoint] = useState(pointInitialState);
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);
  const [currentReview, setCurrentReview] = useContext(reviewDataContext);
  console.log(hotelInfo);
  useEffect(() => {
    setIsReviewOpen(isOpen);
    //eslint-disable-next-line
  }, [isOpen]);

  const submitReview = () => {
    // console.log(point);
    // console.log(content);

    const reportForm = new FormData();
    // reportForm.append("hotelid", hotelInfo._id);
    reportForm.append("content", content);
    reportForm.append("accuracyPoint", point.accuracy_point);
    reportForm.append("locationPoint", point.location_point);
    reportForm.append("valuePoint", point.value_point);
    reportForm.append("communicationPoint", point.communication_point);
    fetch(
      `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel/${hotelInfo._id}/review`,
      {
        method: "POST",
        body: reportForm,
        credentials: "include",
        withCredentials: true,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setIsReviewOpen(false);
        setCurrentReview([
          ...currentReview,
          {
            accuracyPoint: point.accuracy_point,
            communicationPoint: point.communication_point,
            content: content,
            createdAt: format(new Date(), "hh:mm dd-MM-yyy"),
            hotelId: hotelInfo.hotelId,
            locationPoint: point.location_point,
            reviewId: uuid(),
            sourceId: 0,
            userId: user._id,
            username:
              user.subname && user.name ? user.subname + " " + user.name : null,
            avatar: user.avatar ? user.avatar : null,
            usernameAcount: user.username,

            valuePoint: point.value_point,
          },
        ]);
        setToastMessages(
          getSuccessToastMessage({
            message: "Báo cáo thành công",
          })
        );
      });
  };

  return (
    <div
      id={advanceFilterStyles["advance-filter"]}
      ref={containerRef}
      tabIndex={-1}
    >
      <div className={advanceFilterStyles["heading"]} tabIndex={-1}>
        <h4 className={advanceFilterStyles["filter-heading"]}>
          Đánh giá về chuyến đi của bạn
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
            Bạn vừa hoàn thành chuyến đi ở {hotelInfo.hotelName}, hãy đánh giá
            về dịch vụ của {hotelInfo.hotelName} để mọi người có thể tham khảo
            !!!
          </p>
        </div>
        <div className={advanceFilterStyles["report-body"]}>
          <h3>Hãy cho điểm về các dịch vụ của khách sạn</h3>
          <div>
            <PointPicker pickers={pickers} point={point} onSelect={setPoint} />
          </div>
          <div className={advanceFilterStyles["report-content"]}>
            <label htmlFor="content">Feedback</label>
            <textarea
              type="text"
              id={"content"}
              placeholder={"Chia sẻ suy nghĩ của bạn"}
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
            onClick={submitReview}
          >
            Gửi đánh giá
          </button>
        </Box>
      </div>
      <button
        className={advanceFilterStyles["close-button"]}
        onClick={(e) => {
          setIsReviewOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}

export default AdvanceFilter;
