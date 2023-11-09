import { CheckStatus } from "@/utils/validation";
export default async function FetchUser(_id) {
  // console.log(_id);
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user/${_id}`;
  const option = {
    method: "GET",
    credentials: "include",
    withCredentials: true,
  };

  try {
    return await fetch(url, option).then((response) => {
      if (CheckStatus(response.status)) return response.json();
      return CheckStatus(response.status);
    });
  } catch (error) {
    console.log(error);
  }
}
