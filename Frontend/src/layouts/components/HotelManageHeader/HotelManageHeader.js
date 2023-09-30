import { Logo } from "@/components";
import ProfileHeaderNav from "../ProfileHeaderNav";
import headerStyles from "./HotelManageHeader.module.scss";
import { Link, useHref } from "react-router-dom";
import { Grid, Box } from "@mui/material";

const tabs = [
    {
        title: "Khách sạn",
        to: "hotel",
    },
    {
        title: "Đặt phòng",
        to: "booking",
    },
    {
        title: "Chi tiết",
        to: "detail",
    },
];

function HotelManageHeader() {
    const href = useHref();

    return (
        <div id={headerStyles["hotel-manage-header"]}>
            <Grid container alignItems={"center"} justifyContent={"center"}>
                <Grid item md={2}>
                    <Logo>
                        <h3>Bookify</h3>
                    </Logo>
                </Grid>
                <Grid item md={6}>
                    <div className={headerStyles["hotel-manage-tabs"]}>
                        {tabs.map(({ title, to }, index) => (
                            <Link key={index} to={to}>
                                <p
                                    className={[
                                        headerStyles["link-to"],
                                        href.includes(to)
                                            ? headerStyles["active"]
                                            : "",
                                    ].join(" ")}
                                >
                                    {title}
                                </p>
                            </Link>
                        ))}
                    </div>
                </Grid>
                <Grid item md={2}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <ProfileHeaderNav />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default HotelManageHeader;
