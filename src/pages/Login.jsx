import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";

// Styled Components
const GradientBackground = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(30, 30, 50, 0.8)",
  border: "1px solid rgba(99, 102, 241, 0.3)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(99, 102, 241, 0.2)",
  maxWidth: "450px",
  width: "100%",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "#e0e7ff",
    "& fieldset": {
      borderColor: "rgba(99, 102, 241, 0.3)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(99, 102, 241, 0.6)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366f1",
      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(224, 231, 255, 0.7)",
    "&.Mui-focused": {
      color: "#6366f1",
    },
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "rgba(224, 231, 255, 0.4)",
    opacity: 1,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  color: "#ffffff",
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  padding: "12px 24px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "none",
  "&:hover": {
    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
}));

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  // Define valid IDs for each role
  const validIds = {
    Admin: "ADM01",
    Registrar: "REG01",
    Doctor: "DOC01",
    IPD: "IPD01",
  };

  // Get the label for the current role
  const getUserIdLabel = () => {
    if (!role) return "User ID";
    return `User ID (${validIds[role]})`;
  };

  const handleLogin = () => {
    if (!role) {
      setError("Please select a role");
      return;
    }
    if (!userId) {
      setError("Please enter your User ID");
      return;
    }
    if (userId !== validIds[role]) {
      setError(`Invalid User ID for ${role}. Expected: ${validIds[role]}`);
      return;
    }

    setError("");
    if (role === "Admin") navigate("/admin");
    if (role === "Registrar") navigate("/registrar");
    if (role === "Doctor") navigate("/doctor");
    if (role === "IPD") navigate("/ipd");
  };

  return (
    <GradientBackground>
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <LockIcon
              sx={{
                fontSize: 32,
                color: "#6366f1",
                animation: "pulse 2s infinite",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HMS Login
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ color: "rgba(224, 231, 255, 0.6)", mb: 3 }}
          >
            Enter your credentials to access the system
          </Typography>

          {/* Form Fields */}
          <StyledTextField
            label={getUserIdLabel()}
            fullWidth
            margin="normal"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="e.g., ADM01"
            variant="outlined"
          />
          <StyledTextField
            select
            label="Role"
            fullWidth
            margin="normal"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setError("");
            }}
            variant="outlined"
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Registrar">Registrar</MenuItem>
            <MenuItem value="Doctor">Doctor</MenuItem>
            <MenuItem value="IPD">IPD</MenuItem>
          </StyledTextField>

          {/* Error Message */}
          {error && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "8px",
              }}
            >
              <Typography color="error" sx={{ fontSize: "14px" }}>
                {error}
              </Typography>
            </Box>
          )}

          {/* Login Button */}
          <StyledButton
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleLogin}
          >
            Login
          </StyledButton>
        </CardContent>
      </StyledCard>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </GradientBackground>
  );
}
