import React from 'react'
import { useParams } from 'react-router-dom'
import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import { useQuery } from 'react-query'
import { getPost } from '../services/helper'
import "@wordpress/block-library/build-style/common.css"
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

const PostPage = () => {
    const { post_id } = useParams()
    const { data, isLoading, isError, error } = useQuery(['post', post_id], () => getPost(post_id))

    const placeholderImg = "https://www.miragia-project.se/wp-content/uploads/2023/04/IMG_1339-scaled.jpg"

  return (
    <>
    <Container className='container-all'>
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
          <img src={data.featured_media === 0 ? placeholderImg  : data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url } alt="post" />
        </div>
        <div className='post-pagePost'>
          <h3 className='post-h3'>{data.title.rendered}</h3>
        <div>
          <p className='product-pageP' dangerouslySetInnerHTML={{ __html: data.content.rendered}}
          ></p>
        </div>
        <span className='post-span'>
         Published: {data.date} | By {data._embedded.author[0].name}
         <h3> Categories:
         {data._embedded['wp:term'][0].map(cats => {
          return cats.name
         })}
         </h3>
         Tags:
         {data._embedded['wp:term'][1] == []? null: data._embedded['wp:term'][1].map(tags => {
          return tags.name
         }) }
         
         
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