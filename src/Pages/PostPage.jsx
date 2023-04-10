import React from 'react'
import { useParams } from 'react-router-dom'
import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import { useQuery } from 'react-query'
import { getPost } from '../services/helper'

const PostPage = () => {
    const { post_id } = useParams()
    const { data, isLoading, isError, error } = useQuery(['post', post_id], () => getPost(post_id))
  return (
    <>
    <Container>
      {isLoading && (<p className='my-3'>Loading ...</p>)}

      {isError && (
        <Alert>
        <p>Oh no, error!</p>
        <p>{error.message}</p>
    </Alert>)}

    {data && (
      <>
      <div className='post-wrapper'>
        <div className='post-pagePost-img'>
          <img src={data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url} alt="" />
        </div>
        <div className='post-pagePost'>
          <h3 className='post-h3'>{data.title.rendered}</h3>
        <div>
          <p className='product-pageP' dangerouslySetInnerHTML={{ __html: data.content.rendered}}
          ></p>
        </div>
        <span className='post-span'>
         Published: {data.date} | By {data.author}
        </span>
        </div>
      </div>
      </>
    )}

    </Container>
    </>
  )
}

export default PostPage