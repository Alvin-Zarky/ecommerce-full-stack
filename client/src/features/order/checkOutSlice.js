import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import orderService from "./checkOutService"

const getShippingFromStorage= localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : null
const getPaymentFromStorage= localStorage.getItem('payment') ? JSON.parse(localStorage.getItem('payment')) : null

const initialState={
  shipping: getShippingFromStorage,
  payment: getPaymentFromStorage,
  isLoading:false,
  isError:false,
  message:''
}

export const submitShipping= createAsyncThunk(
  'order/shipping',
  async(data, thunkAPI) =>{
    try{
      return await orderService.sendShipping(data)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const submitPayment= createAsyncThunk(
  'order/payment',
  async(data, thunkAPI) =>{
    try{
      return await orderService.sendPayment(data)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


const orderSlice= createSlice({
  name:'order',
  initialState,
  reducers:{
    reset:(state, action) => initialState
  },
  extraReducers:(builder) =>{

    builder.addCase(submitShipping.pending, (state, action) =>{
      state.isLoading=true
    })
    builder.addCase(submitShipping.fulfilled, (state, action) =>{
      state.isLoading=false
      state.shipping= action.payload
    })

    builder.addCase(submitPayment.fulfilled, (state, action) =>{
      state.payment= action.payload
    })

  }
})

export const {reset} = orderSlice.actions
export default orderSlice.reducer