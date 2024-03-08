import React, { use, useEffect } from "react";
import { set } from "zod";

type FormData = {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  cityInfo: string;
  province: string;
  postalCode: string;
  chapter: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  employer: string;
  conviction: boolean;
  bondable: boolean;
  medicalCondition: boolean;
  medicalConditionDetails: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  volunteerExperienceDetails: string;
};
console.log("formData", FormData);

type ApplicationSummaryProps = {
  formData: FormData;
  onBack: () => void;
  setCurrentStep: (step: number) => void;
};

const ApplicationSummary: React.FC<ApplicationSummaryProps> = ({
  formData,
  onBack,
  setCurrentStep,
}) => {
  const handleSubmit = () => {
    setCurrentStep(4);
    console.log("formData", formData);
  };

  return (
    <div className="flex-grow max-w-[940px] m-auto my-6 bg-[#F2F2F2] rounded-lg p-8">
      <h2 className="text-lg font-bold mb-4">Form Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Display each form field */}
        <div>
          <strong>First Name:</strong> {formData.firstName}
        </div>
        <div>
          <strong>Last Name:</strong> {formData.lastName}
        </div>
        <div>
          <strong>Date of Birth:</strong> {formData.dob}
        </div>
        <div>
          <strong>Address:</strong> {formData.address}
        </div>
        <div>
          <strong>City:</strong> {formData.cityInfo}
        </div>
        <div>
          <strong>Province:</strong> {formData.province}
        </div>
        <div>
          <strong>Postal Code:</strong> {formData.postalCode}
        </div>
        <div>
          <strong>Chapter:</strong> {formData.chapter}
        </div>
        <div>
          <strong>Primary Phone:</strong> {formData.primaryPhone}
        </div>
        <div>
          <strong>Secondary Phone:</strong> {formData.secondaryPhone}
        </div>
        <div>
          <strong>Email:</strong> {formData.email}
        </div>
        <div>
          <strong>Employer:</strong> {formData.employer}
        </div>
        <div>
          <strong>Volunteer Experience Details</strong> {formData.volunteerExperienceDetails}
        </div>
        <div>
          <strong>Conviction:</strong> {formData.conviction ? "Yes" : "No"}
        </div>
        <div>
          <strong>Bondable:</strong> {formData.bondable ? "Yes" : "No"}
        </div>
        <div>
          <strong>Medical Condition:</strong>{" "}
          {formData.medicalCondition ? "Yes" : "No"}
        </div>
        <div>
          <strong>Medical Condition Details:</strong>{" "}
          {formData.medicalConditionDetails}
        </div>
        <div>
          <strong>Emergency Contact Name:</strong>{" "}
          {formData.emergencyContactName}
        </div>
        <div>
          <strong>Emergency Contact Relationship:</strong>{" "}
          {formData.emergencyContactRelationship}
        </div>
        <div>
          <strong>Emergency Contact Phone:</strong>{" "}
          {formData.emergencyContactPhone}
        </div>
      </div>

      <div className="flex justify-between mt-20">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ApplicationSummary;
