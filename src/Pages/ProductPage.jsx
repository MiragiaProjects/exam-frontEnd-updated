import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import { Button } from 'react-bootstrap'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { getProduct } from '../services/helper'

import "@wordpress/block-library/build-style/common.css"
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"



const ProductPage = () => {
  const { product_id } = useParams()
  const { data, isLoading, isError, error} = useQuery(['product', product_id], () => getProduct(product_id))

  const placeholderImg = "https://www.miragia-project.se/wp-json/wp/v2/media/47"
  
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

useEffect(()=> {
  setCartItems(
    localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []
    )
},[])

  return (
    <Container>
      {isLoading && (<p className='my-3'>Loading ...</p>)}

      {isError && (
        <Alert>
        <p>Oh no, error!</p>
        <p>{error.message}</p>
    </Alert>)}

    {data && (
      <>
      <div className='product-wrapper'>
        <div className='product-pageProduct-img'>
              <img src={data.featured_media === 0 ? placeholderImg  : data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url }alt="" />
            </div>
          <div className='product-pageProduct'>
              <h3 className='product-h3'>{data.title.rendered}</h3>
              <p><strong>{data.acf.price_on_a_product}</strong> kr</p>
            <div>
              <p className='product-pageP' dangerouslySetInnerHTML={{ __html: data.content.rendered}}></p>
            </div>
            <Button className='mt-auto' onClick={() => {onAddToCart(data)}}>Add to Cart</Button>
          </div>
      </div>
      </>
      
    )}

   

    </Container>
  )
}

export default ProductPage