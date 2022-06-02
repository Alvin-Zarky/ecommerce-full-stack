import React, {useState} from 'react';
import { Container, Row, Col } from "reactstrap"
import { NavLink, useHistory } from 'react-router-dom';
import * as Routes from "../../router"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {IoMdArrowDropdown} from "react-icons/io"
import {useSelector, useDispatch} from "react-redux"
import {doSignOut} from "../../features/authen/authSlice"
import {BiUser} from "react-icons/bi"
import './navbar.scss'

export default function NavBar() {

  const [isDrop, setIsDrop]= useState(false)
  const [adminDrop, setAdminDrop] = useState(false)
  const [keyword, setKeyWord]= useState('')
  const {user, isLoading} = useSelector(state => state.auth)
  const profile= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const dispatch= useDispatch()
  const history = useHistory()

  const onLogOut = () =>{
    dispatch(doSignOut())
  }
  
  const toggleDrop = (typeUser) =>{
    if(typeUser === 'user'){
      if(!isDrop){
        setIsDrop(true)
        setAdminDrop(false)
        return
      }
      setIsDrop(false)
    }
    if(typeUser==='admin'){
      if(!adminDrop){
        setAdminDrop(true)
        setIsDrop(false)
        return
      }
      setAdminDrop(false)
    }
  }

  const handleSearch = async (e) =>{
    e.preventDefault()

    if(keyword.trim()){
      history.push(`${Routes.SEARCH}/${keyword}`)
    }else{
      history.push(`/`)
    }
    
  }
  
  return (
    <>
      <Container className='bg-navbar' fluid>
        <Container>
          <Row>
            <Col xl="8" lg="8" md="6" sm="4">
              <div className="left-navbar">
                <div className="title-navbar">
                  <NavLink exact to={Routes.INDEX}><h3>proshop</h3></NavLink>
                </div>
                <form onSubmit={handleSearch}>
                  <div className="box-search">
                    <input value={keyword} onChange={(e) => {setKeyWord(e.target.value)}} type="text" placeholder='Search products...' />
                    <button className="btn-search">
                      <span>Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </Col>
            <Col xl="4" lg="4" md="6" sm="8">
              <div className="right-navbar">
                <nav>
                  <ul>
                    <li><NavLink to={Routes.CART}><AiOutlineShoppingCart /> Cart</NavLink></li>
                    {user && <li><div className="username" onClick={() => {toggleDrop('user')}}>{profile && profile.name} <IoMdArrowDropdown /> 
                      {isDrop && (
                        <ul className='sub-menu'>
                          <li><NavLink to={Routes.PROFILE}>Profile</NavLink></li>
                          <li onClick={onLogOut}><div className='logout'>{isLoading ? `Logging out...` : `Logout`}</div></li>
                        </ul>
                      )}
                    </div></li>}
                    {profile && profile.isAdmin && <li><div className="username" onClick={() => {toggleDrop('admin')}}>Admin <IoMdArrowDropdown /> 
                      {adminDrop && (
                        <ul className='sub-menu'>
                          <li><NavLink to={Routes.USER_LIST}>User</NavLink></li>
                          <li><NavLink to={Routes.PRODUCT_LIST}>Products</NavLink></li>
                          <li><NavLink to={Routes.ORDER_LIST}>Order</NavLink></li>
                        </ul>
                      )}
                    </div></li>}
                    {!user && <li><NavLink to={Routes.SIGN_IN}><BiUser /> Sign in</NavLink></li>}
                  </ul>
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
