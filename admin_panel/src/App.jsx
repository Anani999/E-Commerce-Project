import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from './context/authSlice'

import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'
import LoadingComp from './components/Loading.jsx'

function Main(){

 const dispatch = useDispatch();
 const {user, isAuthenticated, loading, error} = useSelector((state) => state.auth)

 useEffect(() => {
  dispatch(checkAuth());
 },[]);

 if(isAuthenticated == true){
   return( <DashboardPage />);
 } else if (loading == true) {

  return <LoadingComp/>
 } else {

  return <LoginPage error={error} />
 }
}

export default Main;
