import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import Navbar from "../../components/Navbar";
import PatientForm from "../../components/PatientForm";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  color: "#ffffff",
  borderRadius: "12px",
  textTransform: "none",
  fontWeight: 700,
  padding: "10px 18px",
  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.35)",
  transition: "all 0.25s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    transform: "translateY(-2px)",
  },
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-root": {
    background: "rgba(142, 147, 172, 0.4)",
    border: "1px solid rgba(99, 102, 241, 0.25)",
    borderRadius: "12px",
    color: "#0f172a",
  },
  "& .MuiDataGrid-cell": {
    borderColor: "rgba(99, 102, 241, 0.15)",
    color: "#0f172a",
    fontWeight: 600,
    background: "rgba(142, 147, 172, 0.4)",
  },
  "& .MuiDataGrid-columnHeader": {
    background: "rgba(142, 147, 172, 0.4)",
    borderColor: "rgba(99, 102, 241, 0.3)",
    color: "#111827",
    fontWeight: 700,
  },
  "& .MuiDataGrid-virtualScroller": {
    background: "rgba(142, 147, 172, 0.4)",
  },
  "& .MuiDataGrid-footerContainer": {
    background: "rgba(142, 147, 172, 0.4)",
  },
  "& .MuiDataGrid-row:hover": {
    background: "rgba(99, 102, 241, 0.18) !important",
  },
}));

export default function RegistrarDashboard() {
  const [patients, setPatients] = useState([]);
  const totalPatients = patients.length;
  const uniqueSymptoms = useMemo(
    () => new Set(patients.map((p) => p.symptoms || "")).size,
    [patients]
  );
  const doctorSchedule = [
    { doctorId: "DOC01", patients: 5 },
    { doctorId: "DOC02", patients: 3 },
    { doctorId: "DOC03", patients: 7 },
  ];
  const maxDoctorPatients = Math.max(
    ...doctorSchedule.map((d) => d.patients),
    1
  );

  useEffect(() => {
    fetch(`${API}/patients`)
      .then((res) => res.json())
      .then(setPatients);
  }, []);

  const addPatient = (patient) => {
    const payload = {
      ...patient,
      age: patient.age ?? null,
      date: patient.date,
    };

    fetch(`${API}/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => setPatients((prev) => [...prev, payload]));
  };

  return (
    <GradientBackground>
      <Navbar title="Registrar Dashboard" />
      <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <AssignmentIcon
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
              Patient Intake
            </Typography>
            <Typography sx={{ color: "rgba(224, 231, 255, 0.65)" }}>
              Register and track incoming patients
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
                  {totalPatients}
                </Typography>
                <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                  Patients
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
                  {uniqueSymptoms}
                </Typography>
                <Typography sx={{ color: "rgba(224, 231, 255, 0.7)", mt: 1 }}>
                  Symptom Types
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Doctor Load Bar Chart (placeholder data) */}
        <StyledCard sx={{ mb: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#e0e7ff", fontWeight: 700, mb: 2 }}
            >
              Daily Doctor Schedule
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 3,
                height: 200,
                px: 1,
              }}
            >
              {doctorSchedule.map((d) => (
                <Box key={d.doctorId} sx={{ flex: 1, textAlign: "center" }}>
                  <Box
                    sx={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      borderRadius: "10px 10px 4px 4px",
                      height: `${(d.patients / maxDoctorPatients) * 140}px`,
                      minHeight: 12,
                      boxShadow: "0 8px 18px rgba(99, 102, 241, 0.35)",
                      transition: "all 0.2s ease",
                    }}
                  />
                  <Typography sx={{ color: "#c7d2fe", mt: 1, fontWeight: 700 }}>
                    {d.doctorId}
                  </Typography>
                  <Typography
                    sx={{ color: "rgba(224, 231, 255, 0.7)", fontSize: 13 }}
                  >
                    {d.patients} patients
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </StyledCard>

        {/* Form */}
        <StyledCard sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <PersonAddAltIcon sx={{ color: "#8b5cf6" }} />
              <Typography
                variant="h6"
                sx={{ color: "#e0e7ff", fontWeight: 700 }}
              >
                Register New Patient
              </Typography>
            </Box>
            <PatientForm onSubmit={addPatient} />
          </CardContent>
        </StyledCard>

        {/* Table */}
        <StyledCard>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#e0e7ff", fontWeight: 700, mb: 2 }}
            >
              Patient List
            </Typography>
            <Box sx={{ height: 400, borderRadius: "12px", overflow: "hidden" }}>
              <StyledDataGrid
                rows={patients}
                getRowId={(r) => r.id}
                columns={[
                  { field: "id", headerName: "Patient ID", flex: 0.7 },
                  { field: "name", headerName: "Name", flex: 1 },
                  { field: "age", headerName: "Age", flex: 0.4 },
                  { field: "gender", headerName: "Gender", flex: 0.6 },
                  { field: "symptoms", headerName: "Symptoms", flex: 1.2 },
                  {
                    field: "doctorId",
                    headerName: "Doctor ID",
                    flex: 0.8,
                    renderCell: (params) => {
                      const val =
                        params.row?.doctorId ??
                        params.row?.doctor_id ??
                        params.row?.doctorid ??
                        params.value;
                      return val || "N/A";
                    },
                  },
                  { field: "date", headerName: "Date", flex: 0.8 },
                ]}
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
