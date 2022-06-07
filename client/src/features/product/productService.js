import axios from "axios"

const URL= `/mern/api/product/`
const URL_PRODUCT= `/mern/api/product`

const getData = async({keyword='', page=''}) =>{

  const res = await axios.get(`${URL_PRODUCT}?keyword=${keyword}&page=${page}`)
  return res.data
}

const getDataDetail = async(id, token) =>{
  
  const {data} = await axios.get(URL + id)
  return data
}

const getProductSlice = async(token) =>{

  const res= await axios.get(URL + 'latest')
  return res.data
}

const postReview= async(data, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.post(URL + data.id + '/review', data.value, config)
  return res.data
}

export const serviceProduct={
  getData,
  getDataDetail,
  getProductSlice,
  postReview
}
