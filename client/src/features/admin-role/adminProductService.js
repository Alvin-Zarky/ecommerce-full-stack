import axios from "axios"

const URL= "/mern/api/admin/product/"
const URL_PRODUCT= "/mern/api/admin/product"

const getData= async ({keyword='', page=''}, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.get(`${URL_PRODUCT}?keyword=${keyword}&page=${page}`, config)
  return res.data
}

const getDataDetail= async (id, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.get(URL + id, config)
  return res.data
}

const addData = async(data, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  
  const res= await axios.post(URL, data, config)
  return res.data
}

const updateData= async (data, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  
  const res= await axios.put(URL + data.id, data.value, config)
  return res.data
}

const deleteData= async (id, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.delete(URL + id, config)
  return res.data
}

const adminProductService={
  getData,
  getDataDetail,
  addData,
  updateData,
  deleteData
}

export default adminProductService