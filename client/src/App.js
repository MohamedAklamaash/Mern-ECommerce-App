import React from 'react';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/store';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

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
          </Routes>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App