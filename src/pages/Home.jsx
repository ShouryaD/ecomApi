import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ItemsContext from '../context/ItemsContex'

const Home = () => {
    let val = useContext(ItemsContext)
    let [data, setData] = useState([])
    let res = async()=>{
        let res =await axios.get('https://dummyjson.com/products?limit=0&skip=0')
        console.log(res.data.products)
        setData(res.data.products)
    }
    useEffect(()=>{
        res()
    },[])
  return (
    <div className="m-10 p-0 container-fluid">
        <h1 className='text-center'>New York Patanjali Store</h1>
        <div className='m-0 p-0 row text-center gap-2 justify-content-center mt-5'>
{data.map((ele)=>(
    <div className='border d-flex flex-column justify-content-between align-items-center border-white rounded' style={{height:"450px",width:"400px"}}>   
        <img src={ele.images[0]} style={{height:"230px", width:"150px"}} alt="" />
        <h3>{ele.title}</h3>
        <h4>{ele.category}</h4>
        <h5>⭐{ele.rating}</h5>
        <h5>${ele.price}</h5>
        <button className='p-2 text-dark bg-white rounded mb-2' style={{width:"100px"}}>View</button>
    </div>
))}
    </div>
    </div>
  )
}

export default Home