import { format } from "date-fns";

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

export default async function GetAdvanceSearchHotels(
  place,
  selectedDays,
  guests
) {
  const { from, to } = selectedDays;
  const numberOfPeople = Object.keys(guests).reduce(
    (prev, key) => (key === "pet" ? prev : prev + guests[key]),
    0
  );
  const url = `http://localhost:${
    process.env.REACT_APP_BACK_END_PORT
  }/hotel?district=${place}&checkIn=${formatDate(from)}&checkOut=${formatDate(
    to
  )}&roomType.maxGuest=${numberOfPeople}`;
  const data = await fetch(url, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return data;
}
