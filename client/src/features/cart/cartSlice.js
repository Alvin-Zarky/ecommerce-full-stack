import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import cartService from "./cartService"

const initialState={
  cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  isLoading:false,
  isSuccess:false,
  isError:false,
  message: ''
}

export const addToCart= createAsyncThunk(
  'cart/add-to-cart',
  async(data, thunkAPI) =>{
    try{
      return await cartService.addProductToCart(data)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const removeFromCart= createAsyncThunk(
  'cart/remove-from-cart',
  async(data, thunkAPI) =>{
    try{
      return await cartService.removeProductFromCart(data)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const cartSlice= createSlice({
  name:'cart',
  initialState,
  reducers:{
    reset:(state, action) => initialState,
    resetCart:(state, action) =>{
      state.cartItems=[]
    }
  },
  extraReducers:(builder) =>{
    
    builder.addCase(addToCart.fulfilled, (state, action) =>{
      const item= action.payload
      const existItem= state.cartItems.find(val => val._id === item._id)
      if(existItem){
        return{
          ...state, 
          cartItems: state.cartItems.map(val => val._id === existItem._id ? item : 
          val)
        }
      }else{
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    })
    builder.addCase(addToCart.rejected, (state, action) =>{
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(removeFromCart.fulfilled, (state, action) =>{
      state.cartItems= state.cartItems.filter(val => val._id !== action.payload.data._id)
    })
    builder.addCase(removeFromCart.rejected, (state, action) =>{
      state.isError=true
      state.message=action.payload
    })

  }
})

export const {reset, resetCart} = cartSlice.actions
export default cartSlice.reducer

