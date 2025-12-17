import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RegistrarDashboard from "./pages/registrar/RegistrarDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import IPDDashboard from "./pages/ipd/IPDDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/registrar" element={<RegistrarDashboard />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/ipd" element={<IPDDashboard />} />
    </Routes>
  );
}
