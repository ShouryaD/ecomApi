import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Navbar from './components/Navbar';
import Pnf from './pages/Pnf';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';
import Practice from './pages/Practice';
import ViewProduct from './pages/ViewProduct';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './context/UserContext';



function App() {
  // let [arr, setArr] = useState([])
  let login = useContext(UserContext).user.login
  return (
    <div className="App">
      <BrowserRouter>
        <div style={{marginBottom:"70px"}}>
        <Navbar />
        </div>
        <Routes>

          <Route path='/' element={login?<Practice />: <Navigate to='/login'/>} />
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/cart' element={login ? <Cart />:<Navigate to='/login'/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={!login? <Login /> :<Navigate to='/'/>} />
          <Route path='/about' element={<About />} />
          <Route path='/view' element={<ViewProduct />} />
          <Route path='/*' element={<Pnf />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
