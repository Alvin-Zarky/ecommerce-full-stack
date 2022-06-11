import React, {useState} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import StepNavBar from '../../components/StepNavBar';
import { useHistory } from 'react-router-dom';
import * as Routes from "../../router"
import MetaHelmet from '../../components/MetaHelmet';
import { useDispatch } from 'react-redux';
import {submitShipping} from "../../features/order/checkOutSlice"
import '../sign-in/sign-in.scss'
import './shipping.scss'

export default function Shipping() {

  const shippingStorage= localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : ''
  const [address, setAddress] = useState(shippingStorage && shippingStorage.address)
  const [city, setCity] = useState(shippingStorage && shippingStorage.city)
  const [postal, setPostal] = useState(shippingStorage && shippingStorage.postalCode)
  const [country, setCountry] = useState(shippingStorage && shippingStorage.country)

  const dispatch= useDispatch()
  const history= useHistory()

  const handleSubmit = (e) =>{
    const data={
      address,
      city,
      postalCode: postal,
      country
    }
    dispatch(submitShipping(data)).then(() => {
      history.push(Routes.PAYMENT)
    })
    
    e.preventDefault()
  }

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
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <div>
                <label>Address</label>
              </div>
              <div>
                <input type="text" value={address} onChange={(e) => {setAddress(e.target.value)}} required  placeholder='Please enter address' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>City</label>
              </div>
              <div>
                <input type="text" value={city} onChange={(e) => {setCity(e.target.value)}} required placeholder='Please enter city' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Postal code</label>
              </div>
              <div>
                <input type="number" value={postal} onChange={(e) => {setPostal(e.target.value)}
              } required placeholder='Enter postal code' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Country</label>
              </div>
              <div>
                <input type="text" value={country} onChange={(e) => {setCountry(e.target.value)}} required placeholder='Enter country' />
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
