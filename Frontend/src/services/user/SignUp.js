async function SignUp(username, email, password) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user`;
  const accountForm = new FormData();
  accountForm.append("username", username);
  accountForm.append("email", email);
  accountForm.append("password", password);
  const options = {
    method: "POST",
    body: accountForm,
  };

  return await fetch(url, options).then((response) => response.json());
}

export default SignUp;
