import React, {useEffect, useState} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Table } from 'reactstrap';
import {FiEdit} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";
import {Link, useParams, useHistory} from "react-router-dom"
import {Row, Col} from "reactstrap"
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../components/Loading"
import {getProductData, deleteProductData, resetProduct} from "../../features/admin-role/adminProductSlice"
import * as Routes from "../../router";
import MetaHelmet from "../../components/MetaHelmet"
import '../admin-user/admin-user.scss';
import './admin-product.scss';

export default function AdminProduct() {

  const [search, setSearch] = useState('')
  const {products, isLoading} = useSelector(state => state.adminProduct)
  const dispatch= useDispatch()
  const {keyword} = useParams()
  const history = useHistory()

  useEffect(() =>{
    dispatch(getProductData(keyword))

    return () => dispatch(resetProduct())
  }, [dispatch, keyword])

  const handleDelete= async (id) =>{
    if(window.confirm("Are u sure to delete this product?")){
      dispatch(deleteProductData(id))
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    if(search.trim()){
      history.push(`${Routes.PRODUCT_LIST}/search/${search}`)
    }else{
      history.push(`${Routes.PRODUCT_LIST}`)
    }
  }

  return (
    <>
      <MetaHelmet />
      <NavBar />
        <div className="maximum-width-page">
          <Row>
            <Col xl="6" lg="6" md="6">
              <div className="title-overview">
                <span>Products</span>
              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <Link to={`${Routes.PRODUCT_DETAIL}/add`}>
                <div className="btn-create">
                  <span>Create Product</span>
                </div>
              </Link>
              <form onSubmit={handleSubmit}>
                <div className="input-search marginb20">
                  <div className="input-type">
                    <input type="text" value={search} onChange={(e) => {setSearch(e.target.value)}} spellCheck="false" />
                  </div>
                  <div className="btn-search">
                    <button>Search</button>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
          <Table className="table-content" striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
              {products.data && products.data.map((val, ind) =>(
                <tr key={val._id}>
                  <td>{val._id}</td>
                  <td>{val.name}</td>
                  <td>$ {val.price}</td>
                  <td>{val.category}</td>
                  <td>{val.brand}</td>
                  <td>
                    <div className="button-function">
                      <Link to={`${Routes.PRODUCT_DETAIL}/edit/${val._id}`}>
                        <button className="edit"><FiEdit /></button>
                      </Link>
                      <button className="delete" onClick={(e) => {handleDelete(val._id)}}><MdDeleteOutline /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {isLoading && (
            <div className="loading" style={{marginTop:"-30px"}}>
              <Loading />
            </div>
          )}
        </div>
      <Footer />
    </>
  );
}
