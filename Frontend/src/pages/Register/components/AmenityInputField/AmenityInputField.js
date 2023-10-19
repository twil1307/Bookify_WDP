import { useState } from "react";
import amenityStyle from "./AmenityType.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";
import { useClsx } from "@/utils/hooks";

const amenityInitState = {
  amenityName: "",
  icon: "faPencil",
};

function AmenityInputField({
  hotelId,
  handleClick,
  addNewAmenity,
  amenityTypes,
}) {
  const [amenity, setAmenity] = useState({
    ...amenityInitState,
    hotelId: hotelId,
    amenityTypeId: amenityTypes[0]?._id || "",
  });
  // console.log(amenityTypes, amenity);
  const [isTypeListOpen, setTypeListOpen] = useState(false);

  const handleAmenityAdded = (e) => {
    if (amenity.amenityName.length === 0) {
      return;
    } else {
      const newAmenity = {
        ...amenity,
      };
      handleClick((prev) => [...prev, newAmenity]);
      addNewAmenity((prev) => [...prev, newAmenity]);
      setAmenity({
        ...amenityInitState,
        hotelId: hotelId,
        amenityTypeId: amenityTypes[0]?._id,
      });
    }
  };
  return (
    <div className={amenityStyle["add-amenity"]}>
      <div className={amenityStyle["amenity-input"]}>
        <div className={amenityStyle["amenity-type-select"]}>
          <p>
            {
              amenityTypes.find(({ _id }) => _id === amenity?.amenityTypeId)
                .amenityTypeName
            }
          </p>
          <button onClick={() => setTypeListOpen((prev) => !prev)}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div
            className={useClsx(
              amenityStyle["amenity-type-list"],
              isTypeListOpen ? amenityStyle["d-block"] : ""
            )}
          >
            {amenityTypes.map(({ _id, amenityTypeName }, index) => (
              <div
                key={index}
                onClick={() => {
                  setAmenity((prev) => ({
                    ...prev,
                    amenityTypeId: _id,
                  }));
                  setTypeListOpen((prev) => !prev);
                }}
                className={amenityStyle["type-item"]}
              >
                {amenityTypeName}
              </div>
            ))}
          </div>
        </div>
        <input
          value={amenity.amenityName}
          onChange={(e) => {
            setAmenity((prev) => ({
              ...prev,
              amenityName: e.target.value,
            }));
          }}
        />
        <button>
          <FontAwesomeIcon icon={faPlus} onClick={handleAmenityAdded} />
        </button>
      </div>
    </div>
  );
}

export default AmenityInputField;
