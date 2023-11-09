import DropdownBox from "../DropdownBox";
import BookmarkItem from "../BookmarkItem";

function BookmarkBox({ bookmarkedHotels, setBookmarkedHotels }) {
  // const tabs = useMemo(() => [
  //   {
  //     title: "Tất cả",
  //     list: bookmarkedHotels,
  //     index: 0,
  //     role: [1, 2, 3],
  //   },
  // ]);
  return (
    <DropdownBox
      heading={"Yêu thích"}
      extraButtonTittle={""}
      isScrollable={bookmarkedHotels?.length > 8}
      activeIndex={0}
    >
      {bookmarkedHotels?.map((hotel, index) => (
        <BookmarkItem
          hotel={hotel}
          key={index}
          setBookmarkedHotels={setBookmarkedHotels}
        />
      ))}
    </DropdownBox>
  );
}

export default BookmarkBox;
