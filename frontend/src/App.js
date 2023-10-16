import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import IdCard from './components/id-card/IdCard';
import ParkingPermit from './components/parking/ParkingPermit';
import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './components/Login';
import ApplicationSubmitted from './components/parking/ApplicationSubmitted';
import Error from './components/Error';
import PendingApplications from './components/parking/PendingApplications';
import ActivePermits from './components/parking/ActivePermits';
import { useAuth } from './components/AuthContext'; 
import PendingIDs from './components/id-card/PendingIDs'; 
import { isAdmin } from './components/Utils';
import Unauthorized from './components/Unauthorized';
import MyPermits from './components/parking/MyPermits';

function App() {
  const { isLoggedIn } = useAuth();

  const [isAdminUser, setIsAdmin] = useState()

  useEffect(() => {
    var admin = isAdmin();
    setIsAdmin(admin)
  }, [isLoggedIn])

  return (
    <div className="App">
      <Navigation /> 
        
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/sign-in" />} />
          <Route path="/id-card" element={!isAdminUser ? <IdCard /> : <Navigate to="/unauthorized" />} />
          <Route path="/parking-permit" element={!isAdminUser ? <ParkingPermit /> : <Navigate to="/unauthorized" />} />
          <Route path="/sign-in" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/thanks" element={<ApplicationSubmitted />} />
          <Route path="/error" element={<Error />} />
          <Route path="/pending-applications" element={<PendingApplications />} />
          <Route path="/active-permits" element={<ActivePermits />} />
          <Route path="/pending-ids" element={<PendingIDs /> } />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/my-permits" element={<MyPermits />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
