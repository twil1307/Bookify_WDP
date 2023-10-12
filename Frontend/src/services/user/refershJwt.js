import { CheckStatus } from "@/utils/validation";

export default async function refreshJwt() {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user/refresh`;
  const option = {
    method: "POST",
    credentials: "include",
    withCredentials: true,
  };

  try {
    return await fetch(url, option).then((resp) => {
      console.log("token refresh");
      return CheckStatus(resp.status);
    });
  } catch (e) {
    console.log(e);
  }
}
