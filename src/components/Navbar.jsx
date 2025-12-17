import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background:
    "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 30, 50, 0.95) 100%)",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 20px rgba(99, 102, 241, 0.15)",
  position: "static",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "12px 24px",
  gap: "16px",
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  color: "#ffffff",
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 600,
  padding: "8px 16px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
    transform: "translateY(-2px)",
  },
}));

export default function Navbar({ title }) {
  const navigate = useNavigate();
  return (
    <StyledAppBar>
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "20px",
            letterSpacing: "0.5px",
          }}
        >
          {title}
        </Typography>
        <LogoutButton endIcon={<LogoutIcon />} onClick={() => navigate("/")}>
          Logout
        </LogoutButton>
      </StyledToolbar>
    </StyledAppBar>
  );
}
