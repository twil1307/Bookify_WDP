export default async function UpdateUser(user) {
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user`;
  const userData = new FormData();
  userData.append("avatar", user.avatar);
  userData.append("subName", user.subName);
  userData.append("name", user.name);
  userData.append("phone", user.phone);
  userData.append("email", user.email);
  userData.append("dob", user.dob);
  userData.append("selfDescription", user.selfDescription);

  const option = {
    method: "PUT",
    credentials: "include",
    withCredentials: true,
    body: userData,
  };
  try {
    return await fetch(url, option).then((resp) => {
      if (resp.status === 401) return resp.status;
      return resp.json();
    });
  } catch (e) {
    console.log(e);
  }
}
