import { Logo } from "@/components";
import { Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import './HostingRegisterHeader.scss';         

function HostingRegisterHeader({ location }) {
    const introductionHref = '/hosting/introduction';
    const registerHref = '/hosting/register';
    const updateHref = '/hosting/update';

    const getHeaderClassName = () => {
        if (location === introductionHref)
            return 'introduction';
        else if (location === registerHref || location.includes(updateHref))
            return 'register';
        else return ''
    }

    return (
        <Grid
            container
            sx={{
                padding: "1em 0",
            }}
            className={['header', getHeaderClassName()].join(' ')}
        >
            <Grid item xs={6}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2em",
                    }}
                    className="brand-logo"
                >
                    <Logo />
                    <Typography
                        sx={{
                            color: "#4361ee",
                            fontWeight: "bold",
                            fontSize: "1.6em",
                        }}
                    >
                        Bookify
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        height: "100%",
                    }}
                    className="profile-link-button"
                >
                    <Link
                        to="/profile"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "bold",
                            }}
                        >
                            Tài khoản
                        </Typography>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
}

export default HostingRegisterHeader;
