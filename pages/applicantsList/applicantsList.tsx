import { VolunteerApplicant } from '@prisma/client';
import React from 'react';

interface ApplicantsListProps {
  applicant: VolunteerApplicant
}

const calculateAge = (dob: Date) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ApplicantsList: React.FC<ApplicantsListProps> = ({
  applicant
}) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="text-xl">
        {applicant.firstName} {applicant.lastName}
      </h3>
      <h4 className="text-lg font-semibold">Chapter: {applicant.chapter}</h4>
      <div className='grid grid-cols-2 gap-1'>
      <p className="text-gray-700 mt-2">Joined: {new Date(applicant.createdAt).toDateString()}</p>
      <p className="text-gray-700 mt-2">Address: {applicant.address}</p>
      <p className="text-gray-700 mt-2">Email: {applicant.email}</p>
      <p className="text-gray-700 mt-2">Phone: {applicant.primaryPhone}</p>
      <p className="text-gray-700 mt-2">Secondary Phone: {applicant.secondaryPhone}</p>
      <p className='text-gray-700 mt-2'>Emergency Contact Name: {applicant.emergencyContactName}</p>
      <p className='text-gray-700 mt-2'>Emergency Contact Phone: {applicant.emergencyContactPhone}</p>
      <p className='text-gray-700 mt-2'>Emergency Contact Relationship: {applicant.emergencyContactRelationship}</p>
      <p className='text-gray-700 mt-2'>Date of Birth: {new Date(applicant.dob).toDateString()}<span> (<strong>{calculateAge(applicant.dob)}</strong>, years old)</span></p>
      <p className='text-gray-700 mt-2'>Medical condition details: {applicant.medicalConditionDetails}</p>
      <p className='text-gray-700 mt-2'>VolunteerExperience(s): {applicant.volunteerExperienceDetails}</p>
      <p className='text-gray-700 mt-2'>Convict? {applicant.conviction}</p>
      <p className='text-gray-700 mt-2'>Bondable? {applicant.bondable}</p>
      <p className='text-gray-700 mt-2'>Medical Condition? {applicant.medicalCondition}</p>
      <p className='text-gray-700 mt-2'>Applicant Status: {applicant.interviewStatus}</p>
      </div>
    </div>
  );
};

export default ApplicantsList;
