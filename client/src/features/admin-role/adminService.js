import axios from "axios"

const URL= "/mern/api/admin/user/"
const URL_USER= "/mern/api/admin/user"

const getData= async(keyword='', token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const res= await axios.get(`${URL_USER}?keyword=${keyword}`, config)
  return res.data
}

const getDataDetail= async(id, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const res= await axios.get(URL + id, config)
  return res.data
}

const updateDataDetail = async(data, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const res= await axios.put(URL + data.id, data.value, config)
  return res.data
}

const deleteDataDetail = async(id, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const res= await axios.delete(URL + id, config)
  return res.data
}


const userService={
  getData,
  getDataDetail,
  updateDataDetail,
  deleteDataDetail
}

export default userService


