import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

import { useQuery } from 'react-query'
import { getProducts } from '../services/helper'

import ProductCard from '../Components/ProductCard'
import Cart from '../Components/Cart'




const ProductsPage = () => {
  const { product_id } = useParams()
  const { data, isLoading, isError, error} = useQuery(['product', product_id], () => getProducts(product_id))

  const [ cartItems, setCartItems ] = useState([])
  
// To add to cart
const onAddToCart = (data) => {
  const exist = cartItems.find((x) => x.id === data.id);
  console.log('dataProd1', data)
  if (exist) {
    setCartItems(
      cartItems.map((x) =>
        x.id === data.id ? { ...exist, qty: exist.qty + 1 } : x
      )
    );
    console.log('dataProd2', data)
  } else {
    setCartItems([...cartItems, { ...data, qty: 1 }]);
  }
};
  // To remove from cart
  const onRemoveFromCart = (data) => {
    const exist = cartItems.find((x) => x.id === data.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== data.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === data.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      )
    }
  }
  return (
    <Container>
      <h1>Art</h1>
      {isLoading && (<p className='my-3'>Loading ...</p>)}

{isError && (
    <Alert>
        <p>Oh no, error!</p>
        <p>{error.message}</p>
    </Alert>)}
      
      
      {data && <ProductCard onAddToCart={onAddToCart} data={data} />}

      <Cart onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} cartItems={cartItems} />

    </Container>
  )
}

export default ProductsPage