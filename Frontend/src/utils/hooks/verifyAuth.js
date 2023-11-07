import { useState, useRef, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts";
const userInitState = {
  account_number: "",
  avatar: "",
  dob: "",
  email: "",
  name: "",
  phone: "",
  role: 0,
  self_description: "",
  subname: "",
  _id: null,
  username: "",
  bank_card: "",
};
function VerifyAuth() {
  // const { user, isLogin, setLogin } = useContext(UserContext);
  const [firstLogin, setFirstLogin] = useState(localStorage.getItem("login"));
  const [userLocal, setUser] = useState(userInitState);

  //   const navigate = useNavigate();

  return { userLocal, firstLogin };
}
export default VerifyAuth;
