import { logout } from '../context/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {  BrowserRouter, Routes, Route } from 'react-router-dom';

import Button from '../components/Button'
import Chart from '../components/dashboard/Chart'
import Manage from '../components/dashboard/Manage'
import Settings from '../components/dashboard/Settings'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import ManageProducts from '../components/ManageProducts'
import CreateProduct from '../components/CreateProduct'
import UpdateProduct from '../components/UpdateProduct'
import OrdersPage from './Orders'
import OrderPage from './Order'

function Dashboard(){

 const dispatch = useDispatch();
 const [ barTogle, setBarTogle ] = useState(false);
 const user = useSelector((state) => state.auth.user );

 function handleLogout(){
  dispatch(logout());
 }

 function tapBarTogle(){
  if(barTogle){ setBarTogle(false) }
  else { setBarTogle(true) };
 }
 
 return (
  <div className='flex'>
    <div> {barTogle && <Sidebar/> } </div>

    <div className='w-[100%] flex gap-7 flex-wrap items-start justify-center'> 

 <Navbar barTogle={tapBarTogle} user={user} handleLogout={handleLogout}/>
  <BrowserRouter>
   <Routes>
    <Route index element={<DHome/>} />
    <Route path='/orders' element={<OrdersPage/>} />
    <Route path='/order/:id' element={<OrderPage/>} />
   </Routes>
  </BrowserRouter>
    </div>

  </div>
)

}

function DHome() {
return(
<>
  < ManageProducts />
  < CreateProduct />
</>
)
}
export default Dashboard;

