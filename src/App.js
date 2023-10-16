import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './components/Layout/Navbar';
import Register from './components/auth/Register';
import Auth from './components/auth/Auth';
import Dashboard from './pages/protected/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import Request from './components/Request';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/auth/login' element={<Auth />} />
        <Route exact path='/auth/register' element={<Register />} />
        <Route exact path='/request' element={<Request />} />
        <Route
          exact
          path='/protected/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
