import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
import ContractsPage from "./pages/ContractsPage";
import LoginPage from "./pages/LoginPage";
import Header from './components/header/Header';

import useGetUserData from "./hooks/useGetUser"; 
import { useEffect, useState } from "react";
import CreatContract from "./components/contract/createContract";
import DetailView from "./components/contract/contractDetails";
import Update from "./components/contract/updateContract";

const App = () => {
  const currentUser = useGetUserData();
  console.log(currentUser, 'the current user from redux');

  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser.token);

  const PrivateRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? (
      <>
        <Header />
        {children}
      </>
    ) : (
      <Navigate replace to="/login" />
    );
  };

  useEffect(() => {
    if (currentUser.token || currentUser.name) {
      console.log('User authenticated');
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  // Redirect authenticated users away from login page
  const AuthRoute = ({ children }) => {
    return !isAuthenticated ? children : <Navigate replace to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          } 
        />
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ContractsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CreatContract />
            </PrivateRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <DetailView />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Update />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;