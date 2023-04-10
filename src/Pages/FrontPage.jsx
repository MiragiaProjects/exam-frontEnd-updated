import React from 'react'
import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Col from "react-bootstrap/Col"
import Button from 'react-bootstrap/Button'
import { Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getFourPosts } from '../services/helper'
import { getFourProducts } from '../services/helper'

const FrontPage = () => {

  const { post_id } = useParams()  
  const { data:fourPosts, isLoading:loadingPosts, isError:postError, error:postErrorMsg } = useQuery(['post', post_id], () => getFourPosts(post_id))

  const { data:fourProducts, isLoading:loadingProducts, isError:productError, error:productErrorMsg } = useQuery(['product'], () => getFourProducts())

 

  return (
    <Container>
      <div className='header-div'>
        <h1 className='frontPage-h1'>Do you need new art for you walls?</h1>
        <hr />
        <h2 className='frontPage-h2'>News</h2>
      </div>
    
         {loadingPosts && (<p className='my-3'>Loading ...</p>)}

        {postError && (
            <Alert>
                <p>Oh no, error!</p>
                <p>{postErrorMsg.message}</p>
            </Alert>
        )}

        {fourPosts && (
            <>
          <div className='front-pagePosts'>
            <Row>
            {fourPosts.map(post => (
              <Col className='p-3' key={post.id} s={12} lg={6} xl={4}>
              <div>
              {post && ( 
                <img variant='top' alt="post" src={post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url } />
              )}  
              </div>
             <div>
                <h2 className='post-h2'>
                  {post.title.rendered}
                </h2>
                <Col
                dangerouslySetInnerHTML={{ __html: post.content.rendered}}>
                </Col>
                <Button className="mt-auto" as={Link} to={`posts/${post.id}`}>
                  Read more...
                </Button>
                <hr />
             </div>
             </Col>
            ))}
            </Row>
          </div>
            </>
        )}

{loadingProducts && (<p className='my-3'>Loading ...</p>)}

{productError && (
    <Alert>
        <p>Oh no, error!</p>
        <p>{productErrorMsg.message}</p>
    </Alert>
)}
<h2 className='frontPage-h2'>Art</h2>
{fourProducts && (
    <>
  <div className='front-pagePosts'>
    <Row>
    {fourProducts.map(product => (
      <>
      <Col className='p-3' key={product.id} s={12} lg={6} xl={4}>
      {product && ( 
        <img variant='top' alt="product" src={product._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url } />
      )}  
      
     <div>
        <h2 className='post-h2'>
          {product.title.rendered}
        </h2>
        <Button className='mt-auto' as={Link} to={`/products/${product.id}`} variant="primary">Look at</Button> 
        <hr />
     </div>
     </Col>
     </>
    ))}
    </Row>
  </div>
    </>
)} 


    </Container>
  )
}

export default FrontPage