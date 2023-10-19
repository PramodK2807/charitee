import { Route, Routes } from 'react-router-dom';


import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './components/Layout/Navbar';
import Register from './components/auth/Register';
import Auth from './components/auth/Auth';
import Dashboard from './pages/protected/Dashboard';
import Authentication from './utils/Authentication';
import Request from './components/Request';
import Todo from './components/Todo/Todo';
import ProductsCart from './components/Products/ProductCart/ProductsCart';
import ProductsDetails from './components/Products/ProductsDetails';
import { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/auth/login' element={<Auth />} />
        <Route exact path='/auth/register' element={<Register />} />
        <Route exact path='/request' element={<Request />} />
        <Route exact path='/todo' element={<Todo />} />
        <Route exact path='/cart' element={<ProductsCart />} />
        <Route exact path='/products/:id' element={<ProductsDetails />} />
        <Route
          exact
          path='/protected/dashboard'
          element={
            <Authentication>
              <Dashboard />
            </Authentication>
          }
        />
      </Routes>
    </>
  );
}

export default App;
