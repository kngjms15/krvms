import React, { use, useEffect, useState } from "react";
import { Volunteer } from "@prisma/client";
import provinceChapters from "../provinceChapters.json";

interface EditVolunteerFormProps {
  volunteer: Volunteer;
  onClose: () => void;
}

const EditVolunteerForm: React.FC<EditVolunteerFormProps> = ({
  volunteer,
  onClose,
}) => {
  const [editedVolunteer, setEditedVolunteer] = useState<Volunteer>({
    ...volunteer,
    province: volunteer.province || "",
    chapter: volunteer.chapter || "",
  });
  const [selectedProvince, setSelectedProvince] = useState(
    editedVolunteer.province
  );
  const [reload, setReload] = useState(false);

  

  useEffect(() => {
    setSelectedProvince(editedVolunteer.province);
  }, [editedVolunteer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedVolunteer((prev) => ({ ...prev, [name]: value }));
  };

  const triggerReload = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const fetchVolunteerData = async () => {
      // fetch updated volunteer data or perform any other actins
      const response = await fetch(`/api/volunteers/${volunteer.volunteerId}`);
      if (response.ok) {
        const updatedVolunteer = await response.json();
        setEditedVolunteer(updatedVolunteer);
      } else {
        console.error("Failed to fetch updated volunteer data:", response.status);
      }
    };
    fetchVolunteerData();
  }, [reload]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`/api/volunteers/${volunteer.volunteerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedVolunteer),
    });

    if (response.ok) {
      console.log("Volunteer updated successfully!");
      onClose();
      window.location.reload();
    } else {
      console.error("Failed to update volunteer:", response.status);
      alert("Failed to update volunteer. Please try again.");
    }
  };
  
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setEditedVolunteer((prev) => ({
      ...prev,
      province: e.target.value,
      chapter: "",
    }));
  };

  const selectedProvinceChapters =
    provinceChapters.find(
      (provinceObj) => provinceObj.province === selectedProvince
    )?.chapters || [];

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
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="bg-[#F2F2F2] flex-grow max-w-[940px] p-6 rounded-lg w-96 h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Volunteer</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 ">
          <div className="flex flex-col ">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={editedVolunteer.firstName}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={editedVolunteer.lastName}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dob">Date of Birth:</label>
            <p className="text-lg text-gray-500">
              {new Date(editedVolunteer.dob).toDateString()}{" "}
              <span>
                (<strong>{calculateAge(editedVolunteer.dob)}</strong> Years old)
              </span>
            </p>
          </div>
          <div className="flex flex-col"></div>
          <div className="flex flex-col">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={editedVolunteer.address}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={editedVolunteer.city}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="province">Province:</label>
            <select
              id="province"
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={handleProvinceChange}
              value={editedVolunteer.province}
            >
              <option value="" hidden>
                Select your province
              </option>
              {provinceChapters.map((provinceObj) => (
                <option key={provinceObj.province} value={provinceObj.province}>
                  {provinceObj.province}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="chapter">Chapter:</label>
            <select
              id="chapter"
              name="chapter"
              value={editedVolunteer.chapter}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            >
              {selectedProvinceChapters.map((chapter, index) => (
                <option key={index} value={chapter}>
                  {chapter}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={editedVolunteer.postalCode}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col"></div>
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedVolunteer.email}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col"></div>
          <div className="flex flex-col">
            <label htmlFor="phone">Primary Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={editedVolunteer.primaryPhone}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="secondaryPhone">Secondary Phone:</label>
            <input
              type="text"
              id="secondaryPhone"
              name="secondaryPhone"
              value={editedVolunteer.secondaryPhone || ""}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="emergencyContact">Emergency Contact Name:</label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={editedVolunteer.emergencyContactName}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="emergencyContactRelationship">Relationship:</label>
            <input
              type="text"
              id="emergencyContactRelationship"
              name="emergencyContactRelationship"
              value={editedVolunteer.emergencyContactRelationship}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="emergencyPhone">Emergency Phone:</label>
            <input
              type="text"
              id="emergencyPhone"
              name="emergencyPhone"
              value={editedVolunteer.emergencyContactPhone}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col"></div>
          <div className="flex flex-col">
            <label htmlFor="medicalCondition">Medical Condition:</label>
            <select
              id="medicalCondition"
              name="medicalCondition"
              value={editedVolunteer.medicalCondition.toString()} // Convert boolean to string
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="medicalConditionDetails">
              Medical Condition Details:
            </label>
            <input
              type="text"
              id="medicalConditionDetails"
              name="medicalConditionDetails"
              value={editedVolunteer.medicalConditionDetails ?? ""}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="conviction">Conviction: </label>
            <select
              id="conviction"
              name="conviction"
              value={editedVolunteer.conviction.toString()} // Convert boolean to string
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="bondable">Bondable: </label>
            <select
              id="bondable"
              name="bondable"
              value={editedVolunteer.bondable.toString()} // Convert boolean to string
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="employer">Employer:</label>
            <input
              type="text"
              id="employer"
              name="employer"
              value={editedVolunteer.employer ?? ""}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="volunteerExperienceDetails">
              Volunteer Experience(s):
            </label>
            <input
              type="text"
              id="volunteerExperienceDetails"
              name="volunteerExperienceDetails"
              value={editedVolunteer.volunteerExperienceDetails ?? ""}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={editedVolunteer.status}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={editedVolunteer.role}
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            >
              <option value="eventVolunteer">Event Volunteer</option>
              <option value="committeeVolunteer">Committee Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-between mt-4 col-span-2 ">
            <button
              type="button"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#6CC24A] text-white px-4 py-2 rounded"
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
