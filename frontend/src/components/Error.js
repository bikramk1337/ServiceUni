import React from 'react'
import { Link } from "react-router-dom";
 
export default function Error() {
  return (
    <div className='content'>
     <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
       Yikes
     </h1>
     <p>Our dev team has done an oopsie, we hope to be up and running again soon!</p>
     <Link to="/" className="btn btn-primary mt-4">Back to homepage</Link>
    </div>
  )
}
