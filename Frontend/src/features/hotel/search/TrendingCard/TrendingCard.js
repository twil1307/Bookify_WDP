import { Box } from '@mui/material';
import trendingCardStyles from './TrendingCard.module.scss';

function TrendingCard({ title }) {
    return (  
        <Box
            className={trendingCardStyles['trending-card']}
            sx={{
                backgroundImage: 'url(photo/ho-boi-spa.png)',
            }} 
        >
            <Box sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                width: '100%',
                height: '100%',
                transition: 'all 0.2s linear'
            }}>
                <p >{title}</p>
            </Box>
        </Box>
    );
}

export default TrendingCard;