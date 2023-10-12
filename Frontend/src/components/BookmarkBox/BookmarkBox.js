import DropdownBox from "../DropdownBox";

function BookmarkBox({ bookmarkedHotels, setBookmarkedHotels }) {

  return (
    <DropdownBox
      heading={"Yêu thích"}
      extraButtonTittle={""}
      isScrollable={bookmarkedHotels.length > 8}
      activeIndex={0}
    >
     
    </DropdownBox>
  );
}

export default BookmarkBox;
