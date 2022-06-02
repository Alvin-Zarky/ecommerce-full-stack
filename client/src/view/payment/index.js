import React from 'react';
import Footer from '../../components/Footer';
import MetaHelmet from '../../components/MetaHelmet';
import NavBar from '../../components/Navbar';
import StepNavBar from '../../components/StepNavBar';
import './payment.scss'

export default function Payment() {
  return (
    <>
    <MetaHelmet />
    <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in">
          <StepNavBar />
          <div className="title-form">
            <span>Payment Method</span>
          </div>
          <div className="detail-payment">
            <div className="select-payment">
              <span>Select Method</span>
            </div>
            <div className="credit">
              <input type="checkbox" defaultChecked required /> <span>Paypal or credit card</span>
            </div>
            <button>Continue</button>
          </div>
        </div>
      </div>
    <Footer />
    </>
  );
}
