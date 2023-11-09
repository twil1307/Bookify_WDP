import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import RatingStyle from "./Rating.module.scss";
import Point from "./Point";
import Comments from "./Comments";
import { getPoints } from "./RatingService";

function Rating({ reviews, rating, hotelId }) {
  const pointsData = getPoints(reviews);
  return (
    <div>
      <h4 className={RatingStyle["title"]}>
        {rating.valuePoint} <FontAwesomeIcon icon={faStar} /> -{" "}
        {reviews?.length} đánh giá
      </h4>
      <div className={RatingStyle["Rating"]}>
        <Point pointsData={rating} />
      </div>
      <div className={RatingStyle["comment-container"]}>
        <Comments reviews={reviews} hotelId={hotelId} />
      </div>
    </div>
  );
}

export default Rating;
