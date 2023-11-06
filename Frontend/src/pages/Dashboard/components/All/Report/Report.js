import ReportStyle from "./Report.module.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function Report({ reportData = [] }) {
  return (
    <div className={ReportStyle["wrap-report"]}>
      <h3 className={ReportStyle["header-title"]}>Báo cáo gần đây</h3>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {reportData?.map((data, index) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <div className={ReportStyle["card"]}>
                  <div className={ReportStyle["card-avatar"]}>
                    <div className={ReportStyle["avatar-wrapper"]}>
                      <img
                        src={data?.user?.avatar ? data?.user?.avatar : ""}
                        alt="avatar"
                        height={30}
                        width={30}
                      />
                    </div>
                  </div>
                  <div className={ReportStyle["card-body"]}>
                    <div className={ReportStyle["card-title"]}>
                      <h4>{data?.user?.username}</h4>
                      <Link to={`/hotel/${data._id}`}>
                        <h6>{data?.hotelName}</h6>
                      </Link>

                      {/* Onclick navigate in later --------------------------------------------------------- */}
                      {/* <h6 onClick={() => navigate(data.hotelId)}>
                        Khách sạn Vinpearl Nam Hội An
                      </h6> */}
                    </div>
                    <div className={ReportStyle["card-content"]}>
                      <p>{data.content}</p>
                    </div>
                    <div className={ReportStyle["card-time"]}>
                      <p>{format(new Date(data.createdAt), "yyyy-MM-dd")}</p>
                    </div>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default Report;
