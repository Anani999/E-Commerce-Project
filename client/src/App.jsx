import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from './context/authSlice'
import { useNavigate, Navigate, Outlet, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import HomePage from './pages/Home'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import UserAccount from './pages/UserAccount'
import UserOrders from './pages/account/Orders.jsx'
import AccountPage from './pages/account/AccountPage'
import PaymentSuccess from './pages/PaymentSuccess'
import ServerDown from './pages/ServerDown'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import { apiRequest, backend_url } from './utils/api.js'
import AuthSessions from './pages/account/Sessions'
import NewPasswordForm from './pages/account/NewPasswordForm'
import PasswordRecovery from './pages/account/PasswordRecovery'
import CreateOrder from './pages/CreateOrder'
import SearchProduct from './pages/SearchResult'

function App() {

 const {isAuthenticated, loading} = useSelector((state) => state.auth);
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const notify = (message) => toast(message);
 
 const [sloading, setSLoading] = useState(true);

 useEffect(() => {
  dispatch(checkAuth());
  isServerActive();
 },[]);

 async function isServerActive(){
  try{
  const response = await apiRequest('GET', '/' );
  console.log('backend ? :',response);
  setSLoading(false)
  if(response.success === true){
   navigate('/')
  }
  } catch(err) { 
   if(err.message.includes('NetworkError')){
     console.error('Server Connection Failed');
     notify('Server was Down !');
     navigate('/server-down')
     setSLoading(false);
   }
  }
 }

 return(
    <div className=''>
    <ToastContainer/>
      <Routes>
       <Route element={<Home/>} >
        <Route path='/' element={<Products/>} />
        <Route path='/product/:id' element={<ProductPage/>} />
        <Route path='/search' element={<SearchProduct/>} /> 
        <Route path='/payment-success' element={ <PaymentSuccess/> } />
        <Route path='/server-down' element={<ServerDown/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/auth/new-password-form' element={<NewPasswordForm/>} />
        <Route path='/auth/password-recovery' element={<PasswordRecovery/>} />
        <Route element={<Protected/>} >
         <Route path='/create-order/:id' element={<CreateOrder/>} />
         <Route path='/account' element={<UserAccount/>}>
          <Route index element={<AccountPage/>} />
          <Route path='orders' element={<UserOrders/>} />
          <Route path='sessions' element={<AuthSessions/>} />
         </Route>
        </Route>
       </Route>
      </Routes>
    </div>
);

}


function Protected() {
 const { isAuthenticated } = useSelector((state) => state.auth);
 return isAuthenticated ? <Outlet/> : <Navigate to='login' />
}

function Home() {
 return(
  <>
   <Navbar/>
   <Outlet/>
  </>
 );
}

export default App
 
