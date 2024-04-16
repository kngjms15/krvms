"use client"

import React, { useEffect, useState } from "react";
import { Volunteer } from "@prisma/client";
import ConfirmationModal from "@/app/components/confirmationModal";
import AlertModal from "@/app/components/alertModal";
import { MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";

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
                {volunteer.chapter && <span><strong>Chapter</strong>: {volunteer.chapter}</span>}
              </h4>
              <h4 className="text-md my-2">
                <strong>Status</strong>:
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

              <h4 className="text-md"><strong>VolunteerID</strong>: {volunteer.volunteerId}</h4>
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
              <MdExpandLess size={36} />
            ) : (
              <MdExpandMore size={36} />
            )}
          </button>
          <button
            className="text-red-500 m-2"
            onClick={toggleModal}
            aria-label="Toggle Details"
          >
            <MdDelete size={36} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
      {volunteer && volunteer.createdAt && (
          <p className="text-gray-700 mt-2 font-normal">
            <strong>Application Date:&nbsp;</strong>{new Date(volunteer.createdAt).toDateString()}
          </p>
        )}
        {showDetails && (
          <>
            <p className="text-gray-700 mt-2"><strong>Address:&nbsp;</strong>{volunteer.address}</p>
            <p className="text-gray-700 mt-2"><strong>Email:&nbsp;</strong>{volunteer.email}</p>
            <p className="text-gray-700 mt-2">
              <strong>Primary Phone:&nbsp;</strong>{volunteer.primaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Secondary Phone:&nbsp;</strong>{volunteer.secondaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Name:&nbsp;</strong>{volunteer.emergencyContactName}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Phone:&nbsp;</strong>{volunteer.emergencyContactPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Relationship:&nbsp;</strong>
              {volunteer.emergencyContactRelationship}
            </p>
            <p className="text-gray-700 mt-2">
            <strong>Date of Birth:&nbsp;</strong>{new Date(volunteer.dob).toDateString()}
              <span>
                &nbsp;
                (<strong>{calculateAge(volunteer.dob)}</strong>, years old)
              </span>
            </p>
            <p className="text-gray-700 mt-2 text-wrap ">
              <strong>Medical Condition Details:&nbsp;</strong>{volunteer.medicalConditionDetails}
            </p>
            <p className="text-gray-700 mt-2 text-wrap">
              <strong>Volunteer Experience:&nbsp;</strong>{volunteer.volunteerExperienceDetails}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Conviction:&nbsp;</strong>{volunteer.conviction ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Bondable:&nbsp;</strong>{volunteer.bondable ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Medical Condition:&nbsp;</strong>{volunteer.medicalCondition ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Applicant Status:&nbsp;</strong>{volunteer.interviewStatus}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VolunteersList;
