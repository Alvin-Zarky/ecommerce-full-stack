import React, {useEffect, useState} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {TiTick} from "react-icons/ti"
import {FiEdit} from "react-icons/fi"
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getDataUsers, reset, deleteUserDetail} from "../../features/admin-role/adminSlice"
import * as Routes from "../../router"
import {MdDeleteOutline} from "react-icons/md"
import { Table } from 'reactstrap';
import Loading from "../../components/Loading"
import {ImCross} from "react-icons/im"
import {Row, Col} from "reactstrap"
import Pagination from '../../components/Pagination';
import './admin-user.scss'
import MetaHelmet from '../../components/MetaHelmet';

export default function AdminUser() {

  const [search, setKeyWord] = useState('')
  const {users, isLoading, isError} = useSelector(state => state.admin)
  const {count, page:pageNumber, allPages:pages, pagination} = users
  const dispatch= useDispatch()
  const {keyword, page} = useParams()
  
  const history= useHistory()

  useEffect(() =>{
    dispatch(getDataUsers({keyword, page}))

    return () => dispatch(reset())
  }, [dispatch, keyword, page])

  const handleDelete = (id) =>{
    if(window.confirm("Are u sure to delete this item?")){
      dispatch(deleteUserDetail(id))
    }
  }
  
  const handleSubmit= (e) =>{
    e.preventDefault()

    if(search.trim()){
      history.push(`${Routes.USER_LIST}/search/${search}`)
    }else{
      history.push(`${Routes.USER_LIST}`)
    }
    
  }
  return (
    <>
      <MetaHelmet />
      <NavBar />
        <div className="admin-user-page">
          <Row>
            <Col xl="6" lg="6" md="6">
              <div className="title-user">
                <span>User</span>
              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <form onSubmit={handleSubmit}>
                <div className="input-search">
                  <div className="input-type">
                    <input type="text" value={search} onChange={(e) => {setKeyWord(e.target.value)}} spellCheck="false" />
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
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.data && users.data.map((val, ind) =>(
                <tr key={val._id}>
                  <td>{val._id}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.isAdmin ? <TiTick className="tick-icon" /> : <ImCross className="cross-icon" />}</td>
                  <td>
                    <div className="button-function">
                      <Link to={`${Routes.USER}/${val._id}`}>
                        <button className="edit"><FiEdit /></button>
                      </Link>
                      <button className="delete" onClick={() => {handleDelete(val._id)}}><MdDeleteOutline /></button>
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
          <div className="page-pagination">
            <Pagination isLoading={isLoading} isError={isError} pagination={pagination} keyword={keyword} pages={pages} pageNumber={pageNumber} ROUTE={Routes.USER_LIST} />
          </div>
        </div>
      <Footer />
    </>
  );
}
