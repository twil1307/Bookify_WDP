import { Suspense, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import HotelManageHeader from "../components/HotelManageHeader";
import manageLayoutStyles from "./HotelManageLayout.module.scss";
import Footer from "../components/Footer";
import { UserContext } from "@/utils/contexts";
import { useUser } from "@/utils/hooks";
// import { getHotelByOwnerId } from "@/services/hotel";

function HotelManageLayout() {
  const { user } = useContext(UserContext);
  const [hotel, setHotel] = useState({});
  const { Owner_hotel } = useUser();

  useEffect(() => {
    console.log(Owner_hotel);
    setHotel(Owner_hotel?.hotel);
  }, [Owner_hotel, user]);

  return (
    <div id={manageLayoutStyles["hotel-manage-layout"]}>
      <HotelManageHeader />
      <Box
        sx={{
          position: "relative",
          top: "70.81px",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet context={[hotel, setHotel]} />
        </Suspense>
      </Box>
      {/* <Footer /> */}
    </div>
  );
}

export default HotelManageLayout;
