import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Link, useParams } from 'react-router-dom';
import * as Routes from "../../router"
import {getDataUsersDetail, updateUserDetail} from "../../features/admin-role/adminSlice"
import MetaHelmet from "../../components/MetaHelmet"
import './edit-user-info.scss'

export default function EditUserInfo() {
  
  const {user,isLoading} = useSelector(state => state.admin)
  const [userName, setName]= useState('')
  const [userEmail, setEmail]= useState('')
  const [isAdmin, setAdmin]= useState(null)
  const dispatch= useDispatch()
  const {id}= useParams()

  useEffect(() =>{
    if(!user.data || !user.data.name){
      dispatch(getDataUsersDetail(id))
    }else{
      setName(user.data.name)
      setEmail(user.data.email)
      setAdmin(user.data.isAdmin)
    }
    
    
  }, [dispatch, id, user])
  
  const handleSubmit= async (e) =>{
    e.preventDefault()

    dispatch(updateUserDetail({id, value: { name: userName, email: userEmail, isAdmin }}))
  }

  return (
    <>
      <MetaHelmet />
      <NavBar /> 
        <div className="maximum-width-page">
          <div className='link-back'>
            <Link to={Routes.USER_LIST}>
              <span>Go back</span>
            </Link>
          </div>
          <div className="form-update-info">
            <div className="title-overview">
              <span>Edit User</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
              </div>
              <div>
                <input type="text" className="input100" value={userName} onChange={(e) => {setName(e.target.value)}} required />
              </div>
              <div>
                <label>Email</label>
              </div>
              <div>
                <input type="email" className="input100" value={userEmail} onChange={(e) =>{setEmail(e.target.value)}} required />
              </div>
              <div className="checkbox">
                {isAdmin && (
                  <>
                    <input type="checkbox" onChange={(e) => {setAdmin(e.target.checked)}} defaultChecked /> <span>is Admin</span>
                  </>
                )} 
                {!isAdmin && (
                  <>
                    <input type="checkbox" onChange={(e) => {setAdmin(e.target.checked)}} /> <span>is Admin</span>
                  </>
                )} 
              </div>
              {isLoading && <button>Updating...</button>}
              {!isLoading && <button>Update</button>}
            </form>
          </div>
        </div>
      <Footer /> 
    </>
  );
}
