import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ImageCard from "../ImageCard";
import ImageStyle from "./ImageInputField.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function ImageInputField({ id, images, setImages, title }) {
  const [previewViewImages, setPreviewViewImages] = useState();

  const handleChange = (e) => {
    const { files } = e.target;
    const viewImagesArray = Array.from(images || []);

    if (viewImagesArray.length === 0) {
      setImages(files);
    } else {
      // merge two fileList
      const mergedFileArray = [...viewImagesArray];
      Array.from(files).forEach((newFile) => {
        let isExised = false;
        viewImagesArray.forEach((currentFile) => {
          if (currentFile.name === newFile.name) {
            isExised = true;
          }
        });
        if (!isExised) {
          mergedFileArray.push(newFile);
        }
      });

      setImages(mergedFileArray);
    }
  };

  const handleRemove = ({ url, index }) => {
    URL.revokeObjectURL(url);
    const viewImagesArray = Array.from(images || []);
    viewImagesArray.splice(index, 1);
    setImages(viewImagesArray);
  };

  useEffect(() => {
    if (!images) {
      setPreviewViewImages(null);
      return;
    }

    const objectUrls = Array.from(images).map((file, index) => ({
      url: URL.createObjectURL(file),
      index: index,
    }));
    setPreviewViewImages(objectUrls);

    return () => {
      objectUrls.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [images]);

  return (
    <div className={ImageStyle["image-add"]}>
      <p>{title}</p>
      <div className={ImageStyle["image-container"]}>
        <Grid
          container
          spacing={2}
          columns={{ xs: 2, sm: 8, md: 12 }}
          className={ImageStyle["image-grid"]}
        >
          <Grid item xs="auto" className={ImageStyle["image-input"]}>
            <input type="file" id={id} multiple onChange={handleChange} />
            <label className={ImageStyle["image-show"]} for={id}>
              <FontAwesomeIcon icon={faUpload} />
            </label>
          </Grid>
          {previewViewImages?.map((objectUrl, index) => (
            <Grid item xs="auto">
              <ImageCard
                objectUrl={objectUrl}
                key={index}
                handleRemove={handleRemove}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default ImageInputField;

/**
 *  Anh chia thanh 2 loai:
 *    - Anh tu server
 *    - Anh update them
 *  Neu remove di: 
 *    - Voi anh tu server:
 *    - Voi anh tu update:
 *  Neu them vo:
 *    - Voi anh tu update
 *  => Phai gom duoc 1 array named deletedImages
 */
