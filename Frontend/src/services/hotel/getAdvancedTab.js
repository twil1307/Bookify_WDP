export default async function getAdvancedTab(urlpayload) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/hotel?${urlpayload} `;
  const option = {
    method: "GET",
    credentials: "include",
    withCredentials: true,
  };
  return await fetch(url, option).then((res) => res.json());
}
