import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";

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

export default function UserModal({ open, onClose, onSave }) {
  const initialState = {
    name: "",
    email: "",
    password: "",
    id: "",
    role: "",
    gender: "",
  };

  const [form, setForm] = useState(initialState);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setForm(initialState);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Register New User</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <TextField
          label="User ID"
          name="id"
          value={form.id}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <TextField
          select
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        >
          <MenuItem value="">Select role</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Doctor">Doctor</MenuItem>
          <MenuItem value="Registrar">Registrar</MenuItem>
          <MenuItem value="IPD">IPD</MenuItem>
        </TextField>

        <TextField
          select
          label="Gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        >
          <MenuItem value="">Select gender</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          color="inherit"
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <StyledButton
          onClick={handleSave}
          variant="contained"
          disabled={
            !form.name ||
            !form.email ||
            !form.password ||
            !form.id ||
            !form.role ||
            !form.gender
          }
        >
          Save
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}
