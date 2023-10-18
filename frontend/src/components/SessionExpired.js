import React from 'react';
import { Link } from "react-router-dom";

export default function SessionExpired() {
  return (
    <div className='content'>
      <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
        Session Expired
      </h1>
      <p>Your session has expired or the token is invalid. Please login to continue.</p>
      <Link to="/sign-in" className="btn btn-primary mt-4">Login</Link>
    </div>
  );
}
