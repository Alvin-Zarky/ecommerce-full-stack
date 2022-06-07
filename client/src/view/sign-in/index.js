import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {doSignIn} from "../../features/authen/authSlice"
import * as Routes from "../../router";
import {toast} from "react-toastify";
import './sign-in.scss'
import MetaHelmet from '../../components/MetaHelmet';

export default function SignIn() {

  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const {isLoading, message, isError, user} = useSelector(state => state.auth)
  const dispatch= useDispatch()
  const history= useHistory()
  const location= useLocation()

  const queryLocation= location.search ? location.search.split("=")[1] : `/`
  const onSignIn = (e) =>{
    const value={
      email,
      password
    }
    dispatch(doSignIn(value))
    e.preventDefault()
  }

  useEffect(() =>{
    if(isError){
      toast.error(message)
    }
    if(user){
      history.push(queryLocation)
    }
  }, [isError, message, history, queryLocation, user])

  return (
    <>
      <MetaHelmet />
      <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in">
          <div className="title-form">
            <span>Sign in</span>
          </div>
          <form onSubmit={onSignIn}>
            <div className="input-field">
              <div>
                <label>Email Address</label>
              </div>
              <div>
                <input type="email" value={email} required onChange={(e) => {setEmail(e.target.value)}} placeholder='Please input the email' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Password</label>
              </div>
              <div>
                <input type="password" value={password} required onChange={(e) => {setPassword(e.target.value)}} placeholder='Please input the password' />
              </div>
            </div>
            {isLoading && <button>Signing in...</button>}
            {!isLoading && <button>Sign in</button>}
            <div className="link-page">
              <span>New Customer? <Link to={Routes.SIGN_UP}>Sign Up</Link></span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
