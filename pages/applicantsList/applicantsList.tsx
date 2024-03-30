import React, { useState } from "react";
import { VolunteerApplicant } from "@prisma/client";
import ConfirmationModal from "@/app/components/confirmationModal";

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

const ApplicantsList: React.FC<ApplicantsListProps> = ({
  applicant,
  onDelete,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = async () => {
    toggleModal();
    if (applicant) {
      try {
        const response = await fetch(
          `/api/applicants/${applicant.applicantId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          onDelete?.(parseInt(applicant.applicantId, 10));
          // Handle successful deletion (e.g., update state or notify user)
          alert("Applicant deleted successfully!");
        } else {
          console.error("Failed to delete applicant:", response.status);
          alert("Failed to delete applicant. Please try again.");
          // Handle deletion failure (e.g., show error message)
        }
      } catch (error) {
        console.error("Error deleting applicant:", error);
        alert("Error deleting applicant. Please try again later.");
      }
    }
  };

  return (
    <div className="flex-grow max-w-[940px] m-auto my-2 bg-[#F2F2F2] rounded-lg p-3">
      <div className=" flex justify-between flex-grow ">
        {showModal && (
          <ConfirmationModal
            message="Are you sure you want to delete this applicant?"
            onConfirm={handleDelete}
            onCancel={toggleModal}
          />
        )}
        {applicant && (
          <>
            <div className=" flex-col ">
              <h3 className="text-xl font-bold">
                {applicant.firstName} {applicant.lastName}
              </h3>
              <h4 className="text-md font-semibold">
                {applicant && applicant.chapter && (
                  <h4 className="text-lg font-semibold">
                    Chapter: {applicant.chapter}
                  </h4>
                )}
              </h4>
              <h4 className="text-md">Status: {applicant.interviewStatus}</h4>
              <h4 className="text-md">ApplicantID: {applicant.applicantId}</h4>
            </div>
          </>
        )}
        <div className="flex justify-end ">
          <button
            className="text-blue-500 m-2"
            onClick={toggleDetails}
            aria-label="Toggle Details"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          <button
            className="text-red-500 m-2"
            onClick={toggleModal}
            aria-label="Toggle Details"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {applicant && applicant.createdAt && (
          <p className="text-gray-700 mt-2">
            Application Date: {new Date(applicant.createdAt).toDateString()}
          </p>
        )}
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
              Convict? {applicant.conviction ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              Bondable? {applicant.bondable ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              Medical Condition? {applicant.medicalCondition ? "Yes" : "No"}
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
