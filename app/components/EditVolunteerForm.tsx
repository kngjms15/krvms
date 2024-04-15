import React, { useState } from "react";
import { Volunteer } from "@prisma/client";

interface EditVolunteerFormProps {
  volunteer: Volunteer;
  onClose: () => void;
}

const EditVolunteerForm: React.FC<EditVolunteerFormProps> = ({ volunteer, onClose }) => {
  const [editedVolunteer, setEditedVolunteer] = useState<Volunteer>({
    ...volunteer,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedVolunteer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call API to update volunteer information
    try {
      const response = await fetch(`/api/volunteers/${volunteer.volunteerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedVolunteer),
      });

      if (response.ok) {
        // Update the volunteer information in the state
        // You may also want to handle the update on the server side to ensure consistency
        console.log("Volunteer updated successfully!");
        onClose();
      } else {
        console.error("Failed to update volunteer:", response.status);
        alert("Failed to update volunteer. Please try again.");
      }
    } catch (error) {
      console.error("Error updating volunteer:", error);
      alert("Error updating volunteer. Please try again later.");
    }
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Volunteer</h2>
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input
                type="text"
                name="firstName"
                value={editedVolunteer.firstName}
                onChange={handleChange}
                />
            </label>
            <label>
                Last Name:
                <input
                type="text"
                name="lastName"
                value={editedVolunteer.lastName}
                onChange={handleChange}
                />
            </label>
            <label>
                Date of Birth:
                <input
                    type="date"
                    name="dob"
                    onChange={handleChange}
                />
            </label>
            <label>
                Address:
                <input
                type="text"
                name="address"
                value={editedVolunteer.address}
                onChange={handleChange}
                />
            </label>
            <label>
                City:
                <input
                type="text"
                name="city"
                value={editedVolunteer.city}
                onChange={handleChange}
                />
            </label>
            <label>
                Province:
                <input
                type="text"
                name="province"
                value={editedVolunteer.province}
                onChange={handleChange}
                />
            </label>
            <label>
                Postal Code:
                <input
                type="text"
                name="postalCode"
                value={editedVolunteer.postalCode}
                onChange={handleChange}
                />
            </label>
            <label>
                Chapter:
                <input
                type="text"
                name="chapter"
                value={editedVolunteer.chapter}
                onChange={handleChange}
                />
            </label>
            <label>
                Primary Phone:
                <input
                type="text"
                name="primaryPhone"
                value={editedVolunteer.primaryPhone}
                onChange={handleChange}
                />
            </label>
            <label>
                Secondary Phone:
                <input
                    type="text"
                    name="seconadryPhone"
                    value={editedVolunteer.secondaryPhone || ''}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                type="text"
                name="email"
                value={editedVolunteer.email}
                onChange={handleChange}
                />
            </label>
            <label>
                Employer:
                <input
                type="text"
                name="employer"
                value={editedVolunteer.employer}
                onChange={handleChange}
                />
            </label>
            <label>
                Volunteer Experience Details:
                <input
                    type="text"
                    name="volunteerExperienceDetails"
                    value={editedVolunteer.volunteerExperienceDetails ?? ''}
                    onChange={handleChange}
                />
            </label>
            <label>
                Criminal Conviction:
                <select>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </label>
            <label>
                Bondable:
                <select>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </label>
            <label>
                Medical Condition:
                <select>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </label>
            <label>
                :
                <input
                type="text"
                name="firstName"
                value={editedVolunteer.firstName}
                onChange={handleChange}
                />
            </label>
            <label>
                Emergency Contact Name:
                <input
                type="text"
                name="emergencyContactName"
                value={editedVolunteer.emergencyContactName}
                onChange={handleChange}
                />
            </label>
            <label>
                Emergency Contact Relationship:
                <input
                type="text"
                name="emergencyContactRelationship"
                value={editedVolunteer.emergencyContactRelationship}
                onChange={handleChange}
                />
            </label>
            <label>
                Emergency Contact Phone:
                <input
                type="text"
                name="emergencyContactPhone"
                value={editedVolunteer.emergencyContactPhone}
                onChange={handleChange}
                />
            </label>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVolunteerForm;
