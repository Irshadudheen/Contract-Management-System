import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
import ContractsPage from "./pages/ContractsPage";
import LoginPage from "./pages/LoginPage";
import Header from './components/header/Header';

import useGetUserData from "./hooks/useGetUser"; 
import { useEffect, useState } from "react";
import CreatContract from "./components/contract/createContract";
import DetailView from "./components/contract/contractDetails";

const App = () => {
  const currentUser = useGetUserData()
console.log(currentUser,'the current user from redux')

  const [isAuthenticated, isUserAuthenticated] = useState(currentUser.name ? true : false);

  const PrivateRoute = ({ isAuthenticated, children }) => {
  
    return isAuthenticated ?  (
      <>
        <Header />
      {children}
    </>
       
     
    ) : (
      <Navigate replace to="/login" />
    );
  };
  useEffect(() => {
    if(currentUser.name){
      console.log('hai')
      isUserAuthenticated(true)
    }
  }, [isAuthenticated]);
  return (
    // <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
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
       
        </Routes>
      </Router>
    // </AuthProvider>
  );
};

export default App;
