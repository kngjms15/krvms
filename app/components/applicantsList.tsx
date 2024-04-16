import React, { Component, useEffect, useState } from "react";
import { PrismaClient, VolunteerApplicant } from "@prisma/client";
import ConfirmationModal from "@/app/components/confirmationModal";
import FilterComponent from "./applicantsFilter";
import { MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";
import { set } from "zod";

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
          window.location.href = "/dashboard?activeTab=applicants";
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
                <strong>Status: </strong>
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
            <strong>Application Date:</strong>{" "}
            {new Date(applicant.createdAt).toDateString()}
          </p>
        )}
        {showDetails && (
          <>
            <p className="text-gray-700 mt-2">
              <strong>Date of Birth: </strong>{" "}
              {new Date(applicant.dob).toDateString()}
              <span>
                (<strong>{calculateAge(applicant.dob)}</strong>, years old)
              </span>
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Address: </strong> {applicant.address}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>City:</strong> {applicant.city}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Province:</strong> {applicant.province}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Postal Code:</strong> {applicant.postalCode}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Email:</strong> {applicant.email}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Phone:</strong> {applicant.primaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Secondary Phone:</strong> {applicant.secondaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Name: </strong>
              {applicant.emergencyContactName}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Phone: </strong>
              {applicant.emergencyContactPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Relationship: </strong>
              {applicant.emergencyContactRelationship}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Medical Condition?</strong>{" "}
              {applicant.medicalCondition ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2 text-wrap ">
              <strong>Medical condition details: </strong>
              {applicant.medicalConditionDetails}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Convict?</strong> {applicant.conviction ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Bondable?</strong> {applicant.bondable ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Employer:</strong> {applicant.employer}
            </p>
            <p className="text-gray-700 mt-2 text-wrap">
              <strong>VolunteerExperience(s):</strong>{" "}
              {applicant.volunteerExperienceDetails}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Applicant Status:</strong> {applicant.interviewStatus}
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

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-auto h-48">
      <div role="status" className="flex flex-col items-center justify-center">
        <svg
          aria-hidden="true"
          className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-[#6CC24A]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="text-gray-700 text-lg mt-2">Loading applicants! Please wait one moment...</span>
      </div>
    </div>
  );
};


const ApplicantsListPage: React.FC<ApplicantsListPageProps> = ({
  searchQuery,
  sortOption,
}) => {
  const [applicants, setApplicants] = useState<VolunteerApplicant[]>([]);
  const [sortedApplicants, setSortedApplicants] = useState<
    VolunteerApplicant[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch("/api/applicants");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setApplicants(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  useEffect(() => {
    let sorted = [...applicants];
    if (sortOption === "name") {
      sorted = sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortOption === "chapter") {
      sorted = sorted.sort((a, b) => a.chapter.localeCompare(b.chapter));
    } else if (sortOption === "province") {
      sorted = sorted.sort((a, b) => a.province.localeCompare(b.province));
    } else if (sortOption === "city") {
      sorted = sorted.sort((a, b) => a.city.localeCompare(b.city));
    }

    setSortedApplicants(sorted);
  }, [applicants, sortOption]);

  return (
    <div className="flex-grow m-auto">
      {isLoading ? (
        <Loading />
      ) : (
        sortedApplicants
          .filter(
            (applicant) =>
              applicant.firstName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              applicant.lastName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              applicant.chapter
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              applicant.email
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              applicant.primaryPhone
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .map(
            (applicant) =>
              applicant &&
              applicant.firstName && (
                <ApplicantsList
                  key={applicant.applicantId}
                  applicant={applicant}
                />
              )
          )
      )}
    </div>
  );
};

export default ApplicantsListPage;
