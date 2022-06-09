import { configureStore } from '@reduxjs/toolkit';
import productSlice from "../features/product/productSlice"
import authSlice from '../features/authen/authSlice';
import adminSlice from "../features/admin-role/adminSlice"
import adminProductSlice from '../features/admin-role/adminProductSlice';
import cartSlice from '../features/cart/cartSlice';
import orderSlice from "../features/order/checkOutSlice"
import adminOrderSlice from "../features/admin-role/orderSlice"

export const store = configureStore({
  reducer: {
    product: productSlice,
    auth:authSlice,
    admin: adminSlice,
    adminProduct:  adminProductSlice,
    adminOrder: adminOrderSlice,
    cart: cartSlice,
    order: orderSlice
  },
});
