import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import orderService from "./orderService"

const initialState={
  orders:[],
  isLoading: false,
  isSuccess:false,
  isError:false,
  message: ''
}

export const getDataOrders= createAsyncThunk(
  'admin-order/getAllOrders',
  async(data, thunkAPI) =>{
    try{
      const token= thunkAPI.getState().auth.user.token
      return await orderService.getDataOrder(data, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const markOrderDeliver =createAsyncThunk(
  'admin-order/mark-deliver',
  async(id, thunkAPI) =>{
    try{
      const token= thunkAPI.getState().auth.user.token
      return await orderService.deliverOrder(id, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const adminOrderSlice= createSlice({
  name: 'admin-order',
  initialState,
  reducers:{
    reset:(state, action) => initialState,
  },
  extraReducers: (builder) =>{

    builder.addCase(getDataOrders.pending, (state, action) =>{
      state.isLoading=true
    })
    builder.addCase(getDataOrders.fulfilled, (state, action) =>{
      state.isLoading=false
      state.isError=false
      state.orders = action.payload
    })
    builder.addCase(getDataOrders.rejected, (state, action) =>{
      state.isLoading=false
      state.isError=true
      state.message= action.payload
    })
    
    builder.addCase(markOrderDeliver.pending, (state, action) =>{
      state.isLoading=true
    })
    builder.addCase(markOrderDeliver.fulfilled, (state, action) =>{
      state.isLoading=false
      state.isSuccess=true
    })
    builder.addCase(markOrderDeliver.rejected, (state, action) =>{
      state.isLoading=false
      state.isError=true
      state.message=action.payload
      state.isSuccess=false
    })
  }
})

export const {reset} = adminOrderSlice.actions
export default adminOrderSlice.reducer