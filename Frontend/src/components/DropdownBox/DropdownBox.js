import dropDownStyles from "./DropdownBox.module.scss";
import { Box } from "@mui/material";
import { useClsx } from "@/utils/hooks";
import { useContext } from "react";
import { UserContext } from "@/utils/contexts";

function DropdownBox({
  children,
  heading,
  extraButtonTittle,
  isScrollable,
  tabs,
  activeIndex,
  setActiveIndex = () => {},
  extraButtonHandleClick = () => {},
}) {
  const { user } = useContext(UserContext);
  const handleTabChange = (event, index) => {
    event.stopPropagation();
    setActiveIndex(index);
  };

  return (
    <div className={useClsx(dropDownStyles["drop-down-box"])} tabIndex="-1">
      <div className={dropDownStyles["drop-down-header"]}>
        <h4 className={dropDownStyles["heading"]}>{heading}</h4>
        <button className={dropDownStyles["extra-button"]}>
          <p
            className={dropDownStyles["extra-button-title"]}
            onClick={(event) => {
              event.stopPropagation();
              extraButtonHandleClick(user._id);
            }}
          >
            {extraButtonTittle}
          </p>
        </button>
      </div>
      <div
        className={useClsx(
          dropDownStyles["drop-down-content"],
          isScrollable ? dropDownStyles["scroll"] : ""
        )}
        tabIndex="-1"
      >
        <div className={dropDownStyles["drop-down-tabs"]}>
          {tabs?.reduce((prev, { title, index, role, list }) => {
            if (role.includes(user?.role)) {
              return [
                ...prev,
                <button
                  key={index}
                  className={[
                    dropDownStyles["tab-button"],
                    activeIndex === index ? dropDownStyles["active"] : "",
                  ].join(" ")}
                  onClick={(event) => {
                    handleTabChange(event, index);
                  }}
                >
                  {title}
                  <span className={dropDownStyles["number-of-notif"]}>
                    {list.length}
                  </span>
                </button>,
              ];
            } else {
              return prev;
            }
          }, [])}
        </div>
        {children}
      </div>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          height: "1em",
          backgroundColor: "white",
        }}
      />
    </div>
  );
}

export default DropdownBox;
