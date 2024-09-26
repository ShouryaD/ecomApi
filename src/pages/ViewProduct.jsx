import React from 'react'
import { useLocation } from 'react-router-dom'

const ViewProduct = (props) => {
    let location = useLocation()
    let product = location.state
    console.log(props.xyz)

    function handleAdd(ans){
        props.xyz(ans)
    }
  return (
    <div className='row m-0 p-0 my-5'>
        <div className="col-md-6 d-flex justify-content-center">
            <img src={product.thumbnail} alt="" />
        </div>
        <div className="col-md-6">
            <h3><strong>Title:</strong> {product.title}</h3>
            <h3 className='my-4'><strong>Brand:</strong> {product.brand}</h3>
            <h3 className='my-5'><strong>Category:</strong> {product.rating}</h3>
            <p><strong>Description:</strong> {product.description}</p>
            <button className='btn btn-success my-5' onClick={()=>handleAdd(product)}>Add to Cart</button>
        </div>
    </div>
  )
}

export default ViewProduct