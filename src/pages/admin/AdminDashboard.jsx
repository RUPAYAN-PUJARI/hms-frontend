import {
  Container,
  Button,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import Navbar from "../../components/Navbar";
import UserModal from "../../components/UserModal";

const API = "http://localhost:5000";

// Styled Components for Futuristic Design
const GradientBackground = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
  minHeight: "100vh",
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
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    border: "1px solid rgba(99, 102, 241, 0.8)",
    boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
    transform: "translateY(-4px)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  padding: "10px 24px",
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

const StatsCard = styled(Card)(({ theme }) => ({
  background:
    "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
  transition: "all 0.3s ease",
  "&:hover": {
    border: "1px solid rgba(99, 102, 241, 0.6)",
    boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
  },
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-root": {
    background: "rgba(30, 30, 50, 0.6)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    borderRadius: "12px",
    color: "#1f2937",
  },
  "& .MuiDataGrid-cell": {
    borderColor: "rgba(99, 102, 241, 0.1)",
    color: "#1f2937",
    fontSize: "15px",
    fontWeight: 600,
  },
  "& .MuiDataGrid-columnHeader": {
    background: "rgba(99, 102, 241, 0.2)",
    borderColor: "rgba(99, 102, 241, 0.3)",
    color: "#0f172a",
    fontWeight: 700,
    fontSize: "14px",
  },
  "& .MuiDataGrid-row:hover": {
    background: "rgba(99, 102, 241, 0.2) !important",
  },
  "& .MuiCheckbox-root": {
    color: "rgba(99, 102, 241, 0.6)",
  },
  "& .MuiCheckbox-root.Mui-checked": {
    color: "#6366f1",
  },
}));

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`${API}/users`)
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const addUser = (user) => {
    fetch(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      setUsers((prev) => [...prev, user]);
      setOpen(false);
    });
  };

  const deleteUser = (id) => {
    fetch(`${API}/users/${id}`, { method: "DELETE" }).then(() =>
      setUsers((prev) => prev.filter((u) => u.id !== id))
    );
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            background: "rgba(99, 102, 241, 0.2)",
            color: "#4f46e5",
            borderRadius: "8px",
            fontWeight: 600,
          }}
        />
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.2 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          variant="outlined"
          sx={{
            borderColor: "#8b5cf6",
            color: "#6d28d9",
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            deleteUser(params.row.id);
          }}
          sx={{
            "&:hover": {
              background: "rgba(239, 68, 68, 0.1)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <GradientBackground>
      <Navbar title="Admin Dashboard" />
      <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <GroupsIcon
              sx={{
                fontSize: 40,
                color: "#6366f1",
                animation: "pulse 2s infinite",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                color: "#e0e7ff",
                fontWeight: 700,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              User Management System
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "rgba(224, 231, 255, 0.6)", mb: 3 }}
          >
            Manage system users, roles, and permissions
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <Typography
                variant="h3"
                sx={{ color: "#6366f1", fontWeight: 700 }}
              >
                {users.length}
              </Typography>
              <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                Total Users
              </Typography>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <Typography
                variant="h3"
                sx={{ color: "#f97316", fontWeight: 700 }}
              >
                {users.filter((u) => u.role === "Admin").length}
              </Typography>
              <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                Admins
              </Typography>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <Typography
                variant="h3"
                sx={{ color: "#8b5cf6", fontWeight: 700 }}
              >
                {users.filter((u) => u.role === "Doctor").length}
              </Typography>
              <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                Doctors
              </Typography>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <Typography
                variant="h3"
                sx={{ color: "#06b6d4", fontWeight: 700 }}
              >
                {users.filter((u) => u.role === "Registrar").length}
              </Typography>
              <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                Registrars
              </Typography>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <Typography
                variant="h3"
                sx={{ color: "#14b8a6", fontWeight: 700 }}
              >
                {users.filter((u) => u.role === "IPD").length}
              </Typography>
              <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                IPD Staff
              </Typography>
            </StatsCard>
          </Grid>
        </Grid>

        {/* Main Content Card */}
        <StyledCard>
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#e0e7ff", fontWeight: 600 }}
              >
                User Directory
              </Typography>
              <StyledButton
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={() => setOpen(true)}
              >
                Register New User
              </StyledButton>
            </Box>

            <Box
              sx={{
                height: 500,
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <StyledDataGrid
                rows={users}
                columns={columns}
                getRowId={(r) => r.id}
                onRowClick={(params) => {
                  setSelectedUser(params.row);
                  setDetailOpen(true);
                }}
                sx={{
                  "& .MuiDataGrid-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </Box>
          </CardContent>
        </StyledCard>
      </Container>

      <UserModal open={open} onClose={() => setOpen(false)} onSave={addUser} />

      <Dialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Box sx={{ display: "grid", rowGap: 1.5 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ID
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {selectedUser.id}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Name
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {selectedUser.name}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Email
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {selectedUser.email || "-"}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Role
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {selectedUser.role}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Gender
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {selectedUser.gender || "-"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

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
