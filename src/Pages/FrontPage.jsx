import React from 'react'
import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import { useQuery } from 'react-query'
import { getFourPosts } from '../services/helper'
import { getFourProducts } from '../services/helper'

const FrontPage = () => {
  
  const { data:fourPosts, isLoading:loadingPosts, isError:postError, error:postErrorMsg } = useQuery(['post'], () => getFourPosts())

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
            {fourPosts.map(post => (
              <div key={post.id}>
              <div>
              {post && ( 
                <img variant='top' alt="post" src={post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url } />
              )}  
              </div>
             <div>
                <h2 className='post-h2'>
                  {post.title.rendered}
                </h2>
                <article
                dangerouslySetInnerHTML={{ __html: post.content.rendered}}>
                </article>
                <hr />
             </div>
             </div>
            ))}
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
    {fourProducts.map(product => (
      <div key={product.id}>
      <div>
      {product && ( 
        <img variant='top' alt="product" src={product._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url } />
      )}  
      </div>
     <div>
        <h2 className='post-h2'>
          {product.title.rendered}
        </h2>
        <hr />
     </div>
     </div>
    ))}
  </div>
    </>
)} 


    </Container>
  )
}

export default FrontPage