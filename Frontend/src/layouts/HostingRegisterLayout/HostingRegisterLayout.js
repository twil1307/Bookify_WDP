import { Outlet, useHref, useNavigate } from "react-router-dom";
import HostingRegisterHeader from "../components/HostingRegisterHeader";
import { useContext } from "react";
import { UserContext } from "@/utils/contexts";

function HostingRegisterLayout() {
  const navigate = useNavigate();
  const href = useHref();
  const { user } = useContext(UserContext);
  // console.log(user);
  if (user.role !== 1) {
    navigate("/");
  }
  return (
    <>
      <HostingRegisterHeader location={href} />
      <Outlet />
    </>
  );
}

export default HostingRegisterLayout;
