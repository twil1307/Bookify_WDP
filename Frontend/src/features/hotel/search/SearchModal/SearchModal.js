import searchModalStyles from "./SearchModal.module.scss";
import AdvanceSearch from "../AdvanceSearch";
import SearchResult from "../SearchResult";
import SearchTrending from "../SearchTrending";
import { useState } from "react";

function SearchModal({ searchTerms }) {
    const [isAdvanceSearchActive, setAdvanceSearchActive] = useState(false);

    return (
        <div tabIndex={-1} className={searchModalStyles["search-modal"]}>
            <div className={searchModalStyles["search-section"]}>
                {isAdvanceSearchActive || !!searchTerms || (
                    <>
                        <SearchTrending style={searchModalStyles} />
                        <div className={searchModalStyles["as-mode__active"]}>
                            <div
                                className={
                                    searchModalStyles["as-mode__active-button"]
                                }
                                onClick={(event) => {
                                    setAdvanceSearchActive(true);
                                }}
                                style={{ textAlign: "center" }}
                            >
                                Tìm kiếm nâng cao
                            </div>
                        </div>
                    </>
                )}
            </div>
            {isAdvanceSearchActive && (
                <AdvanceSearch
                    handleChangeMode={setAdvanceSearchActive}
                />
            )}
        </div>
    );
}

export default SearchModal;
