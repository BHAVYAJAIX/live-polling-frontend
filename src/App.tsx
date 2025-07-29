import Home from "./pages/home"
import AdminLogin from "./pages/AdminLogin"
import Dashboard from "./pages/Dashboard"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
