import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import orderService from "./checkOutService"

const getShippingFromStorage= localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : null
const getPaymentFromStorage= localStorage.getItem('payment') ? JSON.parse(localStorage.getItem('payment')) : null

const initialState={
  shipping: getShippingFromStorage,
  payment: getPaymentFromStorage,
  order: {},
  isLoading:false,
  isError:false,
  isSuccess:false,
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

export const submitOrder = createAsyncThunk(
  'order/order',
  async(data, thunkAPI) =>{
    try{
      const token= thunkAPI.getState().auth.user.token
      return await orderService.sendOrder(data, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getResultOrder= createAsyncThunk(
  'order/get-result-order',
  async(id, thunkAPI) =>{
    try{
      const token= thunkAPI.getState().auth.user.token
      return await orderService.getOrder(id, token)
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
    reset:(state, action) => initialState,
    resetOrder:(state, action) =>{
      state.order={}
      state.shipping=null
      state.payment=null
    }
  },
  extraReducers:(builder) =>{

    //Shipping
    builder.addCase(submitShipping.pending, (state, action) =>{
      state.isLoading=true
    })
    builder.addCase(submitShipping.fulfilled, (state, action) =>{
      state.isLoading=false
      state.shipping= action.payload
    })
    //Payment
    builder.addCase(submitPayment.fulfilled, (state, action) =>{
      state.payment= action.payload
    })
    //Order
    builder.addCase(submitOrder.pending, (state, action) =>{
      state.isLoading=true
    })
    builder.addCase(submitOrder.fulfilled, (state, action) =>{
      state.isLoading=false
      state.order= action.payload.data
      state.isSuccess=true
    })
    builder.addCase(submitOrder.rejected, (state, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message=action.payload
    })
    //Get Order
    builder.addCase(getResultOrder.pending, (state, action) =>{
      state.isLoading=true
    })
    builder.addCase(getResultOrder.fulfilled, (state, action) =>{
      state.isLoading=true
      state.order= action.payload.data
      state.isSuccess= true
    })
    builder.addCase(getResultOrder.rejected, (state, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })
  }
})

export const {reset, resetOrder} = orderSlice.actions
export default orderSlice.reducer