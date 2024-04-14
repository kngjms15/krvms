import React, { useEffect, useState } from "react";
import { Volunteer } from "@prisma/client";
import ConfirmationModal from "@/app/components/ConfirmationModal";

interface VolunteersListProps {
  volunteer: Volunteer;
}

const VolunteersList: React.FC<VolunteersListProps> = ({
  volunteer,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(volunteer.status);
  const [reloadComponent, setReloadComponent] = useState<boolean>(false);

  useEffect(() => {
    if (!reloadComponent) {
      setStatus(volunteer.status);
    }
  }, [volunteer, reloadComponent]);

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
        const response = await fetch(`/api/volunteers/${volunteer.volunteerId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove deleted volunteer from the state
          alert("Volunteer deleted successfully!");
          console.log("Reloading component...");
          setReloadComponent((prev) => !prev);
          console.log("Reloaded component!");
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

  return (
    <div
      key={reloadComponent ? "reload" : "no-reload"}
      className="flex-grow m-auto my-2 bg-[#F2F2F2] rounded-lg p-3"
    >
      <div className="flex justify-between flex-grow">
        {showModal && (
          <ConfirmationModal
            message="Are you sure you want to delete this volunteer?"
            onConfirm={handleDelete}
            onCancel={toggleModal}
          />
        )}
        <div className="flex-col">
          <h3 className="text-xl font-bold">
            {volunteer.firstName} {volunteer.lastName}
          </h3>
          <h4 className="text-md font-semibold">
            {volunteer.chapter && <span>Chapter: {volunteer.chapter}</span>}
          </h4>
          <h4 className="text-md my-2">Status: {volunteer.status}</h4>
          <h4 className="text-md">VolunteerID: {volunteer.volunteerId}</h4>
        </div>
        <div className="flex justify-end">
          <>
            <button
              className="text-blue-500 m-2"
              onClick={toggleDetails}
              aria-label="Toggle Details"
            >
              {showDetails ? "Hide Details" : "Show Details"}
            </button>
            <button
              className="text-green-400 m-2"
              aria-label="Edit Volunteer"
            >
              Edit
            </button>
            <button
              className="text-red-500 m-2"
              onClick={toggleModal}
              aria-label="Delete Volunteer"
            >
              Delete
            </button>
          </>
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
            <p className="text-gray-700 mt-2">
              Postal Code: {volunteer.postalCode}
            </p>
            <p className="text-gray-700 mt-2">Email: {volunteer.email}</p>
            <p className="text-gray-700 mt-2">
              Primary Phone: {volunteer.primaryPhone}
            </p>
            {volunteer.secondaryPhone && (
              <p className="text-gray-700 mt-2">
                Secondary Phone: {volunteer.secondaryPhone}
              </p>
            )}
            <p className="text-gray-700 mt-2">Employer: {volunteer.employer}</p>
            <p className="text-gray-700 mt-2">
              Convict? {volunteer.conviction ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              Bondable? {volunteer.bondable ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              Medical Condition? {volunteer.medicalCondition ? "Yes" : "No"}
            </p>
            {volunteer.medicalConditionDetails && (
              <p className="text-gray-700 mt-2 text-wrap">
                Medical Condition Details: {volunteer.medicalConditionDetails}
              </p>
            )}
            <p className="text-gray-700 mt-2">
              Emergency Contact Name: {volunteer.emergencyContactName}
            </p>
            <p className="text-gray-700 mt-2">
              Emergency Contact Relationship:{" "}
              {volunteer.emergencyContactRelationship}
            </p>
            <p className="text-gray-700 mt-2">
              Emergency Contact Phone: {volunteer.emergencyContactPhone}
            </p>
            {volunteer.volunteerExperienceDetails && (
              <p className="text-gray-700 mt-2 text-wrap">
                Volunteer Experience Details:{" "}
                {volunteer.volunteerExperienceDetails}
              </p>
            )}
            <p className="text-gray-700 mt-2">
              Interview Status: {volunteer.interviewStatus}
            </p>
            <p className="text-gray-700 mt-2">Status: {volunteer.status}</p>
            <p className="text-gray-700 mt-2">Role: {volunteer.role}</p>
          </>
        )}
      </div>
    </div>
  );
};

const VolunteersListPage: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("/api/volunteers");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        console.error("Failed to fetch volunteers:", error);
      }
    };

    fetchVolunteers();
  }, []);

  return (
    <div className="flex-grow m-auto">
      {volunteers.map((volunteer) => (
        volunteer && volunteer.firstName && (
        <VolunteersList key={volunteer.volunteerId} volunteer={volunteer} />
        )
      ))}
    </div>
  );
};

export default VolunteersListPage;
