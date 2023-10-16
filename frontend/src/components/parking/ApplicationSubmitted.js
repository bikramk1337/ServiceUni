import React from 'react'
import { Link } from "react-router-dom";
 
export default function ApplicationSubmitted() {
  return (
    <div className='content'>
     <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
       Thank you
     </h1>
     <p>Your application has been sent and will be processed within 2-5 business days</p>
     <Link to="/" className="btn btn-primary mt-4">Back to homepage</Link>
    </div>
  )
}
