import React from 'react'
import { useParams } from 'react-router-dom'
import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import { useQuery } from 'react-query'
import { getInfo } from '../services/helper'

const InfoPage = () => {
  const { info_id } = useParams()
  const { data, isLoading, isError, error } = useQuery(['info', info_id], () => getInfo(info_id))
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
      {data.map(info => (
      <div className='product-pageProduct'>
          <h3>{info.title.rendered}</h3>
        <div>
          <p className='product-pageP' dangerouslySetInnerHTML={{ __html: info.content.rendered}}></p>
        </div>
      </div>
      ))}
      </>
    )}

    </Container>
  )
}

export default InfoPage