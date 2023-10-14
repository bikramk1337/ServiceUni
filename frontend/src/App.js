import './App.css'
import Home from './components/Home'
import IdCard from './components/id-card/IdCard'
import ParkingPermit from './components/parking/ParkingPermit'
import { Route, Routes} from "react-router"
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Login from './components/Login'
import ApplicationSubmitted from './components/parking/ApplicationSubmitted'
import Error from './components/Error'
import Library from './components/library/Library'
import PendingApplications from './components/parking/PendingApplications'
import ActivePermits from './components/parking/ActivePermits'

function App() {
  return (
    <div className="App">
        <Navigation />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/id-card" Component={IdCard} />
          <Route exact path="/parking-permit" Component={ParkingPermit} />
          <Route exact path="/library" Component={Library} />
          <Route exact path="/sign-in" Component={Login} />
          <Route exact path="/thanks" Component={ApplicationSubmitted} />
          <Route exact path='/error' Component={Error} />
          <Route exact path='/pending-applications' Component={PendingApplications} />
          <Route exact path='/active-permits' Component={ActivePermits} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App