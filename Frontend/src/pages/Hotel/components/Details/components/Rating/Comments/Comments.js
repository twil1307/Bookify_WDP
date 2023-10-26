import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CommentStyle from "./Comments.module.scss";
import { useContext, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { reviewContext, reviewDataContext } from "@/pages/Hotel/Hotel";
import { UserContext } from "@/utils/contexts";
import { ToastMessageContext } from "@/utils/contexts";
import { getFailureToastMessage } from "@/utils/reducers/toastMessageReducer";
import { format } from "date-fns";

function Comments({ reviews, hotelId }) {
  const [isReviewOpen, setIsReviewOpen] = useContext(reviewContext);
  const { setToastMessages } = useContext(ToastMessageContext);
  const { user } = useContext(UserContext);
  const [currentReview, setCurrentReview] = useContext(reviewDataContext);
  console.log(currentReview);
  const checkUser = () => {
    if (user._id) {
      fetch(
        `http://localhost:8080/bookify/api/hotel/review?hotelid=${hotelId}&userid=${user._id}`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.require) {
            setToastMessages(
              getFailureToastMessage({
                message: "Bạn chưa từng ở khách sạn này",
              })
            );
          }
          if (result.success) {
            setIsReviewOpen(true);
          }
        });
    } else {
      setToastMessages(
        getFailureToastMessage({
          message: "Đăng nhập để thực hiện",
        })
      );
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} columnSpacing={{ xs: 2, sm: 2, md: 10 }}>
          {currentReview?.map((review, index) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <div className={CommentStyle["item"]}>
                  <div className={CommentStyle["item-header"]}>
                    <div className={CommentStyle["user"]}>
                      <div className={CommentStyle["avatar-container"]}>
                        <img
                          src={
                            review.avatar
                              ? review.avatar
                              : "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1"
                          }
                          alt=""
                        />
                      </div>
                      <div className={CommentStyle["user-info"]}>
                        <h6 className={CommentStyle["user-name"]}>
                          {review.username
                            ? review.username
                            : review.usernameAcount}
                        </h6>
                        <p className={CommentStyle["user-comment-time"]}>
                          {review.minute}{" "}
                          {format(new Date(review.createdAt), "dd-MM-yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className={CommentStyle["user-rating"]}>
                      <span className={CommentStyle["point"]}>
                        {Math.floor(
                          (review.accuracy_point +
                            review.communication_point +
                            review.location_point +
                            review.value_point) /
                            4
                        )}
                      </span>{" "}
                      <span className={CommentStyle["icon"]}>
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                    </div>
                  </div>
                  <div className={CommentStyle["item-content"]}>
                    <p>{review.content}</p>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <button onClick={checkUser} className={CommentStyle["btn-add-cmt"]}>
        Add a comment
      </button>
    </div>
  );
}

export default Comments;
