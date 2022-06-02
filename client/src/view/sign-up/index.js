import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import { Link, useHistory } from 'react-router-dom';
import {doSignUp} from "../../features/authen/authSlice"
import {useSelector, useDispatch} from "react-redux"
import * as Routes from "../../router";
import {toast} from "react-toastify";
import '../sign-in/sign-in.scss';
import './sign-up.scss';
import MetaHelmet from '../../components/MetaHelmet';

export default function SignUp() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const {isLoading, message, isError, isSuccess}= useSelector(state => state.auth)
  const dispatch= useDispatch()
  const history= useHistory()

  const onChange= (e) =>{
    setFormData((prev) =>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSignUp = (e) =>{
    dispatch(doSignUp(formData))

    e.preventDefault()
  }

  useEffect(() =>{
    if(isError){
      toast.error(message)
    }
  }, [isError, message, isSuccess, history])

  return (
    <>
      <MetaHelmet />
      <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in sign-up">
          <div className="title-form">
            <span>Sign Up</span>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="input-field">
              <div>
                <label>Name</label>
              </div>
              <div>
                <input type="text" name="name" id="name" onChange={onChange} required placeholder='Please input the name' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Email Address</label>
              </div>
              <div>
                <input type="email" name="email" id="email" onChange={onChange} required placeholder='Please input the email' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Password</label>
              </div>
              <div>
                <input type="password" name="password" id="password" onChange={onChange} required placeholder='Please input the password' />
              </div>
            </div>
            {/* <div className="input-field">
              <div>
                <label>Confirm Password</label>
              </div>
              <div>
                <input type="password" name="confirmPassword" id="confirmPassword" onChange={onChange} required placeholder='Please input the comfirm password' />
              </div>
            </div> */}
            {isLoading && <button>Signing in...</button>}
            {!isLoading && <button>Sign in</button>}
            <div className="link-page">
              <span>Already have an account? <Link to={Routes.SIGN_IN}>Sign In</Link></span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
