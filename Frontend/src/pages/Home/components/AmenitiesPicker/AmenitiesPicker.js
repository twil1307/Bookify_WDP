import styles from "./AmenitiesPicker.module.scss";
import { useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const types = [
  {
    amenityType: "646da50ffb5bbb622131c3c5",
    title: "Trong nhà",
  },
  {
    amenityType: "646da568801beac8854b56f9",
    title: "Ngoài trời",
  },
];

function AmenityItem({ id, amenityTitle, isChecked, handleChecked }) {
  const checkBoxId = useId();

  const handleClick = (event) => {
    event.stopPropagation();
    if (isChecked) {
      handleChecked((prev) => prev.filter((amenityId) => amenityId !== id));
    } else {
      handleChecked((prev) => [...prev, id]);
    }
  };

  return (
    <div className={styles["amenity"]} onClick={handleClick}>
      <input
        id={checkBoxId}
        type="checkbox"
        hidden
        checked={isChecked}
        value={isChecked}
        onChange={() => {}}
      />
      <div className={styles["amenity-checkbox"]}>
        {isChecked && <FontAwesomeIcon icon={faCheck} />}
      </div>
      <label htmlFor={checkBoxId} className={styles["amenity-label"]}>
        {amenityTitle}
      </label>
    </div>
  );
}

function AmenitiesTypePicker({
  amenitiesList,
  amenitiesPicked,
  setAmenitiesPicked,
  title,
  amenityType,
}) {
  return (
    <div className={styles["amenity-type"]}>
      <h5 className={styles["type-heading"]}>{title}</h5>
      <div className={styles["amenity-list"]}>
        {amenitiesList.reduce((list, { id, amenityTitle, type }) => {
          if (amenityType === type) {
            return [
              ...list,
              <AmenityItem
                key={id}
                id={id}
                amenityTitle={amenityTitle}
                isChecked={amenitiesPicked.includes(id)}
                handleChecked={setAmenitiesPicked}
              />,
            ];
          } else {
            return list;
          }
        }, [])}
      </div>
    </div>
  );
}

function AmenitiesPicker({
  amenitiesList,
  amenitiesPicked,
  setAmenitiesPicked,
}) {
  return (
    <div id={styles["amenities-picker"]}>
      <h4 className={styles["amenities-picker-heading"]}>Tiện nghi</h4>
      <div className={styles["amenities-type-list"]}>
        {types.map(({ amenityType, title }) => (
          <AmenitiesTypePicker
            key={amenityType}
            amenitiesList={amenitiesList}
            amenitiesPicked={amenitiesPicked}
            setAmenitiesPicked={setAmenitiesPicked}
            amenityType={amenityType}
            title={title}
          />
        ))}
      </div>
    </div>
  );
}

export default AmenitiesPicker;
