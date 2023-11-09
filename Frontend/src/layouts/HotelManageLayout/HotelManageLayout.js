import { Suspense, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import HotelManageHeader from "../components/HotelManageHeader";
import manageLayoutStyles from "./HotelManageLayout.module.scss";
import { UserContext } from "@/utils/contexts";
import { getHotelbyOwner } from "@/services/hotel";

function HotelManageLayout() {
  const { user } = useContext(UserContext);
  const [hotel, setHotel] = useState();

  useEffect(() => {
    getHotelbyOwner(user._id).then((resp) => {
      console.log(resp);
      setHotel(resp?.hotel);
    });
  }, []);

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
