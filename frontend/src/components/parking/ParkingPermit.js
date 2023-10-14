import React from 'react'
import { ParkingForm } from './ParkingForm'; 
 
export default function ParkingPermit() {
  return (
    <div>
      <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
       Get your parking permit
      </h1>
      <p className='pb-3 w-50 text-center mx-auto'>
        Apply for a parking permit by using the form below.
      </p>
      <ParkingForm />
    </div>
  )
}
