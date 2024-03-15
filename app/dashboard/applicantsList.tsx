import React from 'react';

interface ApplicantsListProps {
  firstName: string;
  lastName: string;
  createdAt: Date;
  chapter: string;
}

const VolunteersList: React.FC<ApplicantsListProps> = ({
  firstName,
  lastName,
  createdAt,
  chapter,
}) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="text-xl">
        {firstName} {lastName}
      </h3>
      <h4 className="text-lg font-semibold">{chapter}</h4>
      <p className="text-gray-700 mt-2">Joined: {createdAt.toDateString()}</p>
    </div>
  );
};

export default VolunteersList;
