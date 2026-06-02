import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiRequest} from '../utils/api.js'

const initialState = {
 loading: false,
 user: null,
 error: '',
 isAuthenticated: false
};


export const loginUser = createAsyncThunk (
 'auth/loginUser',
 async ({ username, password, token }, thunkAPI) => {
  try{

   const response = await apiRequest(
    'POST',
    '/api/auth/login',
    {'Content-Type': 'application/json'},
    { username, password, token  }
   );

   if (response.success !== true){
    return thunkAPI.rejectWithValue(response.message);
   }
   return response.data.user;
  } catch (err) {
   return thunkAPI.rejectWithValue(err.message);
  }
 }
);


export const checkAuth = createAsyncThunk(
 'auth/checkAuth',
 async (_, thunkAPI) => {
 try{
  const response = await apiRequest('GET', '/api/user');
  if (response.success !== true) {
   return thunkAPI.rejectWithValue(response.message);
  }
  return response.data.user;
 } catch (err) {
  return thunkAPI.rejectWithValue(err.message);
 }
 }
);


const authSlice = createSlice({

 name: 'auth',

 initialState,

 reducers: {
  logout: (state) => {
   state.user = null;
   state.isAuthenticated = false;
  }
 },

 extraReducers: (builder) => {
  builder
  .addCase(checkAuth.pending, (state) => {
   state.loading = true;
  })
  .addCase(checkAuth.fulfilled, (state, action) => {
   state.loading = false;
   state.user = action.payload;
   state.isAuthenticated = true;
  })
  .addCase (checkAuth.rejected, (state, action) => {
   state.loading = false;
   state.error = action.payload;
  })
  // loginUser
  .addCase (loginUser.pending, (state) => {
   state.loading = true;
  })
  .addCase (loginUser.fulfilled, (state, action) => {
   state.loading = false;
   state.isAuthenticated = true;
   state.user = action.payload
  })
  .addCase (loginUser.rejected, (state, action) => {
   state.loading = false;
   state.error = action.payload;
  })
 }

});


export const {logout} = authSlice.actions;
export default authSlice.reducer;
