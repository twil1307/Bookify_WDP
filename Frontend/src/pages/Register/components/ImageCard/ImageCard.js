import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import ImageCardStyle from "./ImageCard.module.scss";

const ImageCard = ({ objectUrl, handleRemove, type }) => {
    return (
        <Box
            sx={{
                width: "10em",
                height: "10em",
            }}
            className={ImageCardStyle["card"]}
        >
            <img
                src={objectUrl.url}
                alt=""
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
            <button
                className={ImageCardStyle["remove-button"]}
                onClick={() => {
                    handleRemove(objectUrl);
                }}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </Box>
    );
};

export default ImageCard;
