import { CheckStatus } from "@/utils/validation";
export async function VerifyJwt() {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user/verifyjwt`;
  const options = {
    method: "POST",
    credentials: "include",
    withCredentials: true,
  };
  try {
    return await fetch(url, options).then((response) => {
      console.log(response.status);
      return CheckStatus(response.status);
    });
  } catch (error) {
    console.log(error);
  }
}
