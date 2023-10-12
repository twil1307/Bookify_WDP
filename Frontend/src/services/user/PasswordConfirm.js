import { CheckStatus } from "@/utils/validation";
async function compareCurrentPassword(currentPassword) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user/compareCurrentPassword/`;
  const accountForm = new FormData();
  accountForm.append("currentPassword", currentPassword);
  const options = {
    method: "POST",
    credentials: "include",
    withCredentials: true,
    body: accountForm,
  };

  return await fetch(url, options).then((response) => {
    console.log(response);
    return CheckStatus(response.status);
  });
}
export default compareCurrentPassword;
