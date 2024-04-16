import React, { useEffect, useState } from "react";
import { PrismaClient, VolunteerApplicant } from "@prisma/client";
import ConfirmationModal from "@/app/components/confirmationModal";
import FilterComponent from "./applicantsFilter";
import { MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";

interface ApplicantsListProps {
  applicant: VolunteerApplicant;
  onDelete?: (id: number) => void;
}
const prisma = new PrismaClient();
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
  const [status, setStatus] = useState(applicant?.interviewStatus || "");
  const [applicants, setApplicants] = useState<VolunteerApplicant[]>([]);

  useEffect(() => {
    setStatus(applicant.interviewStatus);
  }, [applicant]);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const handleDelete = async () => {
    toggleModal();
    if (applicant && applicant.applicantId) {
      try {
        const response = await fetch(
          `/api/applicants/${applicant.applicantId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          onDelete?.(parseInt(applicant.applicantId, 10));
          // Remove the deleted applicant from the state
          setApplicants((prevApplicants) =>
            prevApplicants.filter(
              (a) => a.applicantId !== applicant.applicantId
            )
          );
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
  const handleStatusChange = async (newStatus: string, applicantId: string) => {
    try {
      const response = await fetch(`/api/applicants/${applicantId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interviewStatus: newStatus,
        }),
      });
      if (response.ok) {
        if (newStatus === "Accepted") {
          // Fetch the updated applicant data
          const updatedApplicantResponse = await fetch(
            `/api/applicants/${applicantId}`
          );
          const updatedApplicant = await updatedApplicantResponse.json();
          // Create a new volunteer based on the accepted applicant
          const newVolunteerResponse = await fetch(`/api/volunteers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: updatedApplicant.firstName,
              lastName: updatedApplicant.lastName,
              role: "Event Volunteer",
              dob: new Date(), // Set the dob to a default value or retrieve it from the applicant
              address: updatedApplicant.address,
              city: updatedApplicant.city,
              province: updatedApplicant.province,
              postalCode: updatedApplicant.postalCode,
              chapter: updatedApplicant.chapter,
              primaryPhone: updatedApplicant.primaryPhone,
              secondaryPhone: updatedApplicant.secondaryPhone,
              email: updatedApplicant.email,
              employer: updatedApplicant.employer,
              conviction: updatedApplicant.conviction,
              bondable: updatedApplicant.bondable,
              medicalCondition: updatedApplicant.medicalCondition,
              medicalConditionDetails: updatedApplicant.medicalConditionDetails,
              emergencyContactName: updatedApplicant.emergencyContactName,
              emergencyContactRelationship:
                updatedApplicant.emergencyContactRelationship,
              emergencyContactPhone: updatedApplicant.emergencyContactPhone,
              volunteerExperienceDetails:
                updatedApplicant.volunteerExperienceDetails,
              interviewStatus: updatedApplicant.interviewStatus,
              status: "Active", // Set the status to Active for a new volunteer
            }),
          });
          // Delete the applicant from the list
          await fetch(`/api/applicants/${applicantId}`, {
            method: "DELETE",
          });
          // Update the status in the UI
          setStatus(newStatus);
          alert("Status updated successfully!");
          if (newVolunteerResponse.ok) {
            alert("Applicant added as a volunteer successfully!");
          } else {
            console.error(
              "Failed to add applicant as a volunteer:",
              newVolunteerResponse.status
            );
            alert("Failed to add applicant as a volunteer. Please try again.");
          }
        } else {
          alert("Status updated successfully!");
        }
      } else {
        console.error("Failed to update status:", response.status);
        alert("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again later.");
    }
  };
  return (
    <div className="flex-grow m-auto my-2 bg-[#F2F2F2] rounded-lg p-3">
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
                {applicant.chapter && <span>Chapter: {applicant.chapter}</span>}
              </h4>
              <h4 className="text-md my-2">
                Status:
                <select
                  className="border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-[#6CC24A] focus:border-transparent"
                  value={status}
                  onChange={(e) =>
                    handleStatusChange(e.target.value, applicant.applicantId)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </h4>
            </div>
          </>
        )}
        <div className="flex justify-end ">
          <button
            className="text-blue-500 m-2"
            onClick={toggleDetails}
            aria-label="Toggle Details"
          >
            {showDetails ? (
              <MdExpandLess size={30} />
            ) : (
              <MdExpandMore size={30} />
            )}
          </button>
          <button
            className="text-red-500 m-2"
            onClick={toggleModal}
            aria-label="Toggle Details"
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {applicant && applicant.createdAt && (
          <p className="text-gray-700">
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

interface ApplicantsListPageProps {
  searchQuery: string;
  sortOption: string;
}

const ApplicantsListPage: React.FC<ApplicantsListPageProps> = ({ searchQuery, sortOption }) => {
  const [applicants, setApplicants] = useState<VolunteerApplicant[]>([]);
  const [sortedApplicants, setSortedApplicants] = useState<VolunteerApplicant[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch("/api/applicants");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setApplicants(data);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

  useEffect(() => {
    let sorted = [...applicants];
    if (sortOption === "name") {
      sorted = sorted.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
    } else if (sortOption === "chapter") {
      sorted = sorted.sort((a, b) =>
        a.chapter.localeCompare(b.chapter)
      );
    } else if (sortOption === "province") {
      sorted = sorted.sort((a, b) =>
        a.province.localeCompare(b.province)
      );
    } else if (sortOption === "city") {
      sorted = sorted.sort((a, b) =>
        a.city.localeCompare(b.city)
      );
    }

    setSortedApplicants(sorted);
  }, [applicants, sortOption]);

  return (
    <div className="flex-grow m-auto">
      {sortedApplicants
        .filter((applicant) =>
          applicant.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          applicant.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          applicant.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          applicant.primaryPhone.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((applicant) => (
          applicant && applicant.firstName && (
            <ApplicantsList key={applicant.applicantId} applicant={applicant} />
          )
        ))}
    </div>
  );
};

export default ApplicantsListPage;
