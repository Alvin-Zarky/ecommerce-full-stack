import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {Row, Col, Table} from "reactstrap"
import {TiTick} from "react-icons/ti"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {updateProfile} from "../../features/authen/authSlice"
import { resetMessage } from '../../features/authen/authSlice';
import * as Routes from "../../router"
import './profile.scss'
import MetaHelmet from '../../components/MetaHelmet';

export default function MyProfile() {
  
  const user= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const [name, setName] = useState(user && user.name)
  const [email, setEmail] = useState(user && user.email)
  const [password, setPassword]= useState('')
  const [confirmPassword, setCfPassword]= useState('')
  const [errMessage, setErrMessage]= useState(null)
  const {isLoading, message, isSucceed, isError} = useSelector(state => state.auth)
  const dispatch= useDispatch()

  useEffect(() =>{
    return () => dispatch(resetMessage())
  }, [dispatch])

  const handleUpdate = async (e) =>{
    e.preventDefault()
    
    if(confirmPassword !== password){
      setErrMessage('Confirm password does not match!')
      return
    }

    setErrMessage('')
    dispatch(updateProfile({_id: user && user._id, name, email, password}))
  }

  return (
    <>
      <MetaHelmet />
      <NavBar />
        <div className="profile-user">
          <Row>
            <Col xl="3" lg="3" md="3">
              <div className="title-profile">
                <span>User Profile</span>
              </div>
              {isError && (
                <div className="box-message">
                <span>{message}</span>
                </div>
              )}
              {errMessage && (
                <div className="box-message">
                  <span>{errMessage}</span>
                </div>
              )}
              {isSucceed && !errMessage && (
                <div className="box-success">
                  <span>Update Successfully!</span>
                </div>
              )}
              <div className="form-user">
                <form onSubmit={handleUpdate}>
                  <div>
                    <label>Name</label>
                  </div>
                  <div>
                    <input type="text" spellCheck="false" value={name} onChange={(e) => {setName(e.target.value)}} required />
                  </div>
                  <div>
                    <label>Email Address</label>
                  </div>
                  <div>
                    <input type="email" spellCheck="false" value={email} onChange={(e) => {setEmail(e.target.value)}} required />
                  </div>
                  <div>
                    <label>Password Address</label>
                  </div>
                  <div>
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                  </div>
                  <div>
                    <label>Confirm Password</label>
                  </div>
                  <div>
                    <input type="password" value={confirmPassword} onChange={(e) =>{setCfPassword(e.target.value)}}/>
                  </div>
                  {isLoading && <button><span>Updating...</span></button>}
                  {!isLoading && <button><span>Update</span></button>}
                </form>
              </div>
            </Col>
            <Col xl="9" lg="9" md="9" className="order-info">
              <div className="title-profile">
                <span>My Order</span>
              </div>
              <div className="table-info">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>4729D283728B2927fh272</td>
                    <td>2022-09-22</td>
                    <td>$ 214.58</td>
                    <td><TiTick className="tick-svg" /></td>
                    <td>
                      <Link to={`${Routes.DETAIL_ORDER}/1`}>
                        <button className="btn-deliver">Details</button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
              </div>
            </Col>
          </Row>
        </div>
      <Footer />
    </>
  );
}
