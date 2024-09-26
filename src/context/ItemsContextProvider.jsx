import React, { useState } from 'react'
import ItemsContext from './ItemsContex'
import { toast } from 'react-toastify'

const ItemsContextProvider = (props) => {
    let [items, setItems] = useState([])

    function addItem(ele) {
        // console.log(ele)
        let data = items.find((val) => val.id === ele.id)
        if (data) {
            toast.warn("Item already in cart", {position:'top-center', theme:'dark'})
        }
        else {
            let updatedObj = {
                ...ele,
                quantity: 1
            }
            setItems([...items, updatedObj])
            toast.success('Successfully Added to Cart',{position:'top-center',theme:'dark'})
        }
        console.log(items)

    }
    function removeItem(item, i) {
        let copyArr = [...items]
        copyArr.splice(i, 1)
        setItems(copyArr)
    }

    let increment = ((ele, i) => {
        let updatedObj = {
            ...ele,
            quantity: ele.quantity + 1,
            price: ele.price + (ele.price / ele.quantity)
        }
        let copyArr = [...items]
        copyArr[i] = updatedObj
        setItems(copyArr)
    })

    let decrement = ((ele, i) => {
        if (ele.quantity == 1) {
            removeItem(ele, i)
            return
        }
        else {
            let updatedObj = {
                ...ele,
                quantity: ele.quantity - 1,
                price: ele.price - (ele.price / ele.quantity)
            }
            let copyArr = [...items]
            copyArr[i] = updatedObj
            setItems(copyArr)
        }
    })
    return (
        <ItemsContext.Provider value={{ items, setItems, addItem, removeItem, increment, decrement }}>
            {props.children}
        </ItemsContext.Provider>
    )
}

export default ItemsContextProvider