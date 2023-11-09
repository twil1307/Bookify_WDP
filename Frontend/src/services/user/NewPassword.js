import { CheckStatus } from "@/utils/validation";
async function newPassowrdUpdate(newPassword) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user/changePassword/`;
  // console.log(newPassword);
  const accountForm = new FormData();
  accountForm.append("newPassword", newPassword);
  const options = {
    method: "PUT",
    credentials: "include",
    withCredentials: true,
    body: accountForm,
  };

  return await fetch(url, options).then((response) => {
    return response.json();
  });
}

export default newPassowrdUpdate;
