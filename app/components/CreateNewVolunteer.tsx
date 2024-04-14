"use client";

import React, { useState } from "react";
import provinceChapters from "../provinceChapters.json";

const CreateNewVolunteer: React.FC = () => {
  const [showCreateVolunteerModal, setShowCreateVolunteerModal] =
    useState(true);
  const [newVolunteer, setNewVolunteer] = useState({
    firstName: "",
    lastName: "",
    role: "Event Volunteer",
    dob: new Date().toISOString().split("T")[0], // Set the dob to a default value or retrieve it from the applicant
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
    interviewStatus: "Accepted",
    status: "Active", // Set the status to Active for a new volunteer
  });
  const [selectedProvince, setSelectedProvince] = useState("");
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
      const newVolunteerResponse = await fetch(`/api/volunteers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVolunteer),
      });

      if (newVolunteerResponse.ok) {
        alert("Volunteer created successfully!");
      } else {
        console.error(
          "Failed to create volunteer:",
          newVolunteerResponse.status
        );
        alert("Failed to create volunteer. Please try again.");
      }
    } catch (error) {
      console.error("Error creating volunteer:", error);
      alert("Error creating volunteer. Please try again later.");
    }
  };

  return (
    <>
      <form
        className="flex-grow max-w-[940px] bg-[#F2F2F2] m-auto my-6 rounded-lg p-8 max-h-[80vh] overflow-y-auto shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <div className="block text-center my-5 ">
            <h1 className="font-bold ">Create New Volunteer</h1>
          </div>

          <div className="flex-grow grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="province"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Province <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  id="province"
                  className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  onChange={handleProvinceChange}
                  value={selectedProvince}
                >
                  <option value="" hidden>
                    Select your province
                  </option>
                  {provinceChapters.map((provinceObj) => (
                    <option
                      key={provinceObj.province}
                      value={provinceObj.province}
                    >
                      {provinceObj.province}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="chapter"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Chapter <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  id="chapter"
                  className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                >
                  {selectedProvinceChapters.map((chapter, index) => (
                    <option key={index} value={chapter}>
                      {chapter}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="postalCode">Postal Code:</label>
              <input
                type="text"
                id="postalCode"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="primaryPhone">Primary Phone:</label>
              <input
                type="tel"
                id="primaryPhone"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="secondaryPhone">Secondary Phone:</label>
              <input
                type="tel"
                id="secondaryPhone"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="employer">Employer:</label>
              <input
                type="text"
                id="employer"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="volunteerExperienceDetails">
                Volunteer Experience Details:
              </label>
              <input
                type="text"
                id="volunteerExperienceDetails"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="conviction">Conviction:</label>
              <select
                id="conviction"
                name="conviction"
                onChange={handleChange}
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="bondable">Bondable:</label>
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
              <label htmlFor="medicalCondition">Medical Condition:</label>
              <select
                id="medicalCondition"
                name="medicalCondition"
                onChange={handleChange}
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="medicalConditionDetails">
                Medical Condition Details:
              </label>
              <input
                type="text"
                id="medicalConditionDetails"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
          </div>
          <div className="flex flex-grow">
            <hr className="flex-grow h-px my-8 bg-gray-300 border-0 dark:bg-gray-700 " />
          </div>
          <div className="block text-center my-5 ">
              <h1 className=" font-medium ">Emergency Contact</h1>
            </div>
          <div className="flex-grow grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="relationship">Relationship:</label>
              <input
                type="text"
                id="relationship"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="emergencyPhone">Emergency Phone:</label>
              <input
                type="tel"
                id="emergencyPhone"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-grow">
          <hr className="flex-grow h-px my-8 bg-gray-300 border-0 dark:bg-gray-700 " />
        </div>
        <div className="flex-grow grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <label htmlFor="interviewStatus">Interview Status:</label>
            <select
              id="interviewStatus"
              name="interviewStatus"
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            >
              <option value="Accepted">Accepted</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              onChange={handleChange}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between my-5">
          <button
            className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
            onClick={() => setShowCreateVolunteerModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
          >
            Create Volunteer
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateNewVolunteer;
