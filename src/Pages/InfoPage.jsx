import Container  from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { getInfo } from '../services/helper'

import "@wordpress/block-library/build-style/common.css"
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

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
      <div key={info.id} className='info-pagediv'>
          <h3>{info.title.rendered}</h3>
        <div>
          <p className='info-pageP' dangerouslySetInnerHTML={{ __html: info.content.rendered}}></p>
        </div>
      </div>
      ))}
      </>
    )}

    </Container>
  )
}

export default InfoPage