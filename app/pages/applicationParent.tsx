import React, { useState } from "react";
import VolunteerInfo from "./volunteerInfo";
import BackgroundInfo from "./backgroundInfo";
import ApplicationSummary from "./applicationSummary";
import Acknowledgement from "./acknowledgement";
import WhatsNext from "./whatsNext";

const ApplicationParent = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>({
    // VolunteerInfo fields
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    cityInfo: "",
    province: "",
    postalCode: "",
    chapter: "",
    primaryPhone: "",
    secondaryPhone: "",
    email: "",
    // BackgroundInfo fields
    employer: "",
    conviction: false,
    convictionDetails: "",
    bondable: true,
    medicalCondition: false,
    medicalConditionDetails: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    volunteerExperienceDetails: "",
  });

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      {currentStep === 1 && (
        <VolunteerInfo
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 2 && (
        <BackgroundInfo
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
          onBack={handleBack}
        />
      )}
      {currentStep === 3 && (
        <ApplicationSummary
          formData={formData}
          onBack={handleBack}
          setCurrentStep={setCurrentStep}
        />
      )}

      {currentStep === 4 && (
        <Acknowledgement setCurrentStep={setCurrentStep} onBack={handleBack} />
      )}
      {currentStep === 5 && <WhatsNext />}
    </div>
  );
};

export default ApplicationParent;
