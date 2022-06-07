import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import adminProductService from "./adminProductService"

const initialState={
  products:[],
  product:{},
  isLoading:false,
  isError:false,
  isSuccess:false,
  message: ''
}

export const getProductData= createAsyncThunk(
  'admin-product/getData',
  async(data, thunkAPI) =>{
    try{
      const token = thunkAPI.getState().auth.user.token
      return await adminProductService.getData(data, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getProductDetail= createAsyncThunk(
  'admin-product/getDetail',
  async(id, thunkAPI) =>{
    try{
      const token = thunkAPI.getState().auth.user.token
      return await adminProductService.getDataDetail(id, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addProduct= createAsyncThunk(
  'admin-product/createProduct',
  async(data, thunkAPI) =>{
    try{
      const token = thunkAPI.getState().auth.user.token
      return await adminProductService.addData(data, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateProduct= createAsyncThunk(
  'admin-product/updateProduct',
  async(data, thunkAPI) =>{
    try{
      const token = thunkAPI.getState().auth.user.token
      return await adminProductService.updateData(data, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteProductData = createAsyncThunk(
  'admin-product/deleteData',
  async(id, thunkAPI) =>{
    try{
      const token = thunkAPI.getState().auth.user.token
      return await adminProductService.deleteData(id, token)
    }catch(err){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const adminProductSlice= createSlice({
  name: 'admin-product',
  initialState,
  reducers:{
    resetProduct:(state, action) => initialState,
    resetState: (state, action) =>{
      state.isSuccess=false
    }
  },
  extraReducers:(builder) =>{
    
    builder.addCase(getProductData.pending, (state, action) =>{
      state.isLoading=true
    })
    builder.addCase(getProductData.fulfilled, (state, action) =>{
      state.isLoading=false
      state.products= action.payload
      state.isError=false
    })
    builder.addCase(getProductData.rejected, (state, action) =>{
      state.isLoading=false
      state.isError=true
      state.message=action.payload
    })

    builder.addCase(getProductDetail.fulfilled, (state, action) =>{
      state.product= action.payload
      state.isError=false
    })
    builder.addCase(getProductDetail.rejected, (state, action) =>{
      state.isError=true
      state.message=action.payload
    })

    builder.addCase(addProduct.pending, (state, action) =>{
      state.isLoading=true
      state.isSuccess=false
      state.isError=false
    })
    builder.addCase(addProduct.fulfilled, (state, action) =>{
      state.isLoading=false
      state.products.push(action.payload.data)
      state.isSuccess=true
    })
    builder.addCase(addProduct.rejected, (state, action) =>{
      state.isLoading=false
      state.isError=true
      state.isSuccess=false
      state.message= action.payload
    })

    builder.addCase(updateProduct.pending, (state, action) =>{
      state.isLoading=true
      state.isSuccess=false
      state.isError=false
    })
    builder.addCase(updateProduct.fulfilled, (state, action) =>{
      state.isLoading=false
      state.isSuccess=true
    })
    builder.addCase(updateProduct.rejected, (state, action) =>{
      state.isLoading=false
      state.isError=true
      state.isSuccess=false
      state.message= action.payload
    })

    builder.addCase(deleteProductData.fulfilled, (state, action) =>{
      state.products.data= state.products.data.filter(val => val._id !== action.payload.data._id)
      state.isError=false
    })
    builder.addCase(deleteProductData.rejected, (state, action) =>{
      state.isError=true
      state.message=action.payload
    })

  }
})

export const { resetProduct, resetState }= adminProductSlice.actions
export default adminProductSlice.reducer