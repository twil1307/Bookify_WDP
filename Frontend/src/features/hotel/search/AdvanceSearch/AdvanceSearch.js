// Component Import
import GuestsSearchField from "../GuestsSearchField";
import DateSearchField from "../DateSearchField";
import ExploreSearchHeader from "../ExploreSearchHeader";
import DateSearchHeader from "../DateSearchHeader";
import GuestsSearchHeader from "../GuestsSearchHeader";

// Util Import
import { useState, lazy, Suspense, useContext } from "react";
import { useClsx } from "@/utils/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AdvanceSearchContext, SearchContext } from "@/utils/contexts";

// styles import
import advanceSearchStyles from "./AdvanceSearch.module.scss";
import { Box } from "@mui/material";

const ExploreSearchField = lazy(() => import("../ExploreSearchField"));
const SearchField = ({ index, handler = null }) => {
  const tabs = [ExploreSearchField, DateSearchField, GuestsSearchField];
  const Component = tabs[index];
  return (
    <>
      <Component handler={handler} />
    </>
  );
};

const guestsInitial = {
  adult: 0,
  child: 0,
  infant: 0,
  pet: 0,
};

function AdvanceSearch({ handleChangeMode }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [isSearched, setSearched] = useState(false);
  const { setAdvanceSearchOpen, handleOpenSearchBar } =
    useContext(AdvanceSearchContext);
  const { setSearchAdvanceMode, resetSearchAdvance } =
    useContext(SearchContext);

  const handleTabChange = (event) => {
    event.stopPropagation();
    const tabIndex = event.currentTarget.getAttribute("index");
    setCurrentTab(parseInt(tabIndex));

    if (isSearched) {
      setSearched((prev) => !prev);
      handleOpenSearchBar(event);
      setAdvanceSearchOpen((prev) => !prev);
    }
  };

  const changeSearchMode = (event) => {
    setSearchAdvanceMode(false);
    handleChangeMode(false);
    resetSearchAdvance();
  };

  const handleAdvanceSearch = (e) => {
    e.stopPropagation();
    setSearched(!isSearched);
    setAdvanceSearchOpen((prev) => !prev);

    if (!isSearched) {
      setCurrentTab("3");
      handleOpenSearchBar(e);
    } else {
      handleOpenSearchBar(e);
      setCurrentTab(0);
    }
  };

  return (
    <div
      id={advanceSearchStyles["advance-search"]}
      className={useClsx(isSearched ? advanceSearchStyles["to-header"] : "")}
      tabIndex={-1}
    >
      <div
        className={useClsx(
          advanceSearchStyles["advance-search-header"],
          isSearched ? advanceSearchStyles["d-none"] : ""
        )}
      >
        <div
          className={advanceSearchStyles["search-field-nav"]}
          onClick={changeSearchMode}
          tabIndex={-1}
        >
          Tìm kiếm khách sạn
        </div>
        <div
          className={[
            advanceSearchStyles["search-field-nav"],
            advanceSearchStyles["active"],
          ].join(" ")}
        >
          Tìm kiếm nâng cao
        </div>
      </div>
      <div
        className={useClsx(
          advanceSearchStyles["left"],
          isSearched ? advanceSearchStyles["d-none"] : ""
        )}
      ></div>
      <div
        className={useClsx(
          advanceSearchStyles["advance-search-header-field"],
          isSearched ? advanceSearchStyles["searched"] : ""
        )}
      >
        <Box
          sx={{
            display: "flex",
            borderRadius: "1.6em",
            backgroundColor: "#ebebeb",
            position: "relative",
          }}
        >
          <ExploreSearchHeader
            onTabChange={handleTabChange}
            currentTab={currentTab}
          />
          <DateSearchHeader
            onTabChange={handleTabChange}
            currentTab={currentTab}
          />
          <GuestsSearchHeader
            onTabChange={handleTabChange}
            currentTab={currentTab}
          />
          <div
            className={advanceSearchStyles["advance-search-button"]}
            tabIndex="-1"
            onClick={handleAdvanceSearch}
          >
            <button
              className={advanceSearchStyles["search-button"]}
              onClick={() =>
                setSearchAdvanceMode((prev) => (isSearched ? false : true))
              }
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  marginRight: "0.2em",
                }}
              />
              <span
                className={useClsx(
                  isSearched ? advanceSearchStyles["d-none"] : ""
                )}
              >
                Tìm kiếm
              </span>
            </button>
          </div>
        </Box>
      </div>
      <Suspense>{isSearched || <SearchField index={currentTab} />}</Suspense>
    </div>
  );
}

export default AdvanceSearch;
