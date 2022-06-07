import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import {serviceProduct} from "./productService"

const initialState={
  products:[],
  productSlice: [],
  product:{},
  isLoading:false,
  isSuccess:false,
  isError: false,
  message:''
}

export const getProduct= createAsyncThunk(
  'product/get-product',
  async(data, thunkAPI) =>{
    try{
      return await serviceProduct.getData(data)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message ) || err.message || err.toString() 
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getProductDetail= createAsyncThunk(
  'product/get-product-detail',
  async(id, thunkAPI) =>{
    try{
      return await serviceProduct.getDataDetail(id)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getProductLatest= createAsyncThunk(
  'product/get-product-latest',
  async(_, thunkAPI) =>{
    try{
      return await serviceProduct.getProductSlice()
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const postProductReview= createAsyncThunk(
  'product/create-review',
  async(data, thunkAPI) =>{
    try{
      const token = thunkAPI.getState().auth.user.token
      return await serviceProduct.postReview(data, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const productSlice= createSlice({
  name: 'product',
  initialState,
  reducers:{
    reset: (state, action) => initialState,
    resetReview: (state, action) => {
      state.product.review= []
    },
    resetError:(state, action) =>{
      state.isError=false
      state.message=''
    }
  },
  extraReducers: (builder) =>{
    //Get product
    builder.addCase(getProduct.pending, (state, action) =>{
      state.isLoading=true;
    })

    builder.addCase(getProduct.fulfilled, (state, action) =>{
      state.isLoading=false
      state.products= action.payload
      state.isSuccess=true
    })

    builder.addCase(getProduct.rejected, (state, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    //Get product detail

    builder.addCase(getProductDetail.fulfilled, (state, action) =>{
      state.isLoading=false
      state.product= action.payload
      state.isSuccess=true
    })

    builder.addCase(getProductDetail.rejected, (state, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    //Get product latest
    
    builder.addCase(getProductLatest.fulfilled, (state, action) =>{
      state.isLoading=false
      state.productSlice= action.payload
      state.isSuccess=true
    })

    builder.addCase(getProductLatest.rejected, (state, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    //Review product
    builder.addCase(postProductReview.pending, (state, action) =>{
      state.isLoading=true
    })
    builder.addCase(postProductReview.fulfilled, (state, action) =>{
      state.isLoading=false
      state.product.data.review= action.payload.data.review
    })
    builder.addCase(postProductReview.rejected, (state, action) =>{
      state.isLoading=false
      state.isError=true
      state.isSuccess=false
      state.message=action.payload
    })

  }
})

export const { reset, resetReview, resetError }= productSlice.actions
export default productSlice.reducer