import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Nav, Navbar, Offcanvas, NavDropdown} from 'react-bootstrap';


export default function Navigation() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} collapseOnSelect className="bg-primary mb-5 navbar-dark p-3">
          <Container fluid>
            <Navbar.Brand as={Link} to="/"><b>ServiceUni</b></Navbar.Brand>
            <Navbar.Toggle/>
            
            <Navbar.Offcanvas placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className='text-primary'>Services</Offcanvas.Title>
              </Offcanvas.Header>
              
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown title="Parking Permit" id="collapsible-nav-dropdown">
                    <NavDropdown.Item> 
                      <Nav.Link as={Link} to="/parking-permit" eventKey="1">Apply</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to='/pending-applications' eventKey="3" className='mb-0'>Pending applications</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to='/active-permits' eventKey="3" className='mb-0'>Active permits</Nav.Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to='/id-card' eventKey="2">ID Card</Nav.Link>
                  <Nav.Link as={Link} to='/library' eventKey="3">Library</Nav.Link>
                  <Nav.Link as={Link} to='/sign-in' eventKey="3" className='mb-0'>Sign in</Nav.Link>                  
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}
