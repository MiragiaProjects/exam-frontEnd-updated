import React from 'react'
import { useParams } from 'react-router-dom'
import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
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
      <div className='product-pageProduct'>
        <img src={data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url} alt="" />
          <h3>{data.title.rendered}</h3>
        <div>
          <p className='product-pageP' dangerouslySetInnerHTML={{ __html: data.content.rendered}}></p>
        </div>
      </div>
      </>
    )}

    </Container>
  )
}

export default ProductPage