"use client"

import React, { useEffect, useState } from "react";
import { Volunteer } from "@prisma/client";
import ConfirmationModal from "@/app/components/confirmationModal";
import AlertModal from "@/app/components/alertModal";

interface VolunteersListProps {
  volunteer: Volunteer;
  onDelete?: (id: string) => void;
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

const VolunteersList: React.FC<VolunteersListProps> = ({
  volunteer,
  onDelete,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(volunteer.status);
  const [alertTitle, setAlertTitle] = useState("KidsForSport Management");
  const [alertBody, setAlertBody] = useState("Please wait a moment...");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setStatus(volunteer.status);
  }, [volunteer]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = async () => {
    toggleModal();
    if (volunteer) {
      try {
        const response = await fetch(
          `/api/volunteers/${volunteer.volunteerId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          onDelete?.(volunteer.volunteerId);
          // Handle successful deletion (e.g., update state or notify user)
          setAlertBody("Volunteer deleted successfully!");
        } else {
          console.error("Failed to delete volunteer:", response.status);
          setAlertBody("Failed to delete volunteer. Please try again.");
          // Handle deletion failure (e.g., show error message)
        }
      } catch (error) {
        console.error("Error deleting volunteer:", error);
        setAlertBody("Error deleting volunteer. Please try again later.");
      }
    }
  };

  const handleStatusChange = async (newStatus: string, volunteerId: string) => {
    try {
      const response = await fetch(`/api/volunteers/${volunteerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (response.ok) {
        setStatus(newStatus);
        setAlertBody("Status updated successfully!");
      } else {
        console.error("Failed to update status:", response.status);
        setAlertBody("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setAlertBody("Error updating status. Please try again later.");
    }
  };

  return (
    <div className="flex-grow m-auto my-2 bg-[#F2F2F2] rounded-lg p-3">
      <div className=" flex justify-between flex-grow ">
        {showAlert &&  
          <AlertModal title={alertTitle} body={alertBody} onClick={()=>setShowAlert(false)}/>
        }
        {showModal && (
          <ConfirmationModal
            message="Are you sure you want to delete this volunteer?"
            onConfirm={handleDelete}
            onCancel={toggleModal}
          />
        )}
        {volunteer && (
          <>
            <div className=" flex-col ">
              <h3 className="text-xl font-bold">
                {volunteer.firstName} {volunteer.lastName}
              </h3>
              <h4 className="text-md font-semibold">
                {volunteer.chapter && <span>Chapter: {volunteer.chapter}</span>}
              </h4>
              <h4 className="text-md my-2">
                Status:
                <select
                  className="border border-gray-300 rounded p-1"
                  value={status}
                  onChange={(e) =>
                    handleStatusChange(e.target.value, volunteer.volunteerId)
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </h4>

              <h4 className="text-md">VolunteerID: {volunteer.volunteerId}</h4>
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
        {volunteer && volunteer.createdAt && (
          <p className="text-gray-700 mt-2">
            Registration Date: {new Date(volunteer.createdAt).toDateString()}
          </p>
        )}
        {showDetails && (
          <>
            <p className="text-gray-700 mt-2">Address: {volunteer.address}</p>
            <p className="text-gray-700 mt-2">City: {volunteer.city}</p>
            <p className="text-gray-700 mt-2">Province: {volunteer.province}</p>
            <p className="text-gray-700 mt-2">Postal Code: {volunteer.postalCode}</p>
            <p className="text-gray-700 mt-2">Email: {volunteer.email}</p>
            <p className="text-gray-700 mt-2">Primary Phone: {volunteer.primaryPhone}</p>
            {volunteer.secondaryPhone && <p className="text-gray-700 mt-2">Secondary Phone: {volunteer.secondaryPhone}</p>}
            <p className="text-gray-700 mt-2">Employer: {volunteer.employer}</p>
            <p className="text-gray-700 mt-2">Convict? {volunteer.conviction ? "Yes" : "No"}</p>
            <p className="text-gray-700 mt-2">Bondable? {volunteer.bondable ? "Yes" : "No"}</p>
            <p className="text-gray-700 mt-2">Medical Condition? {volunteer.medicalCondition ? "Yes" : "No"}</p>
            {volunteer.medicalConditionDetails && <p className="text-gray-700 mt-2 text-wrap">Medical Condition Details: {volunteer.medicalConditionDetails}</p>}
            <p className="text-gray-700 mt-2">Emergency Contact Name: {volunteer.emergencyContactName}</p>
            <p className="text-gray-700 mt-2">Emergency Contact Relationship: {volunteer.emergencyContactRelationship}</p>
            <p className="text-gray-700 mt-2">Emergency Contact Phone: {volunteer.emergencyContactPhone}</p>
            {volunteer.volunteerExperienceDetails && <p className="text-gray-700 mt-2 text-wrap">Volunteer Experience Details: {volunteer.volunteerExperienceDetails}</p>}
            <p className="text-gray-700 mt-2">Interview Status: {volunteer.interviewStatus}</p>
            <p className="text-gray-700 mt-2">Status: {volunteer.status}</p>
            <p className="text-gray-700 mt-2">Role: {volunteer.role}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VolunteersList;
