import React, { useEffect, useState } from "react";
import { Volunteer } from "@prisma/client";
import { MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import EditVolunteerForm from "./EditVolunteerForm";
import ConfirmationModal from "./ConfirmationModal";

interface VolunteersListProps {
  volunteer: Volunteer;
}

const VolunteersList: React.FC<VolunteersListProps> = ({ volunteer }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reloadComponent, setReloadComponent] = useState<boolean>(false);
  const [editVolunteer, setEditVolunteer] = useState<Volunteer | null>(null);

  const handleEdit = (volunteer: Volunteer) => {
    setEditVolunteer(volunteer);
  };

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
          // Remove deleted volunteer from the state
          alert("Volunteer deleted successfully!");
          window.location.reload();
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

  return (
    <div
      key={reloadComponent ? "reload" : "no-reload"}
      className="flex-grow m-auto my-2 bg-[#F2F2F2] rounded-lg p-3"
    >
      <div className="flex justify-between flex-grow">
        {editVolunteer && (
          <EditVolunteerForm
            volunteer={editVolunteer}
            onClose={() => setEditVolunteer(null)}
          />
        )}
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
        </div>
        <div className="flex justify-end">
          <>
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
              className="text-green-400 m-2"
              aria-label="Edit Volunteer"
              onClick={() => handleEdit(volunteer)}
            >
              <AiOutlineEdit size={20} />
            </button>
            <button
              className="text-red-500 m-2"
              onClick={toggleModal}
              aria-label="Delete Volunteer"
            >
              <MdDelete size={20} />
            </button>
          </>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {volunteer && volunteer.createdAt && (
          <p className="text-gray-700 mt-2">
            <strong>Registration Date: </strong>
            {new Date(volunteer.createdAt).toDateString()}
          </p>
        )}
        {showDetails && (
          <>
            <p className="text-gray-700 mt-2">
              <strong>Date of Birth: </strong>{" "}
              {new Date(volunteer.dob).toDateString()}
              <span>
                (<strong>{calculateAge(volunteer.dob)}</strong>, years old)
              </span>
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Address: </strong>
              {volunteer.address}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>City: </strong>
              {volunteer.city}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Province: </strong>
              {volunteer.province}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Postal Code: </strong>
              {volunteer.postalCode}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Email: </strong>
              {volunteer.email}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Primary Phone: </strong>
              {volunteer.primaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Secondary Phone: </strong>
              {volunteer.secondaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Name: </strong>
              {volunteer.emergencyContactName}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Phone: </strong>
              {volunteer.emergencyContactPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Relationship: </strong>
              {volunteer.emergencyContactRelationship}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Medical Condition? </strong>
              {volunteer.medicalCondition ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Medical Condition Details: </strong>
              {volunteer.medicalConditionDetails}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Convict? </strong>
              {volunteer.conviction ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Bondable? </strong>
              {volunteer.bondable ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Employer: </strong>
              {volunteer.employer}
            </p>
            <p className="text-gray-700 mt-2 text-wrap">
              <strong>VolunteerExperience(s):</strong>{" "}
              {volunteer.volunteerExperienceDetails}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Interview Status: </strong>
              {volunteer.interviewStatus}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Status: </strong>
              {volunteer.status}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Role: </strong>
              {volunteer.role}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

interface VolunteersListPageProps {
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
        <span className="text-gray-700 text-lg mt-2">
          Loading volunteers! Please wait one moment...
        </span>
      </div>
    </div>
  );
};

const VolunteersListPage: React.FC<VolunteersListPageProps> = ({
  searchQuery,
  sortOption,
}) => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [sortedVolunteers, setSortedVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("/api/volunteers");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setVolunteers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch volunteers:", error);
        setIsLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  useEffect(() => {
    let sorted = [...volunteers];

    if (sortOption === "name") {
      sorted = sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortOption === "chapter") {
      sorted = sorted.sort((a, b) => a.chapter?.localeCompare(b.chapter || ""));
    } else if (sortOption === "city") {
      sorted = sorted.sort((a, b) => a.city.localeCompare(b.city));
    } else if (sortOption === "province") {
      sorted = sorted.sort((a, b) => a.province.localeCompare(b.province));
    }

    setSortedVolunteers(sorted);
  }, [volunteers, sortOption]);

  return (
    <div className="flex-grow m-auto ">
      {isLoading ? (
        <Loading />
      ) : (
        sortedVolunteers
          .filter(
            (volunteer) =>
              volunteer.firstName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              volunteer.lastName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              volunteer.chapter
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              volunteer.email
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              volunteer.primaryPhone
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .map(
            (volunteer) =>
              volunteer &&
              volunteer.firstName && (
                <VolunteersList
                  key={volunteer.volunteerId}
                  volunteer={volunteer}
                />
              )
          )
      )}
    </div>
  );
};

export default VolunteersListPage;
