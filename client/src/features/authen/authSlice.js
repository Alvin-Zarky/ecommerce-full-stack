import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authService } from "./authService"

const initialState={
  user:JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null,
  isLoading:false,
  isError:false,
  isSucceed:false,
  message: ''
}

export const doSignUp = createAsyncThunk(
  'auth-signUp',
  async(data, thunkAPI) =>{
    try{
      return await authService.signUp(data)
    }catch(err){
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const doSignIn = createAsyncThunk(
  'auth-signIn',
  async(data, thunkAPI) =>{
    try{
      return await authService.signIn(data)
    }catch(err){
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const doSignOut= createAsyncThunk(
  'auth-signOut',
  async(_, thunkAPI) =>{
    return await authService.signOut()
  }
)

export const updateProfile= createAsyncThunk(
  'auth-updateUser',
  async(data, thunkAPI) =>{
    try{
      const token= thunkAPI.getState().auth.user.token
      return await authService.updateUserProfile(data, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const authSlice= createSlice({
  name: 'auth',
  initialState,
  reducers:{
    reset: (state, action) => initialState,
    resetMessage: (state, action) =>{
      state.isSucceed=false
      state.message=''
    }
  },
  extraReducers: (builder) =>{

    //Sign Up
    builder.addCase(doSignUp.pending, (state, action) =>{
      state.isLoading=true
      state.isError=false  
    })
    builder.addCase(doSignUp.fulfilled, (state, action) =>{
      state.isLoading=false
      state.user= action.payload.data
      state.isError=false
    })
    builder.addCase(doSignUp.rejected, (state, action) =>{
      state.isLoading=false
      state.isError=true
      state.message= action.payload
    })

    //Sign In
    builder.addCase(doSignIn.pending, (state, action) =>{
      state.isLoading=true
      state.isError=false
    })
    builder.addCase(doSignIn.fulfilled, (state, action) =>{
      state.isLoading=false
      state.user=action.payload.data
      state.isError=false
    })
    builder.addCase(doSignIn.rejected, (state, action) =>{
      state.isLoading=false
      state.isError=true
      state.message= action.payload
    })

    //Sign Out
    builder.addCase(doSignOut.pending, (state, action) =>{
      state.isLoading=true
    })
    builder.addCase(doSignOut.fulfilled, (state, action) =>{
      state.isLoading=false
      state.user= null
      state.isError=false
    })

    //Update user profile
    builder.addCase(updateProfile.pending, (state, action) =>{
      state.isLoading=true
      state.isError= false
      state.message=''
      state.isSucceed=false
    })
    builder.addCase(updateProfile.fulfilled, (state, action) =>{
      state.isLoading=false
      state.isSucceed=true
      state.isError= false
      state.message=''
    })
    builder.addCase(updateProfile.rejected, (state, action) =>{
      state.isLoading=false
      state.isError=true
      state.isSucceed=false
      state.message= action.payload
    })

  }
})

export const { reset, resetMessage } = authSlice.actions
export default authSlice.reducer