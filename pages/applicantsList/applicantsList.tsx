import { VolunteerApplicant } from '@prisma/client';
import React from 'react';

interface ApplicantsListProps {
  // firstName: string;
  // lastName: string;
  // createdAt: Date;
  // chapter: string;
  applicant: VolunteerApplicant
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({
  // firstName,
  // lastName,
  // createdAt,
  // chapter,
  applicant
}) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="text-xl">
        {applicant.firstName} {applicant.lastName}
      </h3>
      <h4 className="text-lg font-semibold">{applicant.chapter}</h4>
      <p className="text-gray-700 mt-2">Joined: {new Date(applicant.createdAt).toDateString()}</p>
      <p className="text-gray-700 mt-2">Email: {applicant.email}</p>
    </div>
  );
};

export default ApplicantsList;
