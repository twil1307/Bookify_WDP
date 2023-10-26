import PersonalInfoStyle from "./PersonalInfo.module.scss";
import HeaderInfo from "./components/HeaderInfo";
import FormUpdate from "./components/FormUpdate";
import { UserContext } from "@/utils/contexts";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastMessageContext } from "@/utils/contexts";
import { getFailureToastMessage } from "@/utils/reducers/toastMessageReducer";
import { Grid } from "@mui/material";

function PersonalInfo() {
  let { user, isLogin } = useContext(UserContext);
  const { setToastMessages } = useContext(ToastMessageContext);
  console.log(isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === false || isLogin === undefined) {
      navigate("/");
      setToastMessages(
        getFailureToastMessage({
          message: "Đăng nhập để truy cập",
        })
      );
    }
  }, []);

  console.log(user);

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={10}>
        <div className={PersonalInfoStyle[""]}>
          <HeaderInfo />
          <FormUpdate account={user} />
        </div>
      </Grid>
    </Grid>
  );
}

export default PersonalInfo;
