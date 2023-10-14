import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
  return (
    <div>
      <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
       Sign in
      </h1>

      <Form className="col col-lg-4 col-8  mx-auto">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign in 
      </Button>
    </Form>
    </div>
  )
}
