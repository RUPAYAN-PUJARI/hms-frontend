import { Card, CardContent, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledButton = styled("button")(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  color: "#ffffff",
  border: "none",
  borderRadius: 12,
  padding: "10px 16px",
  fontWeight: 700,
  cursor: "pointer",
  textTransform: "none",
  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.35)",
  transition: "all 0.2s ease",
  width: "100%",
  marginTop: 16,
  "&:hover": {
    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
}));

export default function BedAssignForm({ onAssign, loading }) {
  const [form, setForm] = useState({
    patientId: "",
    bedNo: "",
    ward: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.patientId || !form.bedNo || !form.ward) return;
    onAssign?.({ ...form });
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="titleLarge">Assign Bed</Typography>
        <TextField
          label="Patient ID"
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Bed Number"
          name="bedNo"
          value={form.bedNo}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Ward"
          name="ward"
          value={form.ward}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <StyledButton
          type="button"
          onClick={handleSubmit}
          disabled={!form.patientId || !form.bedNo || !form.ward || loading}
        >
          {loading ? "Assigning..." : "Assign"}
        </StyledButton>
      </CardContent>
    </Card>
  );
}
