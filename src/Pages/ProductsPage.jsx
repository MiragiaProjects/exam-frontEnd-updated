import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

import { useQuery } from 'react-query'
import { getProducts } from '../services/helper'

import ProductCard from '../Components/ProductCard'
import Cart from '../Components/Cart'

import "@wordpress/block-library/build-style/common.css"
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"


const ProductsPage = () => {
  const { product_id } = useParams()
  const { data, isLoading, isError, error} = useQuery(['product', product_id], () => getProducts(product_id))

  const [ cartItems, setCartItems ] = useState([])
  
// To add to cart
const onAddToCart = (data) => {
  const exist = cartItems.find((x) => x.id === data.id);
  
  if (exist) {
      const newCartItems = cartItems.map((x) => 
      x.id === data.id ? { ...exist, qty: exist.qty + 1} : x 
      );
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  
  } else {
    const newCartItems = [...cartItems, { ...data, qty: 1}];
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  }
}
  // To remove from cart
  const onRemoveFromCart = (data) => {
    const exist = cartItems.find((x) => x.id === data.id);
    if (exist.qty === 1) {
      const newCartItems = cartItems.filter((x) => x.id !== data.id)
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  
    } else {
       const newCartItems = cartItems.map((x) =>
          x.id === data.id ? { ...exist, qty: exist.qty - 1 } : x
        );
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        console.log("setCartItems",setCartItems)
    }
  }

   const emptyCart = () => {
     setCartItems([]);
     localStorage.setItem('cartItems', JSON.stringify([]))
   }


  useEffect(()=> {
    setCartItems(
      localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
      )
  },[])

  return (
    <Container>
      <h1>Art</h1>
      {isLoading && (<p className='my-3'>Loading ...</p>)}

{isError && (
    <Alert>
        <p>Oh no, error!</p>
        <p>{error.message}</p>
    </Alert>)}
      <div className='products-wrapper'>
        <div className='products-div'>
          {data && <ProductCard onAddToCart={onAddToCart} data={data} />}
        </div>
        <div className='cart-div'>
          <Cart emptyCart={emptyCart} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} cartItems={cartItems} setCartItems={setCartItems} />
        </div>
      </div>
    </Container>
  )
}


export default ProductsPage