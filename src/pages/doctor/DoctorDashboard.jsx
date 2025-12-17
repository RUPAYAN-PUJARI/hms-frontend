import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Stack,
  LinearProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import Navbar from "../../components/Navbar";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import TodayIcon from "@mui/icons-material/Today";
import EventIcon from "@mui/icons-material/Event";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const DOCTOR_ID = "DOC01";

// Styled components to match app theme
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
    background: "rgba(30, 30, 50, 0.7)",
    border: "1px solid rgba(99, 102, 241, 0.25)",
    borderRadius: "12px",
    color: "#0f172a",
  },
  "& .MuiDataGrid-cell": {
    borderColor: "rgba(99, 102, 241, 0.15)",
    color: "#0f172a",
    fontWeight: 600,
  },
  "& .MuiDataGrid-columnHeader": {
    background: "rgba(99, 102, 241, 0.15)",
    borderColor: "rgba(99, 102, 241, 0.3)",
    color: "#111827",
    fontWeight: 700,
  },
  "& .MuiDataGrid-row:hover": {
    background: "rgba(99, 102, 241, 0.18) !important",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  color: "#ffffff",
  borderRadius: "12px",
  textTransform: "none",
  fontWeight: 700,
  padding: "8px 14px",
  minWidth: 90,
  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.25)",
  transition: "all 0.2s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    transform: "translateY(-2px)",
  },
}));

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]); // patients assigned to this doctor
  const [allPatients, setAllPatients] = useState([]); // all patients from backend
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch(`${API}/patients`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setAllPatients(list);
        const filtered = list.filter(
          (p) => (p.doctorId || p.doctor_id || p.doctorid) === DOCTOR_ID
        );

        // Initialize schedule with a done flag for UI state
        const withDone = filtered.map((p) => ({ ...p, done: false }));
        setPatients(filtered);
        setSchedule(withDone);
      })
      .catch(() => {
        setPatients([]);
        setAllPatients([]);
        setSchedule([]);
      });
  }, []);

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const tomorrowStr = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split("T")[0];
  }, []);

  const markDone = (id) => {
    setSchedule((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: true } : item))
    );
  };

  const todaysAppts = schedule.filter((p) => p.date === todayStr);
  const tomorrowAppts = schedule.filter((p) => p.date === tomorrowStr);
  const capacity = 10;
  const busyPercent = Math.min(
    100,
    Math.round(((todaysAppts.length || 0) / capacity) * 100)
  );

  const patientColumns = useMemo(
    () => [
      { field: "id", headerName: "Patient ID", flex: 0.7 },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "age", headerName: "Age", flex: 0.4 },
      { field: "gender", headerName: "Gender", flex: 0.6 },
      { field: "symptoms", headerName: "Symptoms", flex: 1.2 },
      {
        field: "doctorId",
        headerName: "Doctor ID",
        flex: 0.8,
        renderCell: (params) =>
          params.row?.doctorId ??
          params.row?.doctor_id ??
          params.row?.doctorid ??
          "-",
      },
      { field: "date", headerName: "Date", flex: 0.8 },
    ],
    []
  );

  return (
    <GradientBackground>
      <Navbar title="Doctor Dashboard" />
      <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <MedicalInformationIcon
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
              Dr. Schedule — {DOCTOR_ID}
            </Typography>
            <Typography sx={{ color: "rgba(224, 231, 255, 0.65)" }}>
              Patients assigned to you and daily workload
            </Typography>
          </Box>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ color: "#6366f1", fontWeight: 700 }}
                >
                  {patients.length}
                </Typography>
                <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                  Assigned Patients
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ color: "#22d3ee", fontWeight: 700 }}
                >
                  {todaysAppts.length}
                </Typography>
                <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                  Today
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ color: "#8b5cf6", fontWeight: 700 }}
                >
                  {tomorrowAppts.length}
                </Typography>
                <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                  Tomorrow
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#e0e7ff", mb: 1 }}>
                  Today Busy Level
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={busyPercent}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        background: "rgba(99,102,241,0.15)",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        },
                      }}
                    />
                  </Box>
                  <Typography sx={{ color: "#c7d2fe", fontWeight: 700 }}>
                    {busyPercent}%
                  </Typography>
                </Stack>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Schedule */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <TodayIcon sx={{ color: "#8b5cf6" }} />
                  <Typography
                    variant="h6"
                    sx={{ color: "#e0e7ff", fontWeight: 700 }}
                  >
                    Today
                  </Typography>
                </Stack>
                {todaysAppts.length === 0 && (
                  <Typography sx={{ color: "rgba(224, 231, 255, 0.7)" }}>
                    No appointments for today.
                  </Typography>
                )}
                <Stack spacing={2}>
                  {todaysAppts.map((p) => (
                    <Box
                      key={p.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(99, 102, 241, 0.1)",
                        borderRadius: "12px",
                        padding: "12px 14px",
                        border: "1px solid rgba(99, 102, 241, 0.2)",
                      }}
                    >
                      <Box>
                        <Typography sx={{ color: "#e0e7ff", fontWeight: 700 }}>
                          {p.name}
                        </Typography>
                        <Chip
                          label={`ID: ${p.id}`}
                          size="small"
                          sx={{
                            mt: 1,
                            background: "rgba(99, 102, 241, 0.2)",
                            color: "#c7d2fe",
                          }}
                        />
                      </Box>
                      <StyledButton
                        onClick={() => markDone(p.id)}
                        disabled={p.done}
                      >
                        {p.done ? "Done" : "Mark Done"}
                      </StyledButton>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <EventIcon sx={{ color: "#22d3ee" }} />
                  <Typography
                    variant="h6"
                    sx={{ color: "#e0e7ff", fontWeight: 700 }}
                  >
                    Tomorrow
                  </Typography>
                </Stack>
                {tomorrowAppts.length === 0 && (
                  <Typography sx={{ color: "rgba(224, 231, 255, 0.7)" }}>
                    No appointments for tomorrow.
                  </Typography>
                )}
                <Stack spacing={2}>
                  {tomorrowAppts.map((p) => (
                    <Box
                      key={p.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(34, 211, 238, 0.08)",
                        borderRadius: "12px",
                        padding: "12px 14px",
                        border: "1px solid rgba(34, 211, 238, 0.2)",
                      }}
                    >
                      <Box>
                        <Typography sx={{ color: "#e0e7ff", fontWeight: 700 }}>
                          {p.name}
                        </Typography>
                        <Chip
                          label={`ID: ${p.id}`}
                          size="small"
                          sx={{
                            mt: 1,
                            background: "rgba(34, 211, 238, 0.15)",
                            color: "#a5f3fc",
                          }}
                        />
                      </Box>
                      <StyledButton
                        onClick={() => markDone(p.id)}
                        disabled={p.done}
                      >
                        {p.done ? "Done" : "Mark Done"}
                      </StyledButton>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* All Patients Table */}
        <StyledCard>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#e0e7ff", fontWeight: 700, mb: 2 }}
            >
              All Patients
            </Typography>
            <Box sx={{ height: 420, borderRadius: "12px", overflow: "hidden" }}>
              <StyledDataGrid
                rows={allPatients}
                getRowId={(r) => r.id}
                columns={patientColumns}
              />
            </Box>
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
