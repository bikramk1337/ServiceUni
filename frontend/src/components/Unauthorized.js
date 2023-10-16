import React from 'react'
import { Link } from "react-router-dom";
 
export default function Unauthorized() {
  return (
    <div>
     <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
       Unauthorized
     </h1>
     <p>You're not authorized to access this page!</p>
     <Link to="/" className="btn btn-primary mt-4">Back to homepage</Link>
    </div>
  )
}
