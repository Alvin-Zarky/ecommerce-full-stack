import axios from "axios"

const URL= "/mern/api/order/"
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

const sendOrder = async (data, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.post(URL, data, config)
  return res.data
}

const getOrder = async (id, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  
  const res= await axios.get(URL + id, config)
  return res.data
}

const orderPay = async (data, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.put(URL + data.id + `/pay`, {id: data.paymentResult.id, status: data.paymentResult.status, email_address: data.paymentResult.payer.email_address, update_time: data.paymentResult.update_time}, config)
  return res.data
}

const orderService= {
  sendShipping,
  sendPayment,
  sendOrder,
  getOrder,
  orderPay
}

export default orderService