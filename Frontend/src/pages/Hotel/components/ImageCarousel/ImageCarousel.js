import { Carousel } from "react-bootstrap";
import { Box } from "@mui/material";
import imageCarouselStyles from "./ImageCarousel.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const getCaption = (type) => {
  console.log(type);
  switch (type) {
    case 0:
      return "Ảnh không gian xung quanh";
    case 1:
      return "Ảnh không gian phòng ngủ";
    case 2:
      return "Ảnh bìa";
    default:
      throw new Error("Invalid Type");
  }
};

function ImageCarousel({ defaultActiveIndex, images, setActiveImageIndex }) {
  const [index, setIndex] = useState(defaultActiveIndex);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className={imageCarouselStyles["active-index-display"]}>
        <span>{index + 1}</span> / <span>{images.length}</span>
      </div>
      <button
        className={imageCarouselStyles["close-carousel-button"]}
        onClick={() => setActiveImageIndex(null)}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className={imageCarouselStyles["carousel"]}>
        <Carousel
          defaultActiveIndex={defaultActiveIndex}
          slide={true}
          controls
          onSelect={handleSelect}
        >
          {images.map(({ _id, imagePath, imageType }) => (
            <Carousel.Item
              key={_id}
              className={imageCarouselStyles["carousel-item"]}
            >
              <img src={`http://localhost:${process.env.REACT_APP_BACK_END_PORT}${imagePath}`} alt="" />
              <Carousel.Caption>
                <h3>{getCaption(imageType)}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Box>
  );
}

export default ImageCarousel;
