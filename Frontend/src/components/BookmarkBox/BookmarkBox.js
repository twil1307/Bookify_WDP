import DropdownBox from "../DropdownBox";
import BookmarkItem from "../BookmarkItem";

function BookmarkBox({ bookmarkedHotels, setBookmarkedHotels }) {

  return (
    <DropdownBox
      heading={"Yêu thích"}
      extraButtonTittle={""}
      isScrollable={bookmarkedHotels.length > 8}
      activeIndex={0}
    >
      {bookmarkedHotels?.map((hotel) => (
        <BookmarkItem
          hotel={hotel}
          key={hotel.hotelId}
       
        />
      ))}
    </DropdownBox>
  );
}

export default BookmarkBox;
