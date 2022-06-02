import React from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import StepNavBar from '../../components/StepNavBar';
import '../sign-in/sign-in.scss'
import './shipping.scss'
import MetaHelmet from '../../components/MetaHelmet';

export default function Shipping() {
  return (
    <>
      <MetaHelmet />
      <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in" style={{marginBottom:"20px"}}>
          <div>
            <StepNavBar />
          </div>
          <div className="title-form">
            <span>Shipping</span>
          </div>
          <form>
            <div className="input-field">
              <div>
                <label>Address</label>
              </div>
              <div>
                <input type="email" required  placeholder='Please enter address' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>City</label>
              </div>
              <div>
                <input type="password" required placeholder='Please enter city' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Postal code</label>
              </div>
              <div>
                <input type="password" required placeholder='Enter postal code' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Country</label>
              </div>
              <div>
                <input type="password" required placeholder='Enter country' />
              </div>
            </div>
            <button>Continue</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
