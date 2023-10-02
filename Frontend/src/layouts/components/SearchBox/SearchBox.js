import SearchInputField from "../SearchInputField";
import { useState, memo, useMemo } from "react";
import { usePopup } from "@/utils/hooks";
import searchBoxStyles from "./SearchBox.module.scss";
import { Box } from "@mui/material";
import { AdvanceSearchContext } from "@/utils/contexts";

function SearchBox() {
    const [searchTerms, setSearchTerms] = useState("");
    const [isOpen, handleClick, containerRef] = usePopup();
    const [isAdvanceSearchOpen, setAdvanceSearchOpen] = useState(false);

    const handleOpenSearchBar = (event) => {
        handleClick(event);
    };

    const advanceSearchValue = useMemo(() => ({
        isAdvanceSearchOpen,
        setAdvanceSearchOpen,
        handleOpenSearchBar,
    //eslint-disable-next-line
    }), [isAdvanceSearchOpen])
    
    return (
        <AdvanceSearchContext.Provider value={advanceSearchValue}>
            <div className={searchBoxStyles["search-box"]} ref={containerRef}>
                <div className={searchBoxStyles["search-bar"]}>
                    <SearchInputField
                        style={searchBoxStyles["search-input-field"]}
                        value={searchTerms}
                        onValueChange={setSearchTerms}
                        placeholder="Tìm kiếm"
                        width="f-width"
                        id="search-input-field"
                        isOpen={isOpen}
                        handleOpenSearchBar={handleOpenSearchBar}
                    />
                </div>
                { (isOpen || isAdvanceSearchOpen) && (
               <></>
                )}
            </div>
            {isOpen && (
                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: "72.83px",
                        right: 0,
                        height: "100vh",
                        backgroundColor: "#000",
                        zIndex: "1",
                        opacity: "0.5",
                    }}
                />
            )}
        </AdvanceSearchContext.Provider>
    );
}

export default memo(SearchBox);
