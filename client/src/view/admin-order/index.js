import React from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Table } from 'reactstrap';
import {ImCross} from "react-icons/im"
import { Link } from 'react-router-dom';
import * as Routes from "../../router";
import '../admin-user/admin-user.scss';
import './admin-order.scss'
import MetaHelmet from '../../components/MetaHelmet';

export default function AdminOrder() {
  return (
    <>
      <MetaHelmet />
      <NavBar />
        <div className="maximum-width-page">
          <div className="title-overview">
            <span>Orders</span>
          </div>
          <Table className="table-content" striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Alvin</td>
                <td>2022-05-26</td>
                <td>$ 218.28</td>
                <td>2022-05-27</td>
                <td><ImCross className="cross-icon" /></td>
                <td>
                  <Link to={`${Routes.DETAIL_ORDER}/1`}>
                    <button className="btn-detail">Details</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Alvin</td>
                <td>2022-05-26</td>
                <td>$ 218.28</td>
                <td>2022-05-27</td>
                <td><ImCross className="cross-icon" /></td>
                <td>
                  <Link to={`${Routes.DETAIL_ORDER}/1`}>
                    <button className="btn-detail">Details</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      <Footer />
    </>
  );
}

