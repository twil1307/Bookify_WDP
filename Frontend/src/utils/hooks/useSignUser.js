import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useContext } from "react";
import { SignIn, SignUp, compareCurrentPassword } from "@/services-new/user";
import {
  ToastMessageContext,
  ModalContext,
  UserContext,
} from "@/utils/contexts";
import {
  getSuccessToastMessage,
  getFailureToastMessage,
} from "@/utils/reducers/toastMessageReducer";
import { getSignInModal } from "@/utils/reducers/modalReducer";
import LogOut from "@/services-new/user/LogOut";

export default function useSignUser() {
  const { dispatch } = useContext(ModalContext);
  const { setUser, isLogin, setLogin } = useContext(UserContext);
  const { setToastMessages } = useContext(ToastMessageContext);
  const [loginState, setLoginState] = useState();
  const { mutate: logInFn, status } = useMutation({
    mutationFn: (account) => {
      return SignIn(account.username, account.password);
    },
    onSuccess: (data) => {
      if (!data) {
        setToastMessages(
          getFailureToastMessage({
            message: "Đăng nhập thất bại",
          })
        );
      } else {
        console.log("login success");
        console.log(data);
        setUser(data.user);
        setLogin(true);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToastMessages(
          getSuccessToastMessage({
            message: "Đăng nhập thành công",
          })
        );

        setLoginState({ status: true, user: data.user });
      }
    },
    onError: (error) => {
      console.log("log in error:" + error);
    },
  });
  const { mutate: SignUpFn, status: siginUpStatus } = useMutation({
    mutationFn: (account) => {
      return SignUp(account.username, account.email, account.password);
    },
    onSuccess: (data) => {
      console.log("login success");
      console.log(data);
      setUser(data.user);
      setLogin(true);
      setToastMessages(
        getSuccessToastMessage({
          message: "Đăng Kí thành công",
        })
      );
      dispatch(getSignInModal({ isOpen: true }));
    },
    onError: (error) => {
      console.log("Sign up error:" + error);
      setToastMessages(
        getFailureToastMessage({
          message: error,
        })
      );
    },
  });
  const { mutate: checkPass } = useMutation({
    mutationKey: ["check-password"],
    mutationFn: (password) => compareCurrentPassword(password),
  });
const {mutate:SignOut} = useMutation({
  mutationKey:["log-out"],
  mutationFn:LogOut,
})
  return { status, loginState, logInFn, SignUpFn, checkPass ,SignOut};
}
