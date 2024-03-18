import React, { useState } from "react";
import { VolunteerApplicant } from "@prisma/client";

interface ApplicantsListProps {
  applicant: VolunteerApplicant;
  onDelete?: (id: number) => void;
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

const ApplicantsList: React.FC<ApplicantsListProps> = ({ applicant, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = async () => {
    

    try {
      const response = await fetch(`/api/applicants/${applicant.applicantId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete?.(applicant.applicantId);
        // Handle successful deletion (e.g., update state or notify user)
      } else {
        console.error("Failed to delete applicant:", response.status);
        alert("Failed to delete applicant. Please try again.");
        // Handle deletion failure (e.g., show error message)
      }
    } catch (error) {
      console.error("Error deleting applicant:", error);
      alert("Error deleting applicant. Please try again later.");
    }    
  };

  return (
    <div className="flex-grow max-w-[940px] m-auto my-2 bg-[#F2F2F2] rounded-lg p-3">
      <div className=" flex justify-between flex-grow ">
        <h3 className="text-xl font-bold">
          {applicant.firstName} {applicant.lastName}
        </h3>
        <h4 className="text-lg font-semibold">Status: {applicant.interviewStatus}</h4>
        <h4 className="text-lg font-semibold">ApplicantID: {applicant.applicantId}</h4>
        <div className="flex justify-end ">
          <button className="text-blue-500 m-2" onClick={toggleDetails} aria-label="Toggle Details">
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          <button className="text-red-500 m-2" onClick={handleDelete} aria-label="Toggle Details">
            Delete
          </button>
        </div>
      </div>
      <h4 className="text-lg font-semibold">Chapter: {applicant.chapter}</h4>
      <div className="grid grid-cols-2 gap-1">
        <p className="text-gray-700 mt-2">
          Application Date: {new Date(applicant.createdAt).toDateString()}
        </p>
        {showDetails && (
          <>
            <p className="text-gray-700 mt-2">Address: {applicant.address}</p>
            <p className="text-gray-700 mt-2">Email: {applicant.email}</p>
            <p className="text-gray-700 mt-2">
              Phone: {applicant.primaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              Secondary Phone: {applicant.secondaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              Emergency Contact Name: {applicant.emergencyContactName}
            </p>
            <p className="text-gray-700 mt-2">
              Emergency Contact Phone: {applicant.emergencyContactPhone}
            </p>
            <p className="text-gray-700 mt-2">
              Emergency Contact Relationship:{" "}
              {applicant.emergencyContactRelationship}
            </p>
            <p className="text-gray-700 mt-2">
              Date of Birth: {new Date(applicant.dob).toDateString()}
              <span>
                {" "}
                (<strong>{calculateAge(applicant.dob)}</strong>, years old)
              </span>
            </p>
            <p className="text-gray-700 mt-2 text-wrap ">
              Medical condition details: {applicant.medicalConditionDetails}
            </p>
            <p className="text-gray-700 mt-2 text-wrap">
              VolunteerExperience(s): {applicant.volunteerExperienceDetails}
            </p>
            <p className="text-gray-700 mt-2">
              Convict? {applicant.conviction}
            </p>
            <p className="text-gray-700 mt-2">Bondable? {applicant.bondable}</p>
            <p className="text-gray-700 mt-2">
              Medical Condition? {applicant.medicalCondition}
            </p>
            <p className="text-gray-700 mt-2">
              Applicant Status: {applicant.interviewStatus}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;
