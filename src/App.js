
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './components/Layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<HomePage/>} />
        <Route exact path='/contact' element={<Contact/>} />
        <Route exact path='/auth/login' element={<Login/>} />
        <Route exact path='/auth/register' element={<Register/>} />
      </Routes>
    </>
  );
}

export default App;
