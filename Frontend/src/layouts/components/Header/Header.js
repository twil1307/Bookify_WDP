import IconButton from "../IconButton";
import SearchBox from "../SearchBox";
import ProfileHeaderNav from "../ProfileHeaderNav";
import { UserContext } from "@/utils/contexts";
import { BookmarkBox, Logo, NotifyBox } from "@/components";
import { faBookmark, faBell } from "@fortawesome/free-regular-svg-icons";
import { Grid, Box } from "@mui/material";
import headerStyles from "./Header.module.scss";
import { useMemo } from "react";

const NotificationIconButton = IconButton;
const BookmarkIconButton = IconButton;

function Header({
  location = "",
  bookmarkedHotels,
  setBookmarkedHotels,
  notifs,
  setNotifs,
}) {
  // console.log(bookmarkedHotels);
  const isHasNotifUnRead = useMemo(
    () => notifs?.some(({ isRead }) => !isRead),
    [notifs]
  );

  return (
    <div className={headerStyles["header"]}>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid item md={2}>
          <Logo>
            <h3>Bookify</h3>
          </Logo>
        </Grid>
        <Grid
          item
          md={
            location.includes("/hotel") ||
            location.includes("/profile") ||
            location.includes("/dashboard") ||
            location.includes("/booking")
              ? 6
              : 8
          }
        >
          <SearchBox />
        </Grid>
        <Grid item md={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <BookmarkIconButton
              icon={faBookmark}
              renderChild={() => (
                <BookmarkBox
                  bookmarkedHotels={bookmarkedHotels}
                  setBookmarkedHotels={setBookmarkedHotels}
                />
              )}
            />
            <NotificationIconButton
              icon={faBell}
              renderChild={(setDropdownOpen) => (
                <NotifyBox
                  notifs={notifs}
                  setNotifs={setNotifs}
                  setDropdownOpen={setDropdownOpen}
                />
              )}
              isHasNotifUnRead={isHasNotifUnRead}
            />
            <ProfileHeaderNav />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
