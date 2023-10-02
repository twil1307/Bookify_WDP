import styles from "./HouseAndRoomType.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mui/material";

function HouseAndRoomType({ houseAndRoomTypes, currentType, handlePicked }) {
    return (
        <div id={styles["house-room-type"]}>
            <h4 className={styles["house-room-heading"]}>Loại Nhà\Phòng</h4>
            <Grid container spacing={1} className={styles["house-room-picker"]}>
                {houseAndRoomTypes.map(({ id, type, icon }) => (
                    <Grid item key={id} xs={4}>
                        <div
                            className={[
                                styles["type-item"],
                                currentType === id ? styles["active"] : "",
                            ].join(" ")}
                            onClick={(event) => {
                                event.stopPropagation();
                                if (
                                    currentType !== null &&
                                    currentType === id
                                ) {
                                    handlePicked(null);
                                } else {
                                    handlePicked(id);
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={icon} />
                            <p className={styles["type-title"]}>{type}</p>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default HouseAndRoomType;
