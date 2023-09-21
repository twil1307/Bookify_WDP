import { Box } from "@mui/material";
import "./ToastMessageBox.scss";

function ToastMessageBox({ children }) {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: "1em",
                zIndex: '2',
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column-reverse",
                gap: "0.4em",
                alignItems: "center",
            }}
            id={'toast-message-box'}
        >
            {children}
        </Box>
    );
}

export default ToastMessageBox;
