import ImageStyle from "@/pages/Register/components/ImageInputField/ImageInputField.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ImageCard from "@/pages/Register/components/ImageCard";

function ImageInputField({
    id,
    title,
    images,
    setImages,
    handleDeleted,
    updatedImages,
    hanldeUpdated,
}) {
    const [previewImages, setPreviewImages] = useState([]);
    const [previewUpdatedImages, setPreviewUpdatedImages] = useState([]);

    const handleChange = (e) => {
        const { files } = e.target;
        const updatedImagesArray = Array.from(updatedImages || []);

        if (updatedImagesArray.length === 0) {
            hanldeUpdated(files);
        } else {
            // merge two fileList
            const mergedFileArray = [...updatedImagesArray];
            Array.from(files).forEach((newFile) => {
                let isExised = false;
                updatedImagesArray.forEach((currentFile) => {
                    if (currentFile.name === newFile.name) {
                        isExised = true;
                    }
                });
                if (!isExised) {
                    mergedFileArray.push(newFile);
                }
            });

            hanldeUpdated(mergedFileArray);
        }
    };

    const handleRemove = ({ url, index, id, type }) => {
        if (type === "old") {
            const imagesArray = Array.from(images || []);
            imagesArray.splice(index, 1);
            handleDeleted((prev) => [...prev, id]);
            setImages(imagesArray);
        } else if (type === "updated") {
            URL.revokeObjectURL(url);
            const updatedImagesArray = Array.from(updatedImages || []);
            updatedImagesArray.splice(index, 1);
            hanldeUpdated(updatedImagesArray);
        }
    };

    useEffect(() => {
        if (!images) {
            setPreviewImages([]);
            return;
        }

        const objectUrls = Array.from(images).map((image, index) => ({
            url: image.src,
            index: index,
            id: image.id,
            type: "old",
        }));
        setPreviewImages(objectUrls);
    }, [images]);

    useEffect(() => {
        if (!updatedImages) {
            setPreviewImages([]);
            return;
        }

        const objectUrls = Array.from(updatedImages).map((file, index) => ({
            url: URL.createObjectURL(file),
            index: index,
            id: null,
            type: "updated",
        }));
        setPreviewUpdatedImages(objectUrls);

        return () => {
            objectUrls.forEach(({ objectUrl }) =>
                URL.revokeObjectURL(objectUrl)
            );
        };
    }, [updatedImages]);

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
                        <input
                            type="file"
                            id={id}
                            multiple
                            onChange={handleChange}
                        />
                        <label className={ImageStyle["image-show"]} for={id}>
                            <FontAwesomeIcon icon={faUpload} />
                        </label>
                    </Grid>
                    {[...previewImages, ...previewUpdatedImages]?.map(
                        (previewImage, index) => (
                            <Grid key={index} item xs="auto">
                                <ImageCard
                                    objectUrl={previewImage}
                                    handleRemove={handleRemove}
                                    type={previewImage.type}
                                />
                            </Grid>
                        )
                    )}
                </Grid>
            </div>
        </div>
    );
}

export default ImageInputField;
