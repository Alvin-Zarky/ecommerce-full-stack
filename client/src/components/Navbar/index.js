import React from 'react';
import { Container, Row, Col } from "reactstrap"
import { NavLink } from 'react-router-dom';
import * as Routes from "../../router"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BiUser} from "react-icons/bi"
import './navbar.scss'

export default function NavBar() {
  return (
    <>
      <Container className='bg-navbar' fluid>
        <Container>
          <Row>
            <Col xl="8" lg="8" md="7" sm="7">
              <div className="left-navbar">
                <div className="title-navbar">
                  <NavLink exact to={Routes.INDEX}><h3>proshop</h3></NavLink>
                </div>
                <form>
                  <div className="box-search">
                    <input type="text" placeholder='Search products...' />
                    <button className="btn-search">
                      <span>Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </Col>
            <Col xl="4" lg="4" md="5" sm="5">
              <div className="right-navbar">
                <nav>
                  <ul>
                    <li><NavLink to={Routes.CART}><AiOutlineShoppingCart /> Cart</NavLink></li>
                    <li><NavLink to={Routes.SIGN_IN}><BiUser /> Sign in</NavLink></li>
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
