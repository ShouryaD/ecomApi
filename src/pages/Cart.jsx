import React, { useContext } from 'react'
import ItemsContext from '../context/ItemsContex'

const Cart = () => {
  // console.log(props.arr)
  // let arr = []

  // const handleDelete = (obj,i)=>{
  //   // console.log(i,obj)
  //   // let copyArr = [...props.arr]
  //   // copyArr.splice(i,1)
  //   // props.setArr(copyArr)
  // }
  let sum=0
  let ctx = useContext(ItemsContext)

    ctx.items.forEach((ele)=>{
      sum += ele.price
    })
    // const handleIncrement = (obj,i)=>{
    //   // let updatedObj = {
    //   //   ...obj,
    //   //   quantity:obj.quantity+1,
    //   //   price:obj.price+(obj.price/obj.quantity)
    //   // }
    //   // let copyArr = [...props.arr]
    //   // copyArr[i] = updatedObj
    //   // props.setArr(copyArr)
      
    // }
    // const handleDecrement = (obj,i)=>{
      
    //   // let updatedObj = {
    //   //   ...obj,
    //   //   quantity:obj.quantity-1,
    //   //   price:obj.price-(obj.price/obj.quantity)
    //   // }

    //   // if(updatedObj.quantity<1){
    //   //   handleDelete(obj,i)
    //   //   return
    //   // }

    //   // let copyArr = [...props.arr]
    //   // copyArr[i] = updatedObj
    //   // props.setArr(copyArr)
    //   } 
  return (
    <div>
      <table className="table table-dark align-middle text-center mt-5">
  <thead>
    <tr>
      <th scope="col">Sno</th>
      <th scope="col">Product</th>
      <th scope="col">Title</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {ctx.items.map((ele,index)=>(
      <tr>
      <th scope="row">{index+1}</th>
      <td><img src={ele.thumbnail} height={150} alt="" /></td>
      <td>{ele.title}</td>
      <td><button className='btn btn-danger' onClick={()=>ctx.decrement(ele, index)}>-</button> {ele.quantity} <button className='btn btn-success' onClick={()=>ctx.increment(ele, index)}>+</button></td>
      <td>${ele.price.toFixed(2)}</td>
      <td><button className='btn btn-danger' onClick={()=>ctx.removeItem(index)}>Delete</button></td>
      
    </tr>
    ))}
  </tbody>
</table>
<h3 className='text-center text-white'>Total: ${sum.toFixed(2)}</h3>
    </div>
  )
}

export default Cart