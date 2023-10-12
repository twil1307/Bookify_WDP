import { CheckStatus } from "@/utils/validation";
async function SignIn(username, password) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user/login`;
  const accountForm = new FormData();
  console.log("pass:" + password);
  accountForm.append("username", username);
  accountForm.append("password", password);
  const options = {
    method: "POST",
    credentials: "include",
    withCredentials: true,
    body: accountForm,
  };

  try {
    return await fetch(url, options).then((response) => {
      if (CheckStatus(response.status)) return response.json();
      return CheckStatus(response.status);
    });
  } catch (error) {
    console.log(error);
  }
}

export default SignIn;
