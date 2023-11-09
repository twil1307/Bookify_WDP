import searchInputStyles from "./SearchInputField.module.scss";
import { memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

function SearchInputField({
    id = "",
    type = "text",
    placeholder = "",
    value = "",
    onValueChange,
    width = "",
    style,
    handleOpenSearchBar,
    isOpen = false,
}) {
    return (
        <>
            <input
                id={id}
                className={[
                    searchInputStyles["search-input-bar"],
                    searchInputStyles[width] ?? "",
                    style ?? "",
                    isOpen ? searchInputStyles["focused"] : "",
                ].join(" ")}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onValueChange(e.target.value)}
                onFocus={(event) => {
                    if (!isOpen) {
                        handleOpenSearchBar(event);
                    }
                }}
            />
            {isOpen || (
                <label
                    htmlFor="search-input-field"
                    className={searchInputStyles["search-glass-icon"]}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </label>
            )}
            {isOpen && (
                <button 
                    className={searchInputStyles["search-close-icon"]} 
                    onClick={(event) => handleOpenSearchBar(event)}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            )}
        </>
    );
}

export default memo(SearchInputField);
