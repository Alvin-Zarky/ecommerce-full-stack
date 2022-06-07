import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import userService from "./adminService"

const initialState={
  users:{},
  user:{},
  isLoading: false,
  isSuccess:false,
  isError:false,
  message: ''
}

export const getDataUsers= createAsyncThunk(
  'admin/getUsers',
  async(data, thunkAPI) =>{
    try{
      const token= thunkAPI.getState().auth.user.token
      return await userService.getData(data, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getDataUsersDetail= createAsyncThunk(
  'admin/getUsersDetail',
  async(id, thunkAPI) =>{
    try{
      const token= thunkAPI.getState().auth.user.token
      return await userService.getDataDetail(id, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateUserDetail= createAsyncThunk(
  'admin/updateUserDetail',
  async(data, thunkAPI) =>{
    try{
      const token= thunkAPI.getState().auth.user.token
      return await userService.updateDataDetail(data, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteUserDetail= createAsyncThunk(
  'admin/deleteUserDetail',
  async(data, thunkAPI) =>{
    try{
      const token= thunkAPI.getState().auth.user.token
      return await userService.deleteDataDetail(data, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const adminSlice= createSlice({
  name: 'admin',
  initialState,
  reducers:{
    reset:(state, action) => initialState,
  },
  extraReducers: (builder) =>{

    builder.addCase(getDataUsers.pending, (state, action) =>{
      state.isLoading=true
    })
    builder.addCase(getDataUsers.fulfilled, (state, action) =>{
      state.isLoading=false
      state.isSuccess=true
      state.isError=false
      state.users= action.payload
    })
    builder.addCase(getDataUsers.rejected, (state, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(getDataUsersDetail.fulfilled, (state, action) =>{
      state.isSuccess=true
      state.user= action.payload
      state.isError=false
    })
    builder.addCase(getDataUsersDetail.rejected, (state, action) =>{
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(updateUserDetail.pending, (state, action) =>{
      state.isLoading= true
      state.isSuccess=false
    })
    builder.addCase(updateUserDetail.fulfilled, (state, action) =>{
      state.isLoading=false
      state.isSuccess=true
      state.user= action.payload
      state.isError=false
    })
    builder.addCase(updateUserDetail.rejected, (state, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(deleteUserDetail.fulfilled, (state, action) =>{
      state.isLoading=false
      state.isSuccess=true
      state.users.data = state.users.data.filter(val =>{
        return val._id !== action.payload.data._id
      })
      state.isError=false
    })
    builder.addCase(deleteUserDetail.rejected, (state, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })
  }
})

export const {reset} = adminSlice.actions
export default adminSlice.reducer