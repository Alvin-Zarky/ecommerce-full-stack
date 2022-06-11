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
  isPaid:false,
  isSuccess:false,
  message:'',
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

export const orderPayUser = createAsyncThunk(
  'order/order-pay',
  async(data, thunkAPI) =>{
    try{
      const token= thunkAPI.getState().auth.user.token
      return await orderService.orderPay(data, token)
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
      state.isPaid=false
    },
    resetOrderItem: (state, action) =>{
      state.order={}
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
      state.isPaid=false
    })
    builder.addCase(getResultOrder.fulfilled, (state, action) =>{
      state.isLoading=true
      state.order= action.payload.data
      // state.isPaid= action.payload.data.isPaid
    })
    builder.addCase(getResultOrder.rejected, (state, action) =>{
      state.isLoading=false
      state.isError=true
      state.isPaid=false
      state.message= action.payload
    })
    //User order paid
    builder.addCase(orderPayUser.pending, (state, action) =>{
      state.isLoading=true
      state.isSuccess=false
      state.isPaid=false
    })
    builder.addCase(orderPayUser.fulfilled, (state, action) =>{
      state.isLoading=false
      state.order= action.payload.data
      state.isSuccess=true
      state.isPaid= true
    })
    builder.addCase(orderPayUser.rejected, (state, action) =>{
      state.isLoading=false
      state.isPaid=false
      state.isError=true
      state.isSuccess=false
      state.message = action.payload
    })
    
  }
})

export const {reset, resetOrder, resetOrderItem} = orderSlice.actions
export default orderSlice.reducer