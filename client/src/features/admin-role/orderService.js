import axios from "axios"

const URL= "/mern/api/admin/order"

const getDataOrder = async ({keyword='', page=''}, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.get(`${URL}?keyword=${keyword}&page=${page}`, config)
  return res.data
}

const orderService={
  getDataOrder
}

export default orderService