import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { RatingContext } from "../../Rating";
import { useContext } from "react";
import RatingCartStyle from "./RatingCard.module.scss";
import { format } from "date-fns";

function Filter({ data, rating }) {
  const [filter, setFilter] = useContext(RatingContext);
  console.log(rating);

  return (
    <div className={RatingCartStyle["card-wrapper"]}>
      {rating?.map((item, index) => {
        return (
          <div className={RatingCartStyle["card"]} key={index}>
            <div className={RatingCartStyle["card-avatar"]}>
              <div className={RatingCartStyle["avatar-wrapper"]}>
                <img
                  src={
                    item.user.avatar
                      ? `http://localhost:${process.env.REACT_APP_BACK_END_PORT}${item.user.avatar}`
                      : "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1"
                  }
                  alt="avatar"
                  height={30}
                  width={30}
                />
              </div>
            </div>
            <div className={RatingCartStyle["card-body"]}>
              <div className={RatingCartStyle["card-title"]}>
                <h4>{item.user.subName ? item.user.subName : item.name}</h4> -
                <span>
                  {Math.floor(
                    (item.accuracyPoint +
                      item.communicationPoint +
                      item.locationPoint +
                      item.valuePoint) /
                      4
                  )}
                  {"  "}
                  <FontAwesomeIcon icon={faStar} />
                </span>
              </div>
              <div className={RatingCartStyle["card-content"]}>
                <p>{item.content}</p>
              </div>
              <div className={RatingCartStyle["card-time"]}>
                <p>{format(new Date(item.createdAt), "dd/MM/yyyy")}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Filter;
