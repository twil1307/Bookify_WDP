import { useState, useRef, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts";
import { VerifyJwt } from "@/services-new/user/VerifyJwt";
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
  const verifyData = useQuery({
    queryKey: ["verify"],
    queryFn: VerifyJwt,
    refetchInterval: 1000 * 30,
    onSuccess: (data) => {
      console.log(data);
      if (!data) {
        setFirstLogin(false);
        setUser(userInitState);
        console.log(data);
        localStorage.removeItem("user");
        localStorage.setItem("login", false);
      } else {
        setFirstLogin(true);
        localStorage.setItem("login", true);
        setUser(data.user);
      }
      // setLogin(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { userLocal, firstLogin, verifyData };
}
export default VerifyAuth;
