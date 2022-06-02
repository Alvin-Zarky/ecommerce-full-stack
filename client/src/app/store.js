import { configureStore } from '@reduxjs/toolkit';
import productSlice from "../features/product/productSlice"
import authSlice from '../features/authen/authSlice';
import adminSlice from "../features/admin-role/adminSlice"
import adminProductSlice from '../features/admin-role/adminProductSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
    auth:authSlice,
    admin: adminSlice,
    adminProduct:  adminProductSlice
  },
});
