import React, { useEffect, useState } from "react";
import { Volunteer } from "@prisma/client";
import { MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import ConfirmationModal from "./confirmationModal";
import EditVolunteerForm from "./EditVolunteerForm";

interface VolunteersListProps {
  volunteer: Volunteer;
}

const VolunteersList: React.FC<VolunteersListProps> = ({
  volunteer,
}) => {
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
        const response = await fetch(`/api/volunteers/${volunteer.volunteerId}`, {
          method: "DELETE",
        });

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
          <EditVolunteerForm volunteer={editVolunteer} onClose={() => setEditVolunteer(null)}/>
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
              {showDetails ? <MdExpandLess size={30} /> : <MdExpandMore size={30} />}
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
              <MdDelete size={20}/>
            </button>
          </>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {volunteer && volunteer.createdAt && (
          <p className="text-gray-700 mt-2">
            <strong>Registration Date: </strong>{new Date(volunteer.createdAt).toDateString()}
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
            <p className="text-gray-700 mt-2"><strong>Address: </strong>{volunteer.address}</p>
            <p className="text-gray-700 mt-2"><strong>City: </strong>{volunteer.city}</p>
            <p className="text-gray-700 mt-2"><strong>Province: </strong>{volunteer.province}</p>
            <p className="text-gray-700 mt-2">
              <strong>Postal Code: </strong>{volunteer.postalCode}
            </p>
            <p className="text-gray-700 mt-2"><strong>Email: </strong>{volunteer.email}</p>
            <p className="text-gray-700 mt-2">
              <strong>Primary Phone: </strong>{volunteer.primaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Secondary Phone: </strong>{volunteer.secondaryPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Name: </strong>{volunteer.emergencyContactName}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Phone: </strong>{volunteer.emergencyContactPhone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Contact Relationship: </strong>
              {volunteer.emergencyContactRelationship}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Medical Condition? </strong>{volunteer.medicalCondition ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Medical Condition Details: </strong>
              {volunteer.medicalConditionDetails}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Convict? </strong>{volunteer.conviction ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Bondable? </strong>{volunteer.bondable ? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2"><strong>Employer: </strong>{volunteer.employer}</p>
            <p className="text-gray-700 mt-2 text-wrap">
              <strong>VolunteerExperience(s):</strong>{" "}
              {volunteer.volunteerExperienceDetails}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Interview Status: </strong>{volunteer.interviewStatus}
            </p>
            <p className="text-gray-700 mt-2"><strong>Status: </strong>{volunteer.status}</p>
            <p className="text-gray-700 mt-2"><strong>Role: </strong>{volunteer.role}</p>
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

const VolunteersListPage: React.FC<VolunteersListPageProps> = ({ searchQuery, sortOption }) => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [sortedVolunteers, setSortedVolunteers] = useState<Volunteer[]>([]);

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
      {sortedVolunteers
        .filter((volunteer) =>
          volunteer.firstName .toLowerCase().includes(searchQuery.toLowerCase()) ||
          volunteer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          volunteer.chapter?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          volunteer.primaryPhone.toLowerCase().includes(searchQuery.toLowerCase()) 
        )
        .map((volunteer) => (
          volunteer && volunteer.firstName && (
            <VolunteersList key={volunteer.volunteerId} volunteer={volunteer} />
          )
        ))}
    </div>
  );
};


export default VolunteersListPage;
