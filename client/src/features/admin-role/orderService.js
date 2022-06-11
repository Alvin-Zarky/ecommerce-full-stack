import axios from "axios"

const URL= "/mern/api/admin/order"

const getDataOrder = async ({search='', page=''}, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.get(`${URL}?search=${search}&page=${page}`, config)
  return res.data
}

const deliverOrder= async (id, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.put(`${URL}/${id}/delivered`, {isDeliver:true, deliveredAt: Date.now()}, config)
  return res.data
}

const orderService={
  getDataOrder,
  deliverOrder
}

export default orderService