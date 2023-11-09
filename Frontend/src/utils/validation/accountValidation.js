export const types = {
  USERNAME: "username",
  EMAIL: "email",
  PASSWORD: "password",
  RE_PASSWORD: "rePassword",
};

const validateUsername = (username, isSignIn) => {
  if (isSignIn) {
    return username.length !== 0;
  }
  return username !== null && username.length >= 5;
};

const validateEmail = (email) => {
  //eslint-disable-next-line
  const PATTERN =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return !!email.match(PATTERN);
};

const validatePassword = (password, isSignIn) => {
  if (isSignIn) {
    return password.length !== 0;
  }
  return password.length >= 8;
};

const validateRePassword = (password, rePassword) => {
  return rePassword.length >= 8 && rePassword === password;
};

function accountValidation(type, value, comparedValue = "", isSignIn = false) {
  const infor = value ?? "";

  switch (type) {
    case types.USERNAME:
      return validateUsername(infor, isSignIn);
    case types.EMAIL:
      return validateEmail(infor);
    case types.PASSWORD:
      return validatePassword(infor, isSignIn);
    case types.RE_PASSWORD:
      return validateRePassword(infor, comparedValue);
    default:
      throw new Error("Invalidation");
  }
}

export default accountValidation;
