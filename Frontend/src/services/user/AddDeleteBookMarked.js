import { CheckStatus } from "@/utils/validation";

export default async function AddDeleteBookMarked(id) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user/bookmarked/${id}`;
  const option = {
    method: "PUT",
    credentials: "include",
    withCredentials: true,
  };
  try {
    return await fetch(url, option).then((resp) => {
      if (CheckStatus(resp.status)) return resp.json();
      return false;
    });
  } catch (e) {
    console.log(e);
  }
}
