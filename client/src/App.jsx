import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import ContractsPage from "./pages/ContractsPage";
import LoginPage from "./pages/LoginPage";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    // <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/contracts" element={<ProtectedRoute><ContractsPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/contracts" />} /> */}
        </Routes>
      </Router>
    // </AuthProvider>
  );
};

export default App;
