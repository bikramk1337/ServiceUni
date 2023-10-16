 import React from 'react'
 import { ApplicationForm } from './ApplicationForm'
 
 export default function IdCard() {
   return (
     <div className='content'>
      <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
        Get your ID card
      </h1>
      <p className='pb-3 w-50 text-center mx-auto'>
        Apply for a ID card by using the form below.
      </p>
      <ApplicationForm />
     </div>
   )
 }
 