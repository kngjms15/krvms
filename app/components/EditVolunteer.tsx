'use client'

import React, { useState, useEffect } from "react";
import { Volunteer } from "@prisma/client";
import { volunteerApplicationSchema } from "@/lib/schema";
import { z } from "zod";
import { useRouter } from "next/router";

interface EditVolunteerProps {
  volunteerId: string;
}

const useFetchVolunteer = (volunteerId: string) => {
  const [editableFields, setEditableFields] = useState<Volunteer | null>(null);

  useEffect(() => {
    const fetchVolunteer = async () => {
      if (volunteerId) {
        try {
          const response = await fetch(`/api/volunteers/${volunteerId}`);
          if (response.ok) {
            const data = await response.json();
            setEditableFields(data);
          } else {
            console.error("Failed to fetch volunteer data");
          }
        } catch (error) {
          console.error("Error fetching volunteer data:", error);
        }
      }
    };

    fetchVolunteer();
  }, [volunteerId]);

  return editableFields;
};

const EditVolunteer: React.FC<EditVolunteerProps> = ({ volunteerId }) => {
  const [editableFields, setEditableFields] = useState<Volunteer | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const router = useRouter();

  useEffect(() => {
    const fetchVolunteer = async () => {
      if (volunteerId) {
        try {
          const response = await fetch(`/api/volunteers/${volunteerId}`);
          if (response.ok) {
            const data = await response.json();
            setEditableFields(data);
          } else {
            console.error("Failed to fetch volunteer data");
          }
        } catch (error) {
          console.error("Error fetching volunteer data:", error);
        }
      }
    };

    fetchVolunteer();
  }, [volunteerId, router]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Validate the input editableFields
      volunteerApplicationSchema.parse(editableFields);
      // Update the volunteer
      const response = await fetch(`/api/volunteers/${volunteerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableFields),
      });

      if (response.ok) {
        alert("Volunteer updated successfully!");
        const data = await response.json();
        setEditableFields(data);
        router.push("/pages/volunteersList"); // Redirect to the home page or any other page after successful update
      } else {
        console.error("Failed to update volunteer:", response.status);
        alert("Failed to update volunteer. Please try again.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(
          error.errors.reduce((acc, err) => {
            if (err.path) {
              acc[err.path[0]] = err.message;
            }
            return acc;
          }, {} as Record<string, string>)
        );
      } else {
        console.error("Error updating volunteer:", error);
        alert("Error updating volunteer. Please try again later.");
      }
    }
  };

  if (!editableFields) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Volunteer</h1>
      <p>Volunteer ID: {volunteerId}</p>
      <form
        key="editForm"
        onSubmit={handleSave}
        className="flex-grow grid grid-cols-2 gap-2"
      >
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={editableFields.firstName}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={editableFields.lastName}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={editableFields.address}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={editableFields.city}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  city: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="province">Province:</label>
            <input
              type="text"
              id="province"
              value={editableFields.province}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  province: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              value={editableFields.postalCode}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  postalCode: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={editableFields.email}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="primaryPhone">Primary Phone:</label>
            <input
              type="tel"
              id="primaryPhone"
              value={editableFields.primaryPhone}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  primaryPhone: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="secondaryPhone">Secondary Phone:</label>
            <input
              type="tel"
              id="secondaryPhone"
              value={editableFields.secondaryPhone ?? ""}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  secondaryPhone: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="employer">Employer:</label>
            <input
              type="text"
              id="employer"
              value={editableFields.employer}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  employer: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="conviction">Conviction</label>
            <select
              id="conviction"
              value={editableFields.conviction.toString()}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  conviction: e.target.value === "true",
                })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="bondable">Bondable?</label>
            <select
              id="bondable"
              value={editableFields.bondable.toString()}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  bondable: e.target.value === "true",
                })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="medicalCondition">Medical Condition?</label>
            <select
              id="medicalCondition"
              value={editableFields.medicalCondition.toString()}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  medicalCondition: e.target.value === "true",
                })
              }
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
              value={editableFields.medicalConditionDetails ?? ""}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  medicalConditionDetails: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="emergencyContactName">
              Emergency Contact Name:
            </label>
            <input
              type="text"
              id="emergencyContactName"
              value={editableFields.emergencyContactName}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  emergencyContactName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="emergencyContactRelationship">
              Emergency Contact Relationship:
            </label>
            <input
              type="text"
              id="emergencyContactRelationship"
              value={editableFields.emergencyContactRelationship}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  emergencyContactRelationship: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="emergencyContactPhone">
              Emergency Contact Phone:
            </label>
            <input
              type="tel"
              id="emergencyContactPhone"
              value={editableFields.emergencyContactPhone}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  emergencyContactPhone: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="volunteerExperienceDetails">
              Volunteer Experience Details:
            </label>
            <input
              type="text"
              id="volunteerExperienceDetails"
              value={editableFields.volunteerExperienceDetails ?? ""}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  volunteerExperienceDetails: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="interviewStatus">Interview Status:</label>
            <input
              type="text"
              id="interviewStatus"
              value={editableFields.interviewStatus}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  interviewStatus: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="status">Status:</label>
            <input
              type="text"
              id="status"
              value={editableFields.status}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  status: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              value={editableFields.role}
              className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
              onChange={(e) =>
                setEditableFields({
                  ...editableFields,
                  role: e.target.value,
                })
              }
            />
          </div>
          <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditVolunteer;
