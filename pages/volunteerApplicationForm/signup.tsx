import React, { useState } from 'react';
// import VolunteerApplicationForm from '@/app/components/volunteerApplicationForm';
import VolunteerApplicationForm from './page';

const SignUpPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div>
      {showForm ? (
        // When showForm is true, only the VolunteerApplicationForm is rendered
        <VolunteerApplicationForm />
      ) : (
        // When showForm is false, show the button and other content
        <>
          <h1>Become a Volunteer</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleShowForm}
          >
            Sign Up
          </button>
          {/* Add any other content you want to disappear here */}
        </>
      )}
    </div>
  );
};

export default SignUpPage;
