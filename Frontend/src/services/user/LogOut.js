import { CheckStatus } from "@/utils/validation";
export default async function LogOut() {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user/logout`;
  const option = {
    method: "POST",
    credentials: "include",
    withCredentials: true,
  };
  // console.log("Log out");
  try {
    return await fetch(url, option).then((response) => {
      if (CheckStatus(response.status)) return true;
      return false;
    });
  } catch (error) {
    console.log(error);
  }
}
