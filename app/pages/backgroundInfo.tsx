import React, { useState, useEffect } from "react";
import { set, z } from "zod";

const backgroundSchema = z.object({
  employer: z.string().min(1, "Employer is required"),
  conviction: z.boolean(),
  bondable: z.boolean(),
  medicalCondition: z.boolean(),
  medicalConditionDetails: z.string().optional(),
  emergencyContactName: z
  .string()
  .min(1, "Emergency contact name is required")
  .regex(/^[a-zA-Z\s-.]*$/, "Invalid name, can only contain letters, spaces, hyphens, or periods."),

  emergencyContactRelationship: z
    .string()
    .min(1, "Emergency contact relationship is required").regex(/^[a-zA-Z\s]*$/, "Invalid name, cannot contain numbers or special characters."),
  emergencyContactPhone: z
    .string()
    .regex(
      /^(\+?1[.\-\s]?)?((\(\d{3}\))|\d{3})[.\-\s]?\d{3}[.\-\s]?\d{4}$/,
      "Invalid phone number. Exmaple: 123-456-7890"
    ),
  otherNotes: z.string().optional(),
});

type BackgroundInfoProps = {
  formData: any;
  setFormData: (formData: any) => void;
  setCurrentStep: (step: number) => void;
  onBack: () => void;
};

const BackgroundInfo: React.FC<BackgroundInfoProps> = ({
  formData,
  setFormData,
  setCurrentStep,
  onBack,
}) => {
  const [employer, setEmployer] = useState("");
  const [conviction, setConviction] = useState(false);
  const [bondable, setBondable] = useState(true);
  const [medicalCondition, setMedicalCondition] = useState(false);
  const [medicalConditionDetails, setMedicalConditionDetails] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelationship, setEmergencyContactRelationship] =
    useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [otherNotes, setOtherNotes] = useState(" ");
  const [validationErrors, setValidationErrors] = useState<z.ZodError | null>(
    null
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isFormSubmitted && isFormValid) {
      setCurrentStep(2);
    }
  }, [isFormSubmitted, isFormValid, setCurrentStep]);

  useEffect(() => {
    setEmployer(formData.employer);
    setConviction(formData.conviction);
    setBondable(formData.bondable);
    setMedicalCondition(formData.medicalCondition);
    setMedicalConditionDetails(formData.medicalConditionDetails);
    setEmergencyContactName(formData.emergencyContactName);
    setEmergencyContactRelationship(formData.emergencyContactRelationship);
    setEmergencyContactPhone(formData.emergencyContactPhone);
    setOtherNotes(formData.otherNotes);
  }, [formData]);

  const getErrorMessage = (fieldName: string): string | undefined => {
    const fieldError = validationErrors?.errors.find((error) => error.path.includes(fieldName));
    return fieldError?.message;
  }

  const handleEmployerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, employer: event.target.value });
    setEmployer(event.target.value);
  };

  const handleConvictionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isConvicted = event.target.value === "true" ? true : false;
    setConviction(isConvicted);
    setFormData({ ...formData, conviction: isConvicted });
  };
  
  const handleBondableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isBondable = event.target.value === "true" ? true : false;
    setBondable(isBondable);
    setFormData({ ...formData, bondable: isBondable });
  };

  const handleMedicalConditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasMedicalCondition = event.target.value === "true" ? true : false;
    setMedicalCondition(hasMedicalCondition);
    setFormData({ ...formData, medicalCondition: hasMedicalCondition });
  };

  const handleEmergencyContactRelationshipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, emergencyContactRelationship: event.target.value });
    setEmergencyContactRelationship(event.target.value);
  };
  
  const handleEmergencyContactNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, emergencyContactName: event.target.value });
    setEmergencyContactName(event.target.value);
  };

  const handleEmergencyContactPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, emergencyContactPhone: event.target.value });
    setEmergencyContactPhone(event.target.value);
  };

  const handleMedicalConditionDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, medicalConditionDetails: event.target.value});
    setMedicalConditionDetails(event.target.value);
  };

  const handleOtherNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, otherNotes: event.target.value });
    setOtherNotes(event.target.value);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      employer,
      conviction,
      bondable,
      medicalCondition,
      medicalConditionDetails,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactPhone,
      otherNotes,
    };
    console.log(formData);

    try {
      backgroundSchema.parse(formData);
      setValidationErrors(null);
      setCurrentStep(3); // Proceed to the Acknowledgement component
      setIsFormValid(true);
      setIsFormSubmitted(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error);
        setIsFormValid(false);
        setIsFormSubmitted(false);
      }
    }
  };

  return (
    <div className="flex-grow max-w-[940px] m-auto">
      <title>KidSport Volunteer Background Info</title>
      <form className="bg-[#F2F2F2] rounded-lg p-8" onSubmit={handleSubmit}>
        <div className="block text-center">
          <h1 className="font-bold ">VOLUNTEER BACKGROUND</h1>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="employer"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Employer <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="employer"
                id="employer"
                value={employer}
                onChange={handleEmployerChange}
                className="block w-full rounded-md border-gray-300 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="Employer"
              />
              {validationErrors?.formErrors.fieldErrors.employer && (<p className="text-red-500">{getErrorMessage('employer')}</p>)}
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="other-notes"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Please list previous volunteer experience (who you volunteered with and what your tasks were)
            </label>
            <div className="mt-2">
              <textarea
                id="other-notes"
                name="other-notes"
                rows={3}
                value={otherNotes}
                onChange={handleOtherNotesChange}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="Please provide any additional notes or information you would like to disclose."
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <fieldset>
              <legend className="block text-sm font-medium leading-6 text-gray-900">
                Have you had any criminal conviction for which a pardon has not
                been granted?
              </legend>
              <div className="mt-2 flex gap-8">
                <div>
                  <input
                    id="conviction-yes"
                    name="conviction"
                    type="radio"
                    value="true"
                    className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                    checked={conviction === true}
                    onChange={handleConvictionChange}
                  />
                  <label htmlFor="conviction-yes">Yes</label>
                </div>
                <div>
                  <input
                    id="conviction-no"
                    name="conviction"
                    type="radio"
                    value="false"
                    className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                    checked={conviction === false}
                    onChange={handleConvictionChange}
                  />
                  <label htmlFor="conviction-no">No</label>
                </div>
              </div>
            </fieldset>
          </div>
          
          <div className="sm:col-span-6">
            <p className="text-sm font-medium text-gray-900 dark:text-white text-left italic">
              (Please note, a criminal record check might be required for some
              opportunities.
              <br />
              If you are selected for a position that requires a criminal record
              check, you will be asked to provide one.)
            </p>
          </div>

          <div className="sm:col-span-6">
            <fieldset>
              <legend className="block text-sm font-medium leading-6 text-gray-900">
                Are you bondable?
              </legend>
              <div className="mt-2 flex gap-8">
                <div>
                  <input
                    id="bondable-yes"
                    name="bondable"
                    type="radio"
                    value="true"
                    className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                    checked={bondable === true}
                    onChange={handleBondableChange}
                  />
                  <label htmlFor="bondable-yes">Yes</label>
                </div>
                <div>
                  <input
                    id="bondable-no"
                    name="bondable"
                    type="radio"
                    value="false"
                    className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                    checked={bondable === false}
                    onChange={handleBondableChange}
                  />
                  <label htmlFor="bondable-no">No</label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="sm:col-span-6">
            <fieldset>
              <legend className="block text-sm font-medium leading-6 text-gray-900">
                Do you have any medical conditions or disability that we should
                be aware of?
              </legend>
              <div className="mt-2 flex gap-8">
                <div>
                  <input
                    id="medicalCondition-yes"
                    name="medicalCondition"
                    type="radio"
                    value="true"
                    className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                    checked={medicalCondition === true}
                    onChange={handleMedicalConditionChange}
                  />
                  <label htmlFor="medicalCondition-yes">Yes</label>
                </div>
                <div>
                  <input
                    id="medicalCondition-no"
                    name="medicalCondition"
                    type="radio"
                    className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                    checked={medicalCondition === false}
                    onChange={handleMedicalConditionChange}
                  />
                  <label htmlFor="medicalCondition-no">No</label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="condition-details"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              If yes, please provide details:
            </label>
            <div className="mt-2">
              <textarea
                id="condition-details"
                name="condition-details"
                rows={2}
                value={medicalConditionDetails}
                onChange={handleMedicalConditionDetailsChange}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#6CC24A] sm:text-sm sm:leading-6 resize-none"
                placeholder="Please provide details of your medical condition or disability."
                disabled={!medicalCondition}
              />
            </div>
          </div>
        </div>

        <div className="block text-center mt-10">
          <h1 className="font-bold ">EMERGENCY CONTACT</h1>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="emergency-full-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full name <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="emergency-full-name"
                id="emergency-full-name"
                value={emergencyContactName}
                onChange={handleEmergencyContactNameChange}
                className="block w-full rounded-md border-gray-300 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="Full Name"
              />
              {validationErrors?.formErrors.fieldErrors.emergencyContactName && (<p className="text-red-500">{getErrorMessage('emergencyContactName')}</p>)}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="relationship"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Relationship <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="relationship"
                id="relationship"
                value={emergencyContactRelationship}
                onChange={handleEmergencyContactRelationshipChange}
                className="block w-full rounded-md border-gray-300 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="Relationship"
              />
              {validationErrors?.formErrors.fieldErrors.emergencyContactRelationship && (<p className="text-red-500">{getErrorMessage('emergencyContactRelationship')}</p>)}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="emergency-phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Emergency Phone <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="tel"
                name="emergency-phone"
                id="emergency-phone"
                value={emergencyContactPhone}
                onChange={handleEmergencyContactPhoneChange}
                className="block w-full rounded-md border-gray-300 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="Primary Phone"
              />
              {validationErrors?.formErrors.fieldErrors.emergencyContactPhone && (<p className="text-red-500">{getErrorMessage('emergencyContactPhone')}</p>)}
            </div>
          </div>
        </div>



        <div className="flex justify-between mt-20">
          <button
            type="button"
            id="volunteer-info-back"
            onClick={onBack}
            className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
          >
            Back
          </button>

          <button
            type="submit"
            id="volunteer-info-next"
            className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default BackgroundInfo;
