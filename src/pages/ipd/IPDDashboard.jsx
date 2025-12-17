import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import Navbar from "../../components/Navbar";
import BedAssignForm from "../../components/BedAssignForm";

const API = "http://localhost:5000";

// Styled components for futuristic theme
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
      "radial-gradient(circle at 20% 40%, rgba(99, 102, 241, 0.15) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)",
    pointerEvents: "none",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(30, 30, 50, 0.85)",
  border: "1px solid rgba(99, 102, 241, 0.3)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(99, 102, 241, 0.25)",
  transition: "all 0.3s ease",
  "&:hover": {
    border: "1px solid rgba(99, 102, 241, 0.6)",
    boxShadow: "0 0 25px rgba(99, 102, 241, 0.35)",
    transform: "translateY(-3px)",
  },
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-root": {
    background: "rgba(255, 255, 255, 0.9)",
    border: "1px solid rgba(99, 102, 241, 0.18)",
    borderRadius: "12px",
    color: "#0f172a",
  },
  "& .MuiDataGrid-cell": {
    borderColor: "rgba(99, 102, 241, 0.12)",
    color: "#0f172a",
    fontWeight: 600,
  },
  "& .MuiDataGrid-columnHeader": {
    background: "rgba(226, 232, 240, 0.9)",
    borderColor: "rgba(99, 102, 241, 0.22)",
    color: "#0f172a",
    fontWeight: 700,
  },
  "& .MuiDataGrid-row:hover": {
    background: "rgba(99, 102, 241, 0.08) !important",
  },
}));

export default function IPDDashboard() {
  const [beds, setBeds] = useState([]);
  const [assigning, setAssigning] = useState(false);

  const fetchBeds = () => {
    fetch(`${API}/beds`)
      .then((res) => res.json())
      .then(setBeds)
      .catch((err) => console.error("Failed to load beds", err));
  };

  const totalBeds = beds.length;
  const availableBeds = useMemo(
    () =>
      beds.filter((b) => (b.status || "").toLowerCase() === "available").length,
    [beds]
  );
  const occupiedBeds = totalBeds - availableBeds;

  useEffect(() => {
    fetchBeds();
  }, []);

  const handleAssignBed = async ({ patientId, bedNo, ward }) => {
    try {
      setAssigning(true);
      await fetch(`${API}/assign-bed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          bed_no: bedNo,
          ward,
        }),
      });
      fetchBeds();
    } catch (err) {
      console.error("Failed to assign bed", err);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <GradientBackground>
      <Navbar title="IPD Dashboard" />
      <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <LocalHotelIcon
            sx={{
              fontSize: 40,
              color: "#6366f1",
              animation: "pulse 2s infinite",
            }}
          />
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              In-Patient Department
            </Typography>
            <Typography sx={{ color: "rgba(224, 231, 255, 0.65)" }}>
              Track bed availability and assignments
            </Typography>
          </Box>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ color: "#6366f1", fontWeight: 700 }}
                >
                  {totalBeds}
                </Typography>
                <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                  Total Beds
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ color: "#22d3ee", fontWeight: 700 }}
                >
                  {availableBeds}
                </Typography>
                <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                  Available
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ color: "#f97316", fontWeight: 700 }}
                >
                  {occupiedBeds}
                </Typography>
                <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                  Occupied
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Table */}
        <StyledCard sx={{ mb: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#e0e7ff", fontWeight: 700, mb: 2 }}
            >
              Bed Availability
            </Typography>
            <Box sx={{ height: 400, borderRadius: "12px", overflow: "hidden" }}>
              <StyledDataGrid
                rows={beds}
                getRowId={(r) => r.bed_no}
                columns={[
                  { field: "bed_no", headerName: "Bed No", flex: 0.6 },
                  { field: "ward", headerName: "Ward", flex: 1 },
                  {
                    field: "status",
                    headerName: "Status",
                    flex: 0.8,
                    renderCell: (params) => {
                      const status = (params.value || "").toLowerCase();
                      const color = status === "available" ? "#166534" : "#991b1b";
                      return (
                        <span
                          style={{
                            color,
                            fontWeight: 700,
                            textTransform: "capitalize",
                          }}
                        >
                          {params.value || "Unknown"}
                        </span>
                      );
                    },
                  },
                ]}
              />
            </Box>
          </CardContent>
        </StyledCard>

        {/* Assign Form */}
        <StyledCard>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#e0e7ff", fontWeight: 700, mb: 2 }}
            >
              Assign Bed
            </Typography>
            <BedAssignForm onAssign={handleAssignBed} loading={assigning} />
          </CardContent>
        </StyledCard>
      </Container>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </GradientBackground>
  );
}
