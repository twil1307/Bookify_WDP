import { InputField } from "@/components";
import formStyles from "../PasswordForm.module.scss";
import {
  useState,
  memo,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from "react";
import { accountValidation } from "@/utils/validation";
import { ToastMessageContext, UserContext } from "@/utils/contexts";
import {
  getFailureToastMessage,
  getSuccessToastMessage,
} from "@/utils/reducers/toastMessageReducer";
import { newPassowrdUpdate } from "@/services/user";

function NewPasswordForm() {
  const { setToastMessages } = useContext(ToastMessageContext);
  const [newPassword, setNewPassword] = useState({
    password: null,
    rePassword: null,
  });
  const [isPasswordValid, setPasswordValid] = useState({
    password: true,
    rePassword: false,
  });
  const isPasswordFilled = useMemo(() => {
    const isAllValid = Object.values(isPasswordValid).every(
      (key) => isPasswordValid[key]
    );
    const isAllFullfilled = Object.keys(newPassword).every(
      (key) => newPassword[key] !== null
    );
    return isAllFullfilled && isAllValid;
  }, [newPassword, isPasswordValid]);
  const changedKey = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkPassword = accountValidation(
      "rePassword",
      newPassword.password,
      newPassword.rePassword,
      true
    );
    if (checkPassword) {
      try {
        // updatePass(newPassword.password, {
        //   onSuccess: (data) => {
        //     if (!data) {
        //       console.log("error code:" + data);
        //     } else {
        //       console.log(data);
        //       setToastMessages(
        //         getSuccessToastMessage({ message: "Đổi mật khẩu thành công" })
        //       );
        //     }
        //   },
        // });
        newPassowrdUpdate(newPassword.password).then((resp) => {
          // console.log(resp);
          if (resp.message !== "Passwords updated successfully") {
            setToastMessages(
              getFailureToastMessage({ message: "Đổi mật khẩu thất bại" })
            );
          } else {
            // console.log(resp);
            setToastMessages(
              getSuccessToastMessage({ message: "Đổi mật khẩu thành công" })
            );
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handlePasswordChange = useCallback(
    (value, key) => {
      setNewPassword((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
      changedKey.current = key;
    },
    //eslint-disable-next-line
    [newPassword]
  );
  useEffect(() => {
    const changedField = changedKey.current;
    if (changedField) {
      setPasswordValid((prev) => {
        if (changedField === "rePassword") {
          return {
            ...prev,
            [changedField]: accountValidation(
              changedField,
              newPassword.password,
              newPassword.rePassword,
              true
            ),
          };
        }
        return {
          ...prev,
          [changedField]: accountValidation(
            changedField,
            newPassword[changedField]
          ),
        };
      });
    }
  }, [newPassword]);
  return (
    <div className={formStyles["form-wrapper"]}>
      <form onSubmit={handleSubmit} className={formStyles["form"]}>
        <InputField
          value={newPassword.password}
          id={"password"}
          onValueChange={handlePasswordChange}
          isValid={isPasswordValid.password}
          isSignIn={true}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          label="Mật khẩu mới"
          type="password"
        />
        <InputField
          value={newPassword.rePassword}
          id={"rePassword"}
          onValueChange={handlePasswordChange}
          isValid={isPasswordValid.rePassword}
          isSignIn={true}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          label="Nhập lại mật khẩu"
          type="password"
        />
        <div className={formStyles["button-wrapper"]}>
          <button
            className={[
              formStyles["sign-in-button"],
              isPasswordFilled ? "" : formStyles["button-disabled"],
            ].join(" ")}
          >
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
}
export default memo(NewPasswordForm);
