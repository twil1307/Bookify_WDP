import { Box } from "@mui/system";
import { Suspense, lazy } from "react";

const BookingItem = lazy(() => import("@/components/BookingItem"));

function BookingTabs({ list, setBookingList }) {
    const handleBookingAction = (bookingId, action) => {
      setBookingList(list => {
        return list.reduce((prev, booking) => {
            if (booking.bookingId === bookingId) {
              booking.status = action === 'accept' ? 1 : 2;
                return [...prev, booking]
            } else {
                return prev;
            }
        }, [])
    });
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6em",
            }}
        >
            {list.map((booking) => (
                <Suspense fallback={<div>Loading...</div>}>
                    <BookingItem
                        key={booking?.bookingId}
                        booking={booking}
                        handleBookingAction={handleBookingAction}
                    />
                </Suspense>
            ))}
        </Box>
    );
}
export default BookingTabs;
