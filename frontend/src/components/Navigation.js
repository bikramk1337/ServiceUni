import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Nav, Navbar, Offcanvas, NavDropdown} from 'react-bootstrap';
import { useAuth } from './AuthContext';  
import { getUser, isAdmin,  } from './Utils';
import { useState, useEffect } from 'react';

function signout(){
  localStorage.clear();
}

export default function Navigation() {
  const { isLoggedIn } = useAuth();

  const [isAdminUser, setIsAdmin] = useState()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    var admin = isAdmin();
    setIsAdmin(admin);

    var user = getUser();
    if(user){
      setUserName(user.first_name)
    }
  }, [isLoggedIn])

  return (
    <>
    <div className='mb-5 nav-header'>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} collapseOnSelect className="bg-primary navbar-dark p-3">
          <Container fluid>
            <Navbar.Brand as={Link} to="/"><b>ServiceUni</b></Navbar.Brand>
            <div>
              {isLoggedIn ?
                <a className='text-white p-3' style={{textDecoration:"none"}}>Hi, {userName}! </a> : null
              }
              {isLoggedIn ?
                <Navbar.Toggle/> : null 
              }
              
            </div>

            <Navbar.Offcanvas placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className='text-primary'>Services</Offcanvas.Title>
              </Offcanvas.Header>
              
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1">
                  <NavDropdown title="Parking Permit" id="collapsible-nav-dropdown">
                    { !isAdminUser ? <NavDropdown.Item as={Link} to="/parking-permit" eventKey="1">Apply</NavDropdown.Item> : null }
                    { !isAdminUser ? <NavDropdown.Item as={Link} to="/my-permits" eventKey="1">My permits</NavDropdown.Item> : null }
                    { isAdminUser ? <NavDropdown.Item as={Link} to='/pending-applications' eventKey="3" className='mb-0'>Pending applications</NavDropdown.Item> : null }
                    { isAdminUser ? <NavDropdown.Item as={Link} to='/active-permits' eventKey="3" className='mb-0'>Active permits</NavDropdown.Item> : null }
                  </NavDropdown>
                  <NavDropdown title="ID Card" id="collapsible-nav-dropdown-ID">
                    { !isAdminUser ? <NavDropdown.Item as={Link} to="/id-card" eventKey="1">Apply</NavDropdown.Item> : null}
                    { isAdminUser ? <NavDropdown.Item as={Link} to='/pending-IDs' eventKey="3" className='mb-0'>Pending requests</NavDropdown.Item> : null}
                    { isAdminUser ? <NavDropdown.Item as={Link} to='/processed-requests' eventKey="3" className='mb-0'>Processed requests</NavDropdown.Item> : null}
                  </NavDropdown>
                  <Nav.Link href="http://localhost:3001" target="_blank" rel="noopener noreferrer" eventKey="3">Library</Nav.Link>             
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      {isLoggedIn ? <a onClick={signout} href="/" className='text-muted d-flex justify-content-end me-4 mt-3'>Sign out</a> : null}
      </div>
    </>
  )
}
