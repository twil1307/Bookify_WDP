import { RegisterContext } from "@/utils/contexts";
import ImageStyle from "./ImageSection.module.scss";
import { useContext, useEffect, useState } from "react";
import ImageInputField from "../ImageInputField";
import UpdateImageInputField from "@/pages/Update/components/UpdateImageInputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useHref } from "react-router-dom";

function ImageSection() {
  const {
    viewImages,
    setViewImages,
    roomImages,
    setRoomImages,
    backgroundImage,
    setBackgroundImage,
    updatedViewImages,
    setUpdatedViewImages,
    updatedRoomImages,
    setUpdatedRoomImages,
    setDeletedImages,
  } = useContext(RegisterContext);
  const [previewBackgroundImage, setPreviewBackgroundImage] = useState();
  const href = useHref();

  const handleChange = (e) => {
    const { files } = e.target;
    setBackgroundImage(files[0]);
  };

  useEffect(() => {
    if (!backgroundImage) {
      setPreviewBackgroundImage(null);
      return;
    }
    if (typeof backgroundImage === "string") {
      setPreviewBackgroundImage(`${backgroundImage}`);
    } else {
      const url = URL.createObjectURL(backgroundImage);
      setPreviewBackgroundImage(url);
    }

    //eslint-disable-next-line
  }, [backgroundImage]);

  const renderFunction = () => {
    if (href.includes("/update")) {
      return (
        <>
          <UpdateImageInputField
            id={"around"}
            images={viewImages}
            setImages={setViewImages}
            handleDeleted={setDeletedImages}
            updatedImages={updatedViewImages}
            hanldeUpdated={setUpdatedViewImages}
            title={"Cung cấp ảnh về không gian xung quanh khách sạn"}
          />
          <UpdateImageInputField
            id={"room"}
            images={roomImages}
            setImages={setRoomImages}
            handleDeleted={setDeletedImages}
            updatedImages={updatedRoomImages}
            hanldeUpdated={setUpdatedRoomImages}
            title={"Cung cấp ảnh về phòng ngủ của khách sạn"}
          />
        </>
      );
    } else {
      return (
        <>
          <ImageInputField
            id={"around"}
            images={viewImages}
            setImages={setViewImages}
            onDeleted={setDeletedImages}
            title={"Cung cấp ảnh về không gian xung quanh khách sạn"}
          />
          <ImageInputField
            id={"room"}
            images={roomImages}
            setImages={setRoomImages}
            onDeleted={setDeletedImages}
            title={"Cung cấp ảnh về phòng ngủ của khách sạn"}
          />
        </>
      );
    }
  };

  return (
    <>
      <div className={ImageStyle["header"]}>
        <h3>Cập nhật ảnh về khách sạn của bạn</h3>
      </div>
      <div className={ImageStyle["body-container"]}>
        <div className={ImageStyle["body"]}>
          <div className={ImageStyle["image-background"]}>
            <p className={ImageStyle["background-image-heading"]}>
              Chọn ảnh bìa cho khách sạn của bạn
            </p>
            <div className={ImageStyle["image-container"]}>
              <input type="file" id="upfile" onChange={handleChange} />
            </div>
            <label className={ImageStyle["image-show"]} htmlFor="upfile">
              <div className={ImageStyle["image-placeholder"]}>
                <FontAwesomeIcon icon={faUpload} />
                <p>Tải ảnh lên</p>
              </div>
              {previewBackgroundImage && (
                <div className={ImageStyle["preview"]}>
                  <img
                    className={ImageStyle["preview-background-image"]}
                    src={previewBackgroundImage}
                    alt=""
                  />
                </div>
              )}
            </label>
          </div>
          {renderFunction()}
        </div>
      </div>
    </>
  );
}

export default ImageSection;
