import exploreHeader from "./ExploreSearchHeader.module.scss";
import { memo, useContext } from "react";
import { SearchContext } from "@/utils/contexts";

function ExploreSearchHeader({ currentTab, onTabChange }) {
    const { place, setPlace } = useContext(SearchContext);
    const index = 0;

    return (
        <label
            id={exploreHeader["explore-search"]}
            className={[
                exploreHeader["advance-search__input-field"],
                currentTab === index ? exploreHeader['active'] : ''             
            ].join(' ')}
            index="0"
            onFocus={onTabChange}
        >
            <h4 className={exploreHeader["heading"]}>Địa điểm</h4>
            <input
                className={exploreHeader["place-input"]}
                placeholder={"Bạn muốn đi đâu?"}
                value={place}
                onChange={(event) => {
                    setPlace(event.target.value);
                }}
                spellCheck={false}
            />
        </label>
    );
}

export default memo(ExploreSearchHeader);
