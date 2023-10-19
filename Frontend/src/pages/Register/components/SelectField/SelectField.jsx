import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { memo, useState, useRef, useEffect, useCallback } from "react";
import { basicHotelInforValidation } from "@/utils/validation";
import { types } from "@/utils/validation/basicHotelInforValidation";
import searchProvinces from "@/services/hotel/searchProvinces";
import { getHotelRegisterErrorMessage } from "@/utils/validation";
import { useClsx, useDebounce } from "@/utils/hooks";
import "./SelectField.scss";
import { getHotelType } from "@/services/hotel";

const getDebouncedFunction = (type) => {
  switch (type) {
    case types.PROVINCE:
      return searchProvinces;
    case types.DISTRICT:
      return () => {};
    case types.HOTEL_TYPE:
      return getHotelType;
    default:
      return () => {};
  }
};

function SelectField({ id, label, value, setValue, setInformationValid }) {
  const [isFocus, setFocused] = useState(false);
  const inputRef = useRef();
  // console.log(id);
  const [selectionList, setSelectionList] = useState([]);
  const [isSelectionListOpen, setSelectionListOpen] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchFunction = useCallback(
    useDebounce((searchTerm) => {
      // console.log(getDebouncedFunction(id));

      const debouncedFunction = getDebouncedFunction(id);
      if (id == "hotelType") {
        debouncedFunction(searchTerm).then((data) => {
          // console.log(data?.types);
          setSelectionList(data?.types);
        });
      } else {
        debouncedFunction(searchTerm)?.then((data) => {
          // console.log(data);
          setSelectionList(data);
        });
      }
    }, 300),
    []
  );
  // const isValid = true;
  const isValid = basicHotelInforValidation(id, value, selectionList);
  // console.log(selectionList);
  const handleFocus = (e) => {
    e.stopPropagation();
    setFocused(true);
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    // if element hasn't received focus
    if (!isFocus) {
      inputElement.addEventListener("focus", handleFocus);
    }

    return () => {
      inputElement.removeEventListener("focus", handleFocus);
    };
  }, [inputRef, isFocus]);

  useEffect(() => {
    debouncedSearchFunction(value);
    // console.log(value);
    setInformationValid((prev) => ({
      ...prev,
      [id]: isValid,
    }));
    //eslint-disable-next-line
  }, [value]);

  return (
    <div className={useClsx("input-field select-field")}>
      {id === "hotelType" ? (
        <input
          id={id}
          type="text"
          value={value.hotelType ?? ""}
          onChange={(e) => {
            setValue(e.target.value, id);
          }}
          ref={inputRef}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value ?? ""}
          onChange={(e) => {
            setValue(e.target.value, id);
          }}
          ref={inputRef}
        />
      )}
      <label htmlFor={id} className={useClsx("input-label")}>
        {!isValid && isFocus ? getHotelRegisterErrorMessage(id) : label}
      </label>
      <button
        className="drop-down-button"
        onClick={() => {
          setSelectionListOpen((prev) => !prev);
        }}
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <div
        className={useClsx(
          "selection-list",
          isSelectionListOpen ? "d-block" : ""
        )}
      >
        {selectionList?.map((value, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectionListOpen(false);
              value.name ? setValue(value.name, id) : setValue(value, id);
            }}
            className={"selection-item"}
          >
            {value.name ? value.name : value.hotelType}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(SelectField);
