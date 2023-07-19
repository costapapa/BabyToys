import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import ToysMapPage from '../ToysMapPage/ToysMapPage';
import UploadToyPage from '../UploadToypage/UploadToypage';
import NavBar from '../../components/NavBar/NavBar'
import AvailableToys from '../AvailableToys/AvailableToys';
import RequestsPage from '../RequestsPage/RequestsPage'
import Homepage from '../Homepage/Homepage'

export default function App() {
  const [user, setUser] = useState(getUser())
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname === '/') {
      navigate('/availabletoys');
    }
  }, [user, location, navigate]);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/toysmap" element={<ToysMapPage />} />
            <Route path="/requests" element={<RequestsPage user={user} />} />
            <Route path="/uploadtoy" element={<UploadToyPage />} />
            <Route path="/availabletoys" element={<AvailableToys user={user} />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}






