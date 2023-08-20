import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    
    const handleStartShopping = () => {
        navigate('/shopping');
    }
    return (
        <Button variant="contained" color="primary" onClick={handleStartShopping}>
            Start Shopping!
        </Button>
    )
};