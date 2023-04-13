import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { Link, NavLink } from 'react-router-dom'

import { useQuery } from 'react-query'

import { getMenu } from '../services/helper'


const Navigation = () => {

  const { data, isLoading, isError, error} = useQuery(['menu',], () => getMenu())
  console.log("menu",data)
  return (
    <Navbar bg="dark" variant="dark" expand="md">
    <Container>
    {isLoading && (<p className='my-3'>Loading ...</p>)}

      {isError && (
        <Alert>
          <p>Oh no, error!</p>
          <p>{error.message}</p>
        </Alert>)}
        
      <Navbar.Brand as={Link} to="/">Art Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      {data &&(
        <Nav className="ms-auto">
        
          {data.map(menu =>(
            <Nav.Link as={NavLink} key={menu.id} end to={menu.title.rendered} 
             dangerouslySetInnerHTML={{ __html: menu.excerpt.rendered}}
            ></Nav.Link>
          ))}
          
        </Nav>
      )}
      </Navbar.Collapse>
      
    </Container>
  </Navbar>
  )
}

export default Navigation