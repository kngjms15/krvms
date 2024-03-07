import React, { useState } from "react";
import VolunteerInfo from "./volunteerInfo";
import BackgroundInfo from "./backgroundInfo";
import Acknowledgement from "./acknowledgement";
import WhatsNext from "./whatsNext";

const ApplicationParent = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<any>({
      // VolunteerInfo fields
      firstName: '',
      lastName: '',
      dob: '',
      address: '',
      cityInfo: '',
      province: '',
      postalCode: '',
      chapter: '',
      primaryPhone: '',
      secondaryPhone: '',
      email: '',
      // BackgroundInfo fields
      employer: '',
      conviction: false,
      convictionDetails: '',
      bondable: true,
      medicalCondition: false,
      medicalConditionDetails: '',
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: '',
      otherNotes: '',
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
          <Acknowledgement
            setCurrentStep={setCurrentStep}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <WhatsNext />

        )}
      </div>
    );
  };
  
  export default ApplicationParent;
  
