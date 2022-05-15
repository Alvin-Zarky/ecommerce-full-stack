import React from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import * as Routes from "../../router";
import './sign-in.scss'

export default function SignIn() {
  return (
    <>
      <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in">
          <div className="title-form">
            <span>Sign in</span>
          </div>
          <form>
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
            <button>Sign in</button>
            <div className="link-page">
              <span>New Customer? <Link to={Routes.INDEX}>Sign Up</Link></span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
