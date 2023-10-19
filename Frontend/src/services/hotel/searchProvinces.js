export default async function searchProvinces(searchTerm, ...args) {
    const url = `https://provinces.open-api.vn/api/p/search/?q=${searchTerm}`;
    const data = await fetch(url)
        .then((response) => response.json())
        .then((data) => data.slice(0, 5));
    return data;
}
