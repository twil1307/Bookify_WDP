import LoginandSecurityStyle from "./LoginandSecurity.module.scss";
import HeaderInfo from "./components/Header";
import FormUpdate from "./components/Form";
import VerifyAuth from "@/utils/hooks/verifyAuth";
import { useNavigate } from "react-router-dom";
import { ToastMessageContext } from "@/utils/contexts";
import { getFailureToastMessage } from "@/utils/reducers/toastMessageReducer";
import { useEffect, useContext } from "react";
import { Grid } from '@mui/material';

function LoginandSecurity() {
  const { user } = VerifyAuth();
  const { setToastMessages } = useContext(ToastMessageContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user || user.username === "") {
  //     navigate("/");
  //     setToastMessages(
  //       getFailureToastMessage({
  //         message: "Đăng nhập để truy cập",
  //       })
  //     );
  //   }
  // }, []);

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={10}>
        <div className={LoginandSecurityStyle[""]}>
          <HeaderInfo />
          <FormUpdate />
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginandSecurity;
