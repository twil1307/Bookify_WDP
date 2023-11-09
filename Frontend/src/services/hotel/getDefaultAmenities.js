export default async function getDefaultAmenities() {
    return await fetch(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/amenity`,
    {method:"GET",
    credentials: "include",
    withCredentials: true,})
        .then((res) => res.json());
}
