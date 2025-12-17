import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  color: "#ffffff",
  borderRadius: 12,
  padding: "10px 18px",
  fontWeight: 700,
  textTransform: "none",
  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.35)",
  transition: "all 0.2s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
}));

export default function PatientForm({ onSubmit }) {
  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowStr = (() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split("T")[0];
  })();

  const [patient, setPatient] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    symptoms: "",
    doctorId: "",
    date: todayStr,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...patient,
      age: patient.age ? Number(patient.age) : null,
      date: patient.date || todayStr,
    });

    // Optional: reset form
    setPatient({
      id: "",
      name: "",
      age: "",
      gender: "",
      symptoms: "",
      doctorId: "",
      date: todayStr,
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="titleLarge" gutterBottom>
          Register Patient
        </Typography>

        <TextField
          label="Patient ID"
          name="id"
          value={patient.id}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <TextField
          label="Name"
          name="name"
          value={patient.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <TextField
          label="Age"
          name="age"
          type="number"
          value={patient.age}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Gender"
          name="gender"
          select
          value={patient.gender}
          onChange={handleChange}
          fullWidth
          margin="dense"
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          label="Symptoms"
          name="symptoms"
          value={patient.symptoms}
          onChange={handleChange}
          fullWidth
          margin="dense"
          multiline
          rows={3}
        />

        <TextField
          label="Doctor ID"
          name="doctorId"
          value={patient.doctorId}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <TextField
          select
          label="Visit Date"
          name="date"
          value={patient.date}
          onChange={handleChange}
          fullWidth
          margin="dense"
          helperText="Choose today or tomorrow"
        >
          <MenuItem value={todayStr}>Today ({todayStr})</MenuItem>
          <MenuItem value={tomorrowStr}>Tomorrow ({tomorrowStr})</MenuItem>
        </TextField>

        <StyledButton
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={!patient.id || !patient.name || !patient.doctorId}
        >
          Register
        </StyledButton>
      </CardContent>
    </Card>
  );
}
