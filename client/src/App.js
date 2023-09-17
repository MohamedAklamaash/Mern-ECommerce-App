import React from 'react';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/store';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SingleProductPage from './pages/SingleProductPage';
import CartPage from './utils/CartPage';
import AboutUs from './utils/AboutUs';
import Contact from './utils/Contact';

const App = () => {
  return (
    <div >
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route element={<Home/>} path="/" />
            <Route element={<LoginPage/>} path='/login'/>
            <Route element={<SignUpPage/>} path='/signup'/>
            <Route element={<SingleProductPage/>} path='/product/:id'/>
            <Route element={<CartPage/>} path="/cart"/>
            <Route element={<AboutUs/>} path='/aboutUs'/>
            <Route element={<Contact/>} path='/contact'/>
          </Routes>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App