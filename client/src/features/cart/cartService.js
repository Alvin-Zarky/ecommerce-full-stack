import axios from "axios"

const URL= "/mern/api/product/"

const addProductToCart = async (data) =>{
  const res= await axios.get(URL + data.id)
  if(res.data){
    const value={
      ...res.data.data,
      product: data.id, 
      qty: Number(data.qty)
    }
    return value
  }
}

const removeProductFromCart = async(data) =>{
  const res= await axios.get(URL + data.id)
  return res.data
}

const cartService={
  addProductToCart,
  removeProductFromCart
}

export default cartService