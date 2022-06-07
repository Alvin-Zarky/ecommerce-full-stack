import axios from "axios"

const sendShipping = async (data) =>{
  if(data){
    localStorage.setItem('shipping', JSON.stringify(data))
  }
  return data
}

const sendPayment = async (data) =>{
  if(data){
    localStorage.setItem('payment', JSON.stringify(data))
  }
  return data
}

const orderService= {
  sendShipping,
  sendPayment
}

export default orderService