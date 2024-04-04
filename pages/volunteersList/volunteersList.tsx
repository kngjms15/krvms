import React, { useEffect, useState } from "react";
import { Volunteer } from "@prisma/client";
import ConfirmationModal from "@/app/components/confirmationModal";
import { volunteerApplicationSchema } from "@/lib/schema";
import { z } from "zod";

interface VolunteersListProps {
  volunteer: Volunteer;
  onDelete?: (id: string) => void;
}

const VolunteersList: React.FC<VolunteersListProps> = ({
  volunteer,
  onDelete,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(volunteer.status);
  const [editableFields, setEditableFields] = useState<Volunteer>(volunteer);
  const [editing, setEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setStatus(volunteer.status);
    setEditableFields(volunteer);
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
          alert("Volunteer deleted successfully!");
        } else {
          console.error("Failed to delete volunteer:", response.status);
          alert("Failed to delete volunteer. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting volunteer:", error);
        alert("Error deleting volunteer. Please try again later.");
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
        alert("Status updated successfully!");
      } else {
        console.error("Failed to update status:", response.status);
        alert("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again later.");
    }
  };

  const handleEdit = () => {
    setEditing(!editing); // Toggle editing state
  };

  const handleSave = async () => {
    try {
      volunteerApplicationSchema.parse(editableFields);
      const response = await fetch(
        `/api/volunteers/${volunteer.volunteerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableFields),
        }
      );

      if (response.ok) {
        setEditing(false);
        setValidationErrors({});
        alert("Volunteer updated successfully!");
      } else {
        console.error("Failed to update volunteer:", response.status);
        alert("Failed to update volunteer. Please try again.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors.reduce((acc, err) => {
          if (err.path) {
            acc[err.path[0]] = err.message;
          }
          return acc;
        }, {} as Record<string, string>));
      } else {
        console.error("Error updating volunteer:", error);
        alert("Error updating volunteer. Please try again later.");
      }
    }
  };

  return (
    <div className="flex-grow m-auto my-2 bg-[#F2F2F2] rounded-lg p-3">
      <div className="flex justify-between flex-grow">
        {showModal && (
          <ConfirmationModal
            message="Are you sure you want to delete this volunteer?"
            onConfirm={handleDelete}
            onCancel={toggleModal}
          />
        )}
        {editing ? ( // Render input fields when editing is true
          <div className="flex-col">
            <input
              type="text"
              value={editableFields.firstName}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  firstName: e.target.value,
                })
              }
            />
            {/* Repeat this pattern for other fields */}
          </div>
        ) : ( // Render non-editable fields when editing is false
          <div className="flex-col">
            <h3 className="text-xl font-bold">
              {editableFields.firstName} {editableFields.lastName}
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
                <option value="Suspended">Suspended</option>
              </select>
            </h4>
            <h4 className="text-md">VolunteerID: {volunteer.volunteerId}</h4>
          </div>
        )}
        <div className="flex justify-end">
          {editing ? ( // Render save button when editing is true
            <button className="text-green-500 m-2" onClick={handleSave}>
              Save
            </button>
          ) : ( // Render edit button when editing is false
            <>
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
              <button className="text-green-500 m-2" onClick={handleEdit}>
                Edit
              </button>
            </>
          )}
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
            <p className="text-gray-700 mt-2">Address: {editableFields.address}</p>
            <p className="text-gray-700 mt-2">City: {editableFields.city}</p>
            <p className="text-gray-700 mt-2">Province: {editableFields.province}</p>
            <p className="text-gray-700 mt-2">Postal Code: {editableFields.postalCode}</p>
            <p className="text-gray-700 mt-2">Email: {editableFields.email}</p>
            <p className="text-gray-700 mt-2">Primary Phone: {editableFields.primaryPhone}</p>
            {editableFields.secondaryPhone && <p className="text-gray-700 mt-2">Secondary Phone: {editableFields.secondaryPhone}</p>}
            <p className="text-gray-700 mt-2">Employer: {editableFields.employer}</p>
            <p className="text-gray-700 mt-2">Convict? {editableFields.conviction ? "Yes" : "No"}</p>
            <p className="text-gray-700 mt-2">Bondable? {editableFields.bondable ? "Yes" : "No"}</p>
            <p className="text-gray-700 mt-2">Medical Condition? {editableFields.medicalCondition ? "Yes" : "No"}</p>
            {editableFields.medicalConditionDetails && <p className="text-gray-700 mt-2 text-wrap">Medical Condition Details: {editableFields.medicalConditionDetails}</p>}
            <p className="text-gray-700 mt-2">Emergency Contact Name: {editableFields.emergencyContactName}</p>
            <p className="text-gray-700 mt-2">Emergency Contact Relationship: {editableFields.emergencyContactRelationship}</p>
            <p className="text-gray-700 mt-2">Emergency Contact Phone: {editableFields.emergencyContactPhone}</p>
            {editableFields.volunteerExperienceDetails && <p className="text-gray-700 mt-2 text-wrap">Volunteer Experience Details: {editableFields.volunteerExperienceDetails}</p>}
            <p className="text-gray-700 mt-2">Interview Status: {editableFields.interviewStatus}</p>
            <p className="text-gray-700 mt-2">Status: {editableFields.status}</p>
            <p className="text-gray-700 mt-2">Role: {editableFields.role}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VolunteersList;
