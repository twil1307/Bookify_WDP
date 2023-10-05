import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useContext } from "react";
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

export default function useSignUser() {
  const { dispatch } = useContext(ModalContext);
  const { setUser, isLogin, setLogin } = useContext(UserContext);
  const [loginState, setLoginState] = useState();
  const { mutate: logInFn, status } = useMutation({
    mutationFn: (account) => {
      return ;
    },
    onSuccess: (data) => {
      if (!data) {
  
      } else {
        console.log("login success");
        console.log(data);
        setUser(data.user);
        setLogin(true);
        localStorage.setItem("user", JSON.stringify(data.user));
       

        setLoginState({ status: true, user: data.user });
      }
    },
    onError: (error) => {
      console.log("log in error:" + error);
    },
  });
  const { mutate: SignUpFn, status: siginUpStatus } = useMutation({
    mutationFn: (account) => {
      return ;
    },
    onSuccess: (data) => {
      console.log("login success");
      console.log(data);
      setUser(data.user);
      setLogin(true);
    
    ;
      dispatch(getSignInModal({ isOpen: true }));
    }, 
    onError: (error) => {
      console.log("Sign up error:" + error);
   
    },
  });
  const { mutate: checkPass } = useMutation({
    mutationKey: ["check-password"],
    mutationFn: (password) => {},
  });
const {mutate:SignOut} = useMutation({
  mutationKey:["log-out"],
  mutationFn:()=>{},
})
  return { status, loginState, logInFn, SignUpFn, checkPass ,SignOut};
}
