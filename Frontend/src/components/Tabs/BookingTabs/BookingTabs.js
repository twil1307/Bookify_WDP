import { Box } from "@mui/system";
import { Suspense, lazy } from "react";

const BookingItem = lazy(() => import("@/components/BookingItem"));

function BookingTabs({ list, setBookingList }) {
  const handleBookingAction = (_id, action) => {
    setBookingList((list) => {
      return list.reduce((prev, booking) => {
        if (booking._id === _id) {
          booking.status = action === "accept" ? true : false;
          if (booking.status == true) return [...prev, booking];
        } else {
          return prev;
        }
      }, []);
    });
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
