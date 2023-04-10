import React from 'react'
import { useParams } from 'react-router-dom'
import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import { Button } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { getProduct } from '../services/helper'



const ProductPage = () => {
  const { product_id } = useParams()
  const { data, isLoading, isError, error} = useQuery(['product', product_id], () => getProduct(product_id))
  console.log('data',data)



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
              <img src={data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url} alt="" />
            </div>
          <div className='product-pageProduct'>
              <h3 className='product-h3'>{data.title.rendered}</h3>
              <p><strong>{data.acf.price_on_a_product}</strong> kr</p>
            <div>
              <p className='product-pageP' dangerouslySetInnerHTML={{ __html: data.content.rendered}}></p>
            </div>
            <Button className='mt-auto' onClick={() => {}}>Add to Cart</Button>
          </div>
      </div>
      </>
      
    )}

   

    </Container>
  )
}

export default ProductPage