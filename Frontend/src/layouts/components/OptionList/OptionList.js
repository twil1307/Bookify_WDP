import optionListStyles from "./OptionList.module.scss";
import {
  ModalContext,
  UserContext,
  ToastMessageContext,
} from "@/utils/contexts";
import { useContext, useMemo } from "react";
import { getSignUpModal, getSignInModal } from "@/utils/reducers/modalReducer";
import { useNavigate } from "react-router-dom";
import { getFailureToastMessage } from "@/utils/reducers/toastMessageReducer";
import { useSignUser } from "@/utils/hooks";

function OptionList({ handleClick }) {
  const { dispatch } = useContext(ModalContext);
  const { isLogin, setLogin } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const { SignOut } = useSignUser();
  console.log(user);
  const { setToastMessages } = useContext(ToastMessageContext);
  const navigate = useNavigate();

  const options = useMemo(
    () => [
      {
        title: "Thông báo",
        style: "primary",
        isLoginRequired: true,
        requiredRole: [1, 2, 3],
        onClickHandler: (e) => {
          console.log(e.target);
        },
      },
      {
        title: "Danh sách yêu thích",
        style: "primary",
        requiredRole: [1, 2, 3],
        isLoginRequired: true,
      },
      {
        title: "Quản lý thông tin",
        style: "primary",
        requiredRole: [3],
        isLoginRequired: true,
        onClickHandler: (event) => {
          event.stopPropagation();
          navigate("/dashboard");
        },
      },
      {
        title: "Đặt phòng",
        style: "primary",
        requiredRole: [1, 2, 3],
      },
      {
        title: "Khách sạn của bạn",
        style: "primary",
        requiredRole: [2],
        isLoginRequired: true,
        onClickHandler: (event) => {
          event.stopPropagation();
          navigate("/manager/hotel");
        },
      },
      {
        title: "Trở thành chủ nhà",
        style: "primary",
        requiredRole: [1],
        isLoginRequired: true,
        onClickHandler: (event) => {
          event.stopPropagation();
          if (!user.bankingAccount) {
            setToastMessages(
              getFailureToastMessage({
                message: "Bạn chưa liên kết tài khoản ngân hàng",
              })
            );
            handleClick(event);
          } else {
            navigate("/hosting/introduction");
          }
        },
      },
      {
        title: "Tài khoản",
        style: "secondary",
        requiredRole: [1, 2, 3],
        isLoginRequired: true,
        onClickHandler: (event) => {
          event.stopPropagation();
          handleClick(event);
          navigate("/profile");
        },
      },
      {
        title: "Hỗ trợ",
        style: "secondary",
        requiredRole: [1, 2, 3],
        isLoginRequired: true,
      },
      {
        title: "Đăng xuất",
        style: "secondary",
        requiredRole: [1, 2, 3],
        isLoginRequired: true,
        onClickHandler: (e) => {
          e.stopPropagation();
          SignOut();
          navigate(0);
        },
      },
      {
        title: "Đăng nhập",
        style: "secondary",
        requiredRole: [0],
        isLoginRequired: false,
        onClickHandler: (e) => {
          e.stopPropagation();
          dispatch(getSignInModal({ isOpen: true }));
        },
      },
      {
        title: "Đăng ký",
        style: "secondary",
        requiredRole: [0],
        isLoginRequired: false,
        onClickHandler: (e) => {
          e.stopPropagation();
          dispatch(getSignUpModal({ isOpen: true }));
        },
      },
    ],
    []
  );

  return (
    <>
      <ul
        className={optionListStyles["option-list"]}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {options.reduce(
          (
            prev,
            { title, style, requiredRole, isLoginRequired, onClickHandler },
            index
          ) => {
            if (
              isLoginRequired == isLogin &&
              requiredRole.includes(user.role)
            ) {
              // console.log(prev);
              return [
                ...prev,
                <li
                  key={index}
                  className={optionListStyles[style]}
                  onClick={onClickHandler}
                >
                  {title}
                </li>,
              ];
            }
            return [...prev];
          },
          []
        )}
      </ul>
    </>
  );
}

export default OptionList;
