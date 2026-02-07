import './App.css'
import Login from './AuthPages/Login'
import Signup from './AuthPages/Signup'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShopkeeperWrapper from './Components/ShopkeeperWrapper';
import Edit from './Components/Edit';
import AddListing from './Components/AddListing';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to='/login' replace></Navigate>}></Route>
          <Route path="/Login" element={<Login ></Login>}></Route>
          <Route path="/Signup" element={<Signup ></Signup>}></Route>
          <Route path="/ShopkeeperWrapper" element={<ShopkeeperWrapper></ShopkeeperWrapper>}></Route>
          <Route path="/marketItems/itemListing" element={<AddListing></AddListing>}></Route>
          <Route path="/marketItems/EditPrice/:id" element={<Edit></Edit>}></Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App;
