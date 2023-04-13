import { Link } from 'react-router-dom'
import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const ProductCard = ({ data, onAddToCart }) => {

  const placeholderImg = "https://www.miragia-project.se/wp-content/uploads/2023/04/IMG_1339-scaled.jpg"

  return (
    <div className="d-flex flex-wrap justify-content-between">
  
    {data.map(product => (
        <Card className='w-2 p-3 mt-6 productCard' key={product.id}>
              {product && ( 
                <Card.Img variant='top' src={product.featured_media === 0 ? placeholderImg  : product._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url } />
              )}  
            <Card.Body className='d-flex flex-column'>
                <Card.Title><strong>{product.title.rendered}</strong></Card.Title>
                <Card.Text><strong>Price:</strong> {product.acf.price_on_a_product}<strong> kr</strong></Card.Text>
                 <Button className='mt-auto' as={Link} to={`/products/${product.id}`} variant="primary">Look at</Button> 
                <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
                
            </Card.Body>
        </Card>
    ))}
</div>
  )
}

export default ProductCard