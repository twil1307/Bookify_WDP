import { Box } from '@mui/material'
import TrendingCard from '../TrendingCard';

// testing purpose only
const trending = ["Bể bơi", "Bãi biển", "Thiên nhiên"];
function SearchTrending({ style }) {
    return (
        <div className={style["search-trending"]}>
            <h4 className={style["heading"]}>Xu hướng tìm kiếm</h4>
            <Box
                className={style["search-trending-list"]}
                sx={{
                    display: "flex",
                    gap: "0.5em",
                }}
            >
                {trending.map((trend, index) => (
                    <TrendingCard key={index} title={trend} src={""} />
                ))}
            </Box>
        </div>
    );
}

export default SearchTrending;
