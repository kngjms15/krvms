import React, { useState } from "react";
import { PrismaClient, VolunteerApplicant } from "@prisma/client";
import ConfirmationModal from "@/app/components/confirmationModal";

interface ApplicantsListProps {
  applicant: VolunteerApplicant;
  onDelete?: (id: number) => void;
}

const calculateAge = (dob: Date): number => {
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  if (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate())) {
    return age - 1;
  }
  return age;
};

const ApplicantsList: React.FC<ApplicantsListProps> = ({ applicant, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const toggleDetails = () => setShowDetails(!showDetails);

  const handleDelete = async () => {
    toggleModal();
    if (applicant) {
      try {
        const response = await fetch(`/api/applicants/${applicant.applicantId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          onDelete?.(parseInt(applicant.applicantId, 10));
          alert("Applicant deleted successfully!");
        } else {
          console.error("Failed to delete applicant:", response.status);
          alert("Failed to delete applicant. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting applicant:", error);
        alert("Error deleting applicant. Please try again later.");
      }
    }
  };

  return (
    <div className="flex-grow m-auto my-2 bg-[#F2F2F2] rounded-lg p-3">
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this applicant?"
          onConfirm={handleDelete}
          onCancel={toggleModal}
        />
      )}
      {applicant && applicant.lastName && applicant.chapter && applicant.firstName && applicant.lastName &&(
        <>
          <div className=" flex-col ">
            <h3 className="text-xl font-bold">
              {applicant.firstName} {applicant.lastName}
            </h3>
            <h4 className="text-md font-semibold">
              {applicant.chapter && <span>Chapter: {applicant.chapter}</span>}
            </h4>
            <h4 className="text-md my-2">Status: {applicant.interviewStatus}</h4>
          </div>
        </>
      )}
      <div className="flex justify-end ">
        <button className="text-blue-500 m-2" onClick={toggleDetails} aria-label="Toggle Details">
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
        <button className="text-red-500 m-2" onClick={toggleModal} aria-label="Toggle Details">
          Delete
        </button>
      </div>
      {showDetails && (
        <div className="grid grid-cols-2 gap-1">
          <p className="text-gray-700">Application Date: {new Date(applicant.createdAt).toDateString()}</p>
          <p className="text-gray-700 mt-2">Address: {applicant.address}</p>
          <p className="text-gray-700 mt-2">Email: {applicant.email}</p>
          <p className="text-gray-700 mt-2">Phone: {applicant.primaryPhone}</p>
          <p className="text-gray-700 mt-2">Secondary Phone: {applicant.secondaryPhone}</p>
          <p className="text-gray-700 mt-2">Emergency Contact Name: {applicant.emergencyContactName}</p>
          <p className="text-gray-700 mt-2">Emergency Contact Phone: {applicant.emergencyContactPhone}</p>
          <p className="text-gray-700 mt-2">Emergency Contact Relationship: {applicant.emergencyContactRelationship}</p>
          <p className="text-gray-700 mt-2">Date of Birth: {new Date(applicant.dob).toDateString()} (<strong>{calculateAge(applicant.dob)}</strong>, years old)</p>
          <p className="text-gray-700 mt-2 text-wrap">Medical condition details: {applicant.medicalConditionDetails}</p>
          <p className="text-gray-700 mt-2 text-wrap">VolunteerExperience(s): {applicant.volunteerExperienceDetails}</p>
          <p className="text-gray-700 mt-2">Convict? {applicant.conviction ? "Yes" : "No"}</p>
          <p className="text-gray-700 mt-2">Bondable? {applicant.bondable ? "Yes" : "No"}</p>
          <p className="text-gray-700 mt-2">Medical Condition? {applicant.medicalCondition ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicantsList;
