import ProfileCard from "./components/card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  faIdCard,
  faShield,
  faMoneyBills,
  faSliders,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import profileStyle from "./Profile.module.scss";
import { useMemo, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastMessageContext, UserContext } from "@/utils/contexts";
import { getFailureToastMessage } from "@/utils/reducers/toastMessageReducer";

const account = {
  name: "Le Duc",
  email: "duc@gmail.com",
};

function Profile() {
  const { setToastMessages } = useContext(ToastMessageContext);
  useEffect(() => {
    document.title = "Profile";
  }, []);
  const { user, setUser, isLogin, setLogin } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    // fetch("http://localhost:3001/user/verifyjwt", {
    //   credentials: 'include' , method: "POST",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setLogin(true);
    //     // setUser(data);
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     setLogin(false);
    //   });
  }, []);

  // useEffect(() => {
  //   const jwtString = JSON.stringify(localStorage.getItem("jwt"));
  //   const userForm = new FormData();
  //   userForm.append("jwt", jwtString);
  //   if (jwtString) {
  //     fetch("http://localhost:3001/user/verifyjwt", {
  //       method: "POST",
  //       body: userForm,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setLogin(true);
  //         setUser(data);
  //       })
  //       .catch((err) => {
  //         setUser({ role: 0 });
  //         navigate("/");
  //         setToastMessages(
  //           getFailureToastMessage({
  //             message: "Đăng nhập để truy cập",
  //           })
  //         );
  //       });
  //   } else {
  //     navigate("/");
  //     setUser({ role: 0 });
  //     setToastMessages(
  //       getFailureToastMessage({
  //         message: "Đăng nhập để truy cập",
  //       })
  //     );
  //   }
  // }, []);

  const options = useMemo(
    () => [
      {
        icon: faIdCard,
        title: "Thông tin cá nhân",
        description: "Cung cấp thông tin cá nhân cần thiết của bạn",
        path: "info",
      },
      {
        icon: faShield,
        title: "Đăng nhập và bảo mật",
        description: "Cập nhật mật khẩu và bảo mật tài khoản của bạn",
        path: "loginandsecurity",
      },
      {
        icon: faMoneyBills,
        title: "Thanh toán và chi trả",
        description:
          "Tìm hiểu lại các khoản thanh toán, chi trả, phiếu giảm giá, thẻ quà tặng",

        path: "payment",
      },
      {
        icon: faSliders,
        title: "Lựa chọn chung",
        description: "Cài đặt ngôn ngữ, loại tiền tệ mặc định của bạn",
      },
      {
        icon: faHistory,
        title: "Lịch sử đặt phòng",
        description: "Xem lịch sử các phòng bạn đã đặt hay hủy bỏ",
        path: "history",
      },
    ],
    []
  );

  return (
    <Grid container justifyContent={"center"}>
      <Grid xs={10}>
        <div className={profileStyle["profile-page"]}>
          <h1 className={profileStyle["account"]}>Tài Khoản</h1>
          <h4
            className={profileStyle["commonInfo"]}
            style={{ marginBottom: "1rem" }}
          >
            {account.name}, {account.email}{" "}
            <Link to={`info`}>Thay đổi hồ sơ</Link>
          </h4>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              {options.map((option, index) => {
                return (
                  <Grid item xs={12} md={4} key={index}>
                    <ProfileCard
                      title={option.title}
                      icon={option.icon}
                      description={option.description}
                      path={option.path}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default Profile;
