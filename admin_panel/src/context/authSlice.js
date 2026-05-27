import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { devLog } from '../utils/env.js'
import sleep from '../utils/sleep'

const initialState = {
 user: null,
 loading: false,
 error: null,
 isAuthenticated: false
};

const base_url = 'http://localhost:5000';

async function isValidToken() {
 const response = await fetch(base_url+'/api/user', {
  credentials: 'include',
 });
 
 const result = await response.json();
 if(result.success !== true){
  return false;
 }
 
 return result;
}

export const checkAuth =  createAsyncThunk(
 'auth/checkAuth',
 async(_, thunkAPI ) => {
 try{
 
  const isValid = await isValidToken();
  if(!isValid){
   return thunkAPI.rejectWithValue('Session Expired!, Login again');
  }

  devLog('Check Auth found User : '+JSON.stringify(isValid.data.user));
 
  return isValid.data.user
 } catch(err){
  console.error('Error while Checking Auth : ',err.message);
  return thunkAPI.rejectWithValue(err.message);
 }
 }
);

export const loginUser = createAsyncThunk(
 'auth/loginUser',
 async ({username, password}, thunkAPI) => {
 
 try{
  const body =  JSON.stringify({ username: username, password: password });
  const response = await fetch(base_url+'/api/auth/login', {
   headers: { 'Content-Type': 'application/json' },
   credentials: 'include',
   method: 'POST',
   body: body
  });
  const result = await response.json();

  if(result.success !== true){
   devLog('Login Failed Incorrect Credentials')
   return thunkAPI.rejectWithValue('Invalid Credentials');
  }

  devLog('User in response : '+ JSON.stringify(result.data.user));
 
  return result.data.user;

 } catch(err) {
  console.error("Error while Login : ",err.message);
  return thunkAPI.rejectWithValue(err.message);
 }

 }
);

const authSlice = createSlice({
 name: 'auth',
 initialState,
 reducers: {
  logout: function(state){
   state.user = null;
   state.isAuthenticated = false;
   localStorage.removeItem('token');
   devLog('user logout triggered!');
  }
 },
 extraReducers: (builder) => {
  builder
   // checkAuth
   .addCase(checkAuth.pending, (state) => {
    state.loading = true;
   })
   .addCase(checkAuth.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
   })
   .addCase(checkAuth.rejected, (state, action) => {
   state.loading = false;
   state.error = action.payload;
   state.user = null;
   state.isAuthenticated = false;
  })
   // loginUser
   .addCase(loginUser.pending, (state) => {
    state.loading = true;
    state.error = '';
   })
   .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
   })
   .addCase(loginUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
   })
 }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
