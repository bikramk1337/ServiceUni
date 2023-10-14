import React from 'react';
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
import Library from './components/library/Library';
import PendingApplications from './components/parking/PendingApplications';
import ActivePermits from './components/parking/ActivePermits';
import { useAuth } from './components/AuthContext';  

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/sign-in" />} />
          <Route path="/id-card" element={<IdCard />} />
          <Route path="/parking-permit" element={<ParkingPermit />} />
          <Route path="/library" element={<Library />} />
          <Route path="/sign-in" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/thanks" element={<ApplicationSubmitted />} />
          <Route path="/error" element={<Error />} />
          <Route path="/pending-applications" element={<PendingApplications />} />
          <Route path="/active-permits" element={<ActivePermits />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
