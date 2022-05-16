import React from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import * as Routes from "../../router";
import '../sign-in/sign-in.scss';
import './sign-up.scss';

export default function SignUp() {
  return (
    <>
      <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in sign-up">
          <div className="title-form">
            <span>Sign Up</span>
          </div>
          <form>
            <div className="input-field">
              <div>
                <label>Name</label>
              </div>
              <div>
                <input type="text" placeholder='Please input the name' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Email Address</label>
              </div>
              <div>
                <input type="email" placeholder='Please input the email' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Password</label>
              </div>
              <div>
                <input type="password" placeholder='Please input the password' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Confirm Password</label>
              </div>
              <div>
                <input type="password" placeholder='Please input the comfirm password' />
              </div>
            </div>
            <button>Sign in</button>
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
