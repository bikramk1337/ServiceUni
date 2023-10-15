import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const BACKEND_URL = process.env.REACT_APP_AUTH_API_URL;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/api/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Store the token securely
        login(data.access_token);
        navigate('/');
      } else {
        setError(data.detail);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  }

  return (
    <div>
      <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
        Sign in
      </h1>

      {error && <p className="text-danger">{error}</p>}

      <Form className="col col-lg-4 col-8  mx-auto" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign in 
        </Button>
      </Form>
    </div>
  )
}
