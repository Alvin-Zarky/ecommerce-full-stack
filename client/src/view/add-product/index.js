import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import * as Routes from "../../router"
import axios from "axios"
import { Link, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import MetaHelmet from "../../components/MetaHelmet"
import {toast} from "react-toastify"
import {addProduct, resetProduct} from "../../features/admin-role/adminProductSlice"
import '../edit-user-info/edit-user-info.scss'
import '../edit-product/edit-product.scss'
import './add-product.scss'

export default function AddProduct() {

  const {isLoading, isSuccess} = useSelector(state => state.adminProduct)
  const [image, setImage] = useState('/images/sample.png')
  const [frmData, setFrmData] = useState({
    name: '',
    price: 0,
    brand: '',
    stock:0,
    category: '',
    detail: ''
  })
  const [errMsg, setErrMsg]= useState('')
  const dispatch= useDispatch()
  const history= useHistory()

  const onChange= (e) =>{
    setFrmData((prev) =>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const {name, price, brand, stock, category, detail} = frmData

  const handleSubmit= async (e) =>{
    e.preventDefault()

    const data={
      name,
      image,
      brand,
      category,
      description: detail,
      price,
      stock
    }
    dispatch(addProduct(data))
  }
  
  useEffect(() => {
    if(isSuccess){
      history.push(Routes.PRODUCT_LIST)
    }
    if(errMsg){
      toast.error(errMsg)
    }
    
    return () => {
      dispatch(resetProduct()) 
      setErrMsg('')
    }
  }, [isSuccess, history, dispatch, errMsg])

  const submitFileUploader = async(e) =>{
    e.preventDefault()

    const formData= new FormData()
    const file= e.target.files[0]
    formData.append('image', file)
    if(file){
      try{
        const URL= "/mern/api/upload/"
        const config={
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        }
        const res= await axios.post(URL, formData, config)
        setImage(res.data)
        return res.data
      }catch(err){
        setImage('/images/sample.png')
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        setErrMsg(message)
      }
    }else{
      setImage('/images/sample.png')
    }
  } 

  return (
    <>
      <MetaHelmet />
      <NavBar />
        <div className="maximum-width-page">
          <div className='link-back'>
            <Link to={Routes.PRODUCT_LIST}>
              <span>Go back</span>
            </Link>
          </div>
          <div className="form-update-info">
            <div className="title-overview">
              <span>Add Product</span>
            </div>
            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
              <div>
                <label>Name</label>
              </div>
              <div>
                <input type="text" name="name" id="name" value={name} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Price</label>
              </div>
              <div>
                <input type="number" name="price" id="price"  value={price} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Image</label>
              </div>
              <div>
                <input type="text" value={image} onChange={(e) => {setImage(e.target.value)}} className='width100' required />
                <input type="file" onChange={submitFileUploader} className='width100'/>
              </div>
              <div>
                <label>Brand</label>
              </div>
              <div>
                <input type="text" name="brand" id="brand" value={brand} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Count In Stock</label>
              </div>
              <div>
                <input type="number" name="stock" id="stock" value={stock} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Category</label>
              </div>
              <div>
                <input type="text" name="category" id="category" value={category} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Description</label>
              </div>
              <div>
                <input type="text" name="detail" id="detail" value={detail} onChange={onChange} className='width100' required />
              </div>
              {isLoading && <button className="mrg-10">Submiting...</button>}
              {!isLoading && <button className="mrg-10">Submit</button>}
            </form>
          </div>
        </div>
      <Footer />
    </>
  );
}
