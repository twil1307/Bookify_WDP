
export default async function getDefaultAmenityTypes() {
    return await fetch(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/amenity/type`,
    {method:"GET",
    credentials: "include",
    withCredentials: true,})
        .then((res) => res.json());
}
