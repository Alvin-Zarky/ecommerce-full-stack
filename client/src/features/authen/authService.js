import axios from "axios"

const URL_SIGN_UP= '/mern/api/user/register/'
const URL_SIGN_IN= '/mern/api/user/'
const URL_UPDATE_PROFILE= '/mern/api/user/profile/'
const URL_GET_ORDER= '/mern/api/user/order'

const signUp = async (data) =>{
  const res= await axios.post(URL_SIGN_UP, data)
  
  if(res.data){
    localStorage.setItem('user', JSON.stringify(res.data.data))
  }
  return res.data
}

const signIn = async (data) =>{
  const res= await axios.post(URL_SIGN_IN, data)
  
  if(res.data){
    localStorage.setItem('user', JSON.stringify(res.data.data))
  }
  return res.data
}

const signOut = async () =>{
  localStorage.removeItem('user')
}

const updateUserProfile = async (data, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.put(URL_UPDATE_PROFILE, data, config)
  if(res.data){
    localStorage.setItem('user', JSON.stringify(res.data.data))
  }
  return res.data
}

const getOrderByUser = async ({page=''},token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.get(`${URL_GET_ORDER}?page=${page}`, config)
  return res.data
} 

export const authService={
  signUp,
  signIn,
  signOut,
  updateUserProfile,
  getOrderByUser
}