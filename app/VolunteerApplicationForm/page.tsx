import React from 'react'
import VolunteerApplicationForm from './volunteerApplicationForm'

const page = () => {
  return (
    <div className="bg-cover bg-center min-h-screen" style={{backgroundImage: 'url("/front-page-image.png")'}}>
      <VolunteerApplicationForm />
    </div>
  )
}

export default page