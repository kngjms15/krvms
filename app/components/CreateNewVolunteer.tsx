"use client";

import React, { useState } from "react";
import provinceChapters from "../provinceChapters.json";
import { Volunteer } from "@prisma/client";

interface CreateNewVolunteerProps {
  onClose: () => void;
}

const CreateNewVolunteer: React.FC<CreateNewVolunteerProps> = ({ onClose }) => {
  const [showCreateVolunteerModal, setShowCreateVolunteerModal] =
    useState(true);
  const [newVolunteer, setNewVolunteer] = useState({
    firstName: "",
    lastName: "",
    role: "Event Volunteer",
    dob: new Date(),
    address: "",
    city: "",
    province: "",
    postalCode: "",
    chapter: "",
    primaryPhone: "",
    secondaryPhone: "",
    email: "",
    employer: "",
    conviction: false,
    bondable: false,
    medicalCondition: false,
    medicalConditionDetails: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    volunteerExperienceDetails: "",
    interviewStatus: "Pending",
    status: "Active",
  });

  const [selectedProvince, setSelectedProvince] = useState("");
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const selectedProvinceChapters =
    provinceChapters.find(
      (provinceObj) => provinceObj.province === selectedProvince
    )?.chapters || [];

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setNewVolunteer((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newVolunteerResponse = await fetch(`/api/createNewVolunteer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVolunteer),
      });

      if (newVolunteerResponse.ok) {
        const newVolunteerData = await newVolunteerResponse.json();
        setVolunteers([...volunteers, newVolunteerData]);
        alert("Volunteer created successfully!");
        onClose();
      } else {
        console.error(
          "Failed to create volunteer:",
          newVolunteerResponse.status
        );
        alert("Failed to create volunteer. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating volunteer:", error);
      alert("Error creating volunteer. Please try again later.");
    }
  };

  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const dob = new Date(newVolunteer.dob).toDateString();

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="bg-[#F2F2F2] flex-grow max-w-[940px] p-6 rounded-lg w-96 h-[80vh] overflow-y-auto">
        <div className="flex justify-center items-center p-5">
          <h2 className="text-xxl font-bold mb-4">Create New Volunteer</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 ">
          <div className="flex flex-col ">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
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
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dob">
              Date of Birth {dob && `(Age: ${calculateAge(dob)})`}{" "}
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              max={"9999-12-31"}
            />
          </div>
          <div className="flex flex-col"></div>
          <div className="flex flex-col">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
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
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="conviction">Conviction: </label>
            <select
              id="conviction"
              name="conviction"
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
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
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
              Add Volunteer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewVolunteer;
