import exploreSearchStyles from "./ExploreSearchField.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";
import { getExplorePlaces } from "@/services";
import { SearchContext } from "@/utils/contexts";
import { useDebounce } from "@/utils/hooks";

function ExploreSearchField({ handler: fetchData }) {
    const [foundPlaces, setFoundPlaces] = useState([]);
    const { place, setPlace } = useContext(SearchContext);
    const limitResults = 5;
    const debounceExploreSearch = useDebounce(() => {
        getExplorePlaces(place).then((data) => {
            setFoundPlaces(data.slice(0, limitResults));
        });
    }, 2000);

    useEffect(() => {
        debounceExploreSearch();
        //eslint-disable-next-line
    }, [place]);

    return (
        <div className={exploreSearchStyles["explore-search-places"]}>
            <h4 className={exploreSearchStyles["explore-search-header"]}>
                Tìm kiếm theo địa điểm
            </h4>
            <div className={exploreSearchStyles["explore-search-list"]}>
                {foundPlaces?.map(({ code, name }) => (
                    <div
                        key={code}
                        className={exploreSearchStyles["explore-search-result"]}
                        onClick={() => setPlace(name)}
                    >
                        <div className={exploreSearchStyles["explore-icon"]}>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </div>
                        <p
                            className={
                                exploreSearchStyles["explore-search-title"]
                            }
                        >{`${name}, Viet Nam`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExploreSearchField;
