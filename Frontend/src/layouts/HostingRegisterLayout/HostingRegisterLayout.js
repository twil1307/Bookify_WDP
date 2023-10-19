import { Outlet, useHref, useNavigate } from "react-router-dom";
import HostingRegisterHeader from "../components/HostingRegisterHeader";
import VerifyAuth from "@/utils/hooks/verifyAuth";

function HostingRegisterLayout() {
  const navigate = useNavigate();
  const href = useHref();
  const { firstLogin } = VerifyAuth();
  if (!firstLogin) {
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
