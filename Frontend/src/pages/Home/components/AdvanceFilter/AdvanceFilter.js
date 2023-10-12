// fake data
import amenities from "./amenities";

// Context
import { AdvanceFilterContext } from "@/utils/contexts";

// Components
import PriceRangePicker from "../PriceRangePicker";
import RoomAndBedRoomPicker from "../RoomAndBedRoomPicker";
import HouseAndRoomType from "../HouseAndRoomType";
import AmenitiesPicker from "../AmenitiesPicker";
import { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { pickers, houseAndRoomTypes, roomAndBedRoomInitialState } from "../../advanceFilterInitState";

// styles
import advanceFilterStyles from "./AdvanceFilter.module.scss";

import { usePopup } from "@/utils/hooks";

function AdvanceFilter({
    isAdvanceFilterOpen,
    setAdvanceFilterOpen,
    getAdvanceFilterHotel
}) {
    const [isOpen, handleClick, containerRef] = usePopup(isAdvanceFilterOpen);
    const {
        roomAndBedRoom,
        setRoomAndBedRoom,
        houseType,
        setHouseType,
        price,
        setPrice,
        amenitiesPicked,
        setAmenitiesPicked,
    } = useContext(AdvanceFilterContext);

    useEffect(() => {
        setAdvanceFilterOpen(isOpen);
        //eslint-disable-next-line
    }, [isOpen]);

    const removeAllSelected = (event) => {
        event.stopPropagation();
        setRoomAndBedRoom(roomAndBedRoomInitialState);
        setHouseType(null);
        setAmenitiesPicked([]);
        setPrice({});
    };

    return (
        <div
            id={advanceFilterStyles["advance-filter"]}
            ref={containerRef}
            tabIndex={-1}
        >
            <div className={advanceFilterStyles["heading"]} tabIndex={-1}>
                <h4 className={advanceFilterStyles["filter-heading"]}>
                    Bộ lọc
                </h4>
            </div>
            <Box
                sx={{
                    marginTop: "54.11px",
                    overflowY: "scroll",
                    padding: "0 2em",
                    height: "76vh",
                }}
            >
                <PriceRangePicker price={price} setPrice={setPrice} />
                <RoomAndBedRoomPicker
                    pickers={pickers}
                    roomAndBedRoom={roomAndBedRoom}
                    onSelect={setRoomAndBedRoom}
                />
                <HouseAndRoomType
                    houseAndRoomTypes={houseAndRoomTypes}
                    currentType={houseType}
                    handlePicked={setHouseType}
                />
                <AmenitiesPicker
                    amenitiesList={amenities}
                    amenitiesPicked={amenitiesPicked}
                    setAmenitiesPicked={setAmenitiesPicked}
                />
            </Box>
            <div className={advanceFilterStyles["footer"]}>
                <Box>
                    <button
                        className={advanceFilterStyles["reset-button"]}
                        onClick={removeAllSelected}
                    >
                        Xóa tất cả
                    </button>
                </Box>
                <Box
                    sx={{
                        justifyContent: "flex-end",
                    }}
                >
                    <button
                        className={advanceFilterStyles["find-button"]}
                        onClick={() => getAdvanceFilterHotel()}
                    >
                        Hiển thị kết quả
                    </button>
                </Box>
            </div>
            <button
                className={advanceFilterStyles["close-button"]}
                onClick={(e) => {
                    removeAllSelected(e);
                    handleClick(e);
                }}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
}

export default AdvanceFilter;
