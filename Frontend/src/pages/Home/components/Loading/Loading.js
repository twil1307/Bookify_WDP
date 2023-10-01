import { Grid, Skeleton } from "@mui/material";
import "./Loading.scss";

function LoadingCard() {
    return (
        <div className="loading-card">
            <div className="image-loading">
                <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    className="image-loading-skeleton"
                />
            </div>
            <div className="infor-loading">
                <Skeleton
                    variant="h3"
                    className="hotel-name-loading"
                    width={"50%"}
                    height={20}
                />
                <Skeleton
                    variant="h4"
                    className="address-loading"
                    height={14}
                />
                <Skeleton
                    variant="h1"
                    className="price-loading"
                    width={"30%"}
                    height={18}
                />
            </div>
        </div>
    );
}

function Loading() {
    return (
        <>
            {Array.from(new Array(8)).map((value, index) => (
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={index}>
                    <LoadingCard />
                </Grid>
            ))}
        </>
    );
}

export default Loading;
