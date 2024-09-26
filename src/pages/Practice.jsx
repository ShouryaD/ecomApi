import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Demo from '../components/Demo'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ItemsContext from '../context/ItemsContex'
import UserContext from '../context/UserContext'

const Practice = () => {

    let val = useContext(ItemsContext)

    let [data, setData] = useState([])
    let [err, setErr] = useState(false)
    let [loading, setLoading] = useState(false)
    let search = useContext(UserContext).search

    let res = async () => {
        setLoading(true)
        try {
            let res = await axios.get('https://dummyjson.com/products?limit=0&skip=0')
            console.log(res.data.products)
            if(res.data.products.thumbnail == ''){
                res.data.products.thumbnail = 'https://cdn.shopify.com/s/files/1/0070/7032/files/product_20research.png?v=1702995315'
            }
            setData(res.data.products)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setErr(true)
        }
    }
    let [currentPage, setCurrentPage] = useState(1)
    let itemsPerPage = 10
    let lastIndex = itemsPerPage * currentPage
    let firstIndex = lastIndex - itemsPerPage
    // console.log(firstIndex,lastIndex)
    let searchedArr = data.filter((ele)=>
        ele.title.toLowerCase().includes(search) || ele.category.toLowerCase().includes(search)
    )

    let slicedArr = searchedArr.slice(firstIndex,lastIndex)

    let numOfButtons = Math.ceil(searchedArr.length/itemsPerPage)
    let arr = new Array(numOfButtons).fill(0)
    console.log(arr)
    useEffect(() => {
        res()
    }, [])

    let handleNext = ()=>{
        if(currentPage<arr.length){
            setCurrentPage(currentPage+1)
        }
    }

    let handlePrev = ()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
    }
    return (
        <div>

            {loading == true ? <div className='row m-0 p-0 justify-content-center gap-3'>
                {
                    Array(6).fill(0).map((ele,i) => (
                        <SkeletonTheme key={i} baseColor="#202020" highlightColor="#444">
                            <div className='col-md-3 mb-4'>
                                <Skeleton height={300} />
                                <div className='d-flex justify-content-between'>
                                    <Skeleton width={200} />
                                    <Skeleton width={200} />
                                </div>
                            </div>
                        </SkeletonTheme>
                    ))
                }
            </div> : <div>
                {err === false ? <div className='row m-0 p-0 justify-content-center gap-3'>
                    {slicedArr.map((ele,index) => (
                        ele.thumbnail &&
                        <div key={index} className="card" style={{ width: '18rem' }}>
                            <img src={ele.thumbnail} className="card-img-top h-100" alt="..." />
                            <div className="card-body  justify-content-between">
                                <h5 className="card-title justify">{ele.title}</h5>
                                <p className="card-text">${ele.price}</p>
                                <div>
                                <Link to="/view" state={ele} className="btn btn-primary w-100">View</Link>
                                </div>
                              <div>
                              <button className='btn btn-success w-100 my-2' onClick={() => val.addItem(ele)}>Add To Cart</button>
                              </div>
                            </div>
                        </div>
                    ))}
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center flex-wrap">
                            <li className="page-item disabled" onClick={handlePrev}>
                                <a className="page-link">Previous</a>
                            </li>
                            {arr.map((ele,key)=>(
                                <li key={key} className="page-item" onClick={()=>setCurrentPage(key+1)}><Link className={currentPage===key+1? "page-link active" : "page-link"} >{key+1}</Link></li>
                            ))}
                            <li className="page-item" onClick={handleNext}>
                                <Link className="page-link">Next</Link>
                            </li>
                        </ul>
                    </nav>

                </div> : <Demo />}
            </div>
            }
        </div>
    )
}

export default Practice