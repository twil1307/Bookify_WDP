import { Box } from "@mui/system";
import { Suspense, lazy } from "react";

const BookingItem = lazy(() => import("@/components/BookingItem"));

function BookingTabs({ list, setBookingList }) {
  const handleBookingAction = (_id, action) => {
    setBookingList(
      list.filter((prev) => {
        if (action === "accept") {
          if (prev._id === _id) {
            prev.status = "true";
            return prev;
          } else {
            return prev;
          }
        } else {
          if (prev._id === _id) {
            // return;
          } else {
            return prev;
          }
        }
      }, [])
    );
    console.log();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.6em",
      }}
    >
      {list?.map((booking, index) => (
        <Suspense fallback={<div>Loading...</div>}>
          <BookingItem
            key={index}
            booking={booking}
            handleBookingAction={handleBookingAction}
          />
        </Suspense>
      ))}
    </Box>
  );
}
export default BookingTabs;
