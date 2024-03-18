"use client";

import { useEffect, useState } from "react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { volunteerApplicationSchema } from "@/lib/schema";
import provinceChapters from "./provinceChapters.json"
import Image from "next/image";
import { Span } from "next/dist/trace";

type Inputs = z.infer<typeof volunteerApplicationSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Volunteer Information",
    fields: [
      "firstName",
      "lastName",
      "dob",
      "address",
      "city",
      "province",
      "postalCode",
      "chapter",
      "primaryPhone",
      "secondaryPhone",
      "email",
    ],
  },
  {
    id: "Step 2",
    name: "Background Information",
    fields: [
      "employer",
      "conviction",
      "bondable",
      "medicalCondition",
      "medicalConditionDetails",
      "emergencyContactName",
      "emergencyContactRelationship",
      "emergencyContactPhone",
      "volunteerExperienceDetails",
    ],
  },
  {
    id: "Step 3",
    name: "Application Summary",
  },
  {
    id: "Step 4",
    name: "Acknowledgement",
    fields: ["agreedToTerms"],
  },
  {
    id: "Step 5",
    name: "What's Next",
  },
];

function VolunteerApplicationForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(volunteerApplicationSchema) });

  useEffect(() => {
    register("firstName");
    register("lastName");
    register("dob");
    register("address");
    register("city");
    register("province");
    register("postalCode");
    register("chapter");
    register("primaryPhone");
    register("secondaryPhone");
    register("email");
    register("employer");
    register("conviction", { setValueAs: (value) => value === "false" });
    register("bondable", { setValueAs: (value) => value === "true" });
    register("medicalCondition", { setValueAs: (value) => value === "false" });
    register("medicalConditionDetails");
    register("emergencyContactName");
    register("emergencyContactRelationship");
    register("emergencyContactPhone");
    register("volunteerExperienceDetails");
    register("agreedToTerms");
  }, [register]);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("/api/submitVolunteerApplication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        console.log("Form submitted successfully!");
      } else {
        console.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
    console.log(data);
    // send data to the server
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep]?.fields || [];
    const output = await trigger(fields as FieldName[], { shouldFocus: true });
    window.scrollTo(0, 0);
  
    if (!output) {
      console.log("Validation failed, not proceeding to next step.", errors);
      return;
    }
  
    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
  
      if (currentStep === 3) {
        console.log("Submitting form...");
        handleSubmit(processForm)();
      }
  
      console.log("Proceeding to next step...");
      setCurrentStep((step) => step + 1);
    }
  };
  

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
      window.scrollTo(0, 0);
    }
  };

  // function getFormattedDate(ageLimit: number = 14) {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear() - ageLimit;
  //   const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  //   const day = ("0" + currentDate.getDate()).slice(-2);
  //   return `${year}-${month}-${day}`;
  // }

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

  const dob = watch("dob");
  const selectedProvince = watch("province");

  return (
    <>
      <form
        className="flex-grow max-w-[940px] m-auto my-6 bg-[#F2F2F2] rounded-lg p-8"
        onSubmit={handleSubmit(processForm)}
      >
        {/* Volunteer Information Section */}
        {currentStep === 0 && (
          <div className="flex-grow max-w-[940px] m-auto my-6 ">
            <div className="flex flex-auto m-auto max-w-40 max-h-40">
              <Image
                src="/KidSport-Month-Graphic-SS-Website.png"
                layout="responsive"
                height={80}
                width={80}
                alt="KidSport"
                className="mx-auto mb-4 max-w-max max-h-max rounded-lg opacity-80"
              />
            </div>
            <div className="block text-center">
              <h1 className="font-bold">VOLUNTEER INFORMATION</h1>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="lock text-sm font-medium leading-6 text-gray-900"
                >
                  First name <span className="text-red-500">*</span>
                </label>

                <div className="mt-2">
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    {...register("firstName")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-xs">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="lock text-sm font-medium leading-6 text-gray-900"
                >
                  Last name <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    {...register("lastName")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-xs">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date of Birth {dob && `(Age: ${calculateAge(dob)})`}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    id="dob"
                    placeholder="yyyy-mm-dd"
                    {...register("dob")}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                  />
                  {errors.dob && (
                    <span className="text-red-500 text-xs">
                      {errors.dob.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="address"
                    placeholder="Street Address"
                    {...register("address")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.address && (
                    <span className="text-red-500 text-xs">
                      {errors.address.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    {...register("city")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.city && (
                    <span className="text-red-500 text-xs">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="province"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Province <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="province"
                    {...register("province")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
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
                  {errors.province && (
                    <span className="text-red-500 text-xs">
                      {errors.province.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="postalCode"
                    placeholder="A1B 2C3"
                    {...register("postalCode")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.postalCode && (
                    <span className="text-red-500 text-xs">
                      {errors.postalCode.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="chapter"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Chapter <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="chapter"
                    {...register("chapter")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  >
                    {provinceChapters
                      .filter(
                        (provinceObj) =>
                          provinceObj.province === selectedProvince
                      )
                      .map((provinceObj) =>
                        provinceObj.chapters.map((chapter, index) => (
                          <option key={index} value={chapter}>
                            {chapter}
                          </option>
                        ))
                      )}
                  </select>
                  {errors.chapter && (
                    <span className="text-red-500 text-xs">
                      {errors.chapter.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="primaryPhone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Primary Phone <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="primaryPhone"
                    placeholder="123-456-7890"
                    {...register("primaryPhone")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.primaryPhone && (
                    <span className="text-red-500 text-xs">
                      {errors.primaryPhone.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="secondaryPhone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Secondary Phone
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="secondaryPhone"
                    placeholder="123-456-7890"
                    {...register("secondaryPhone")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.secondaryPhone && (
                    <span className="text-red-500 text-xs">
                      {errors.secondaryPhone.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    {...register("email")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Background Information Section */}
        {currentStep === 1 && (
          <div className="flex-grow max-w-[940px] m-auto my-6  ">
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
                    id="employer"
                    placeholder="Employer"
                    {...register("employer")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.employer && (
                    <span className="text-red-500 text-xs">
                      {errors.employer.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="volunteerExperienceDetails"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Please list previous volunteer experience (who you volunteered
                  with and what your tasks were)
                </label>
                <textarea
                  id="volunteerExperienceDetails"
                  placeholder="Volunteer Experience"
                  {...register("volunteerExperienceDetails")}
                  className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                />
                {errors.volunteerExperienceDetails && (
                  <span className="text-red-500 text-xs">
                    {errors.volunteerExperienceDetails.message}
                  </span>
                )}
              </div>

              <div className="sm:col-span-6">
                <fieldset>
                  <legend className="block text-sm font-medium leading-6 text-gray-900">
                    Have you had any criminal conviction for which a pardon has
                    not been granted?
                  </legend>
                  <div className="mt-2 flex gap-8">
                    <div>
                      <input
                        type="radio"
                        id="conviction-yes"
                        value="true"
                        {...register("conviction")}
                        className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                      />
                      <label htmlFor="conviction-yes">Yes</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="conviction-no"
                        value="false"
                        {...register("conviction")}
                        defaultChecked
                        className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                      />
                      <label htmlFor="conviction-no">No</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="sm:col-span-6">
                <p className="text-sm font-medium text-gray-900 dark:text-white text-left italic">
                  (Please note, a criminal record check might be required for
                  some opportunities.
                  <br />
                  If you are selected for a position that requires a criminal
                  record check, you will be asked to provide one.)
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
                        type="radio"
                        id="bondable-yes"
                        {...register("bondable")}
                        defaultChecked
                        className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                      />
                      <label htmlFor="bondable-yes">Yes</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="bondable-no"
                        value="false"
                        {...register("bondable")}
                        className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                      />
                      <label htmlFor="bondable-no">No</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="sm:col-span-6">
                <fieldset>
                  <legend className="block text-sm font-medium leading-6 text-gray-900">
                    Do you have any medical conditions that we should be aware
                    of?
                  </legend>
                  <div className="mt-2 flex gap-8">
                    <div>
                      <input
                        type="radio"
                        id="medicalCondition-yes"
                        {...register("medicalCondition")}
                        className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                      />
                      <label htmlFor="medicalCondition-yes">Yes</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="medicalCondition-no"
                        value="false"
                        {...register("medicalCondition")}
                        defaultChecked
                        className="h-4 w-4 mr-2 border-gray-300 text-[#6CC24A] focus:ring-[#6CC24A]"
                      />
                      <label htmlFor="medicalCondition-no">No</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="medicalConditionDetails"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  If yes, please provide details
                </label>
                <textarea
                  id="medicalConditionDetails"
                  placeholder="Medical Condition Details"
                  {...register("medicalConditionDetails")}
                  className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                />
                {errors.medicalConditionDetails && (
                  <span className="text-red-500 text-xs">
                    {errors.medicalConditionDetails.message}
                  </span>
                )}
              </div>
            </div>

            <div className="block text-center mt-10">
              <h1 className="font-bold ">EMERGENCY CONTACT</h1>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="emergencyContactName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="emergencyContactName"
                    placeholder="Please provide full name"
                    {...register("emergencyContactName")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.emergencyContactName && (
                    <span className="text-red-500 text-xs">
                      {errors.emergencyContactName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="emergencyContactRelationship"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Relationship <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="emergencyContactRelationship"
                    placeholder="Relationship"
                    {...register("emergencyContactRelationship")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.emergencyContactRelationship && (
                    <span className="text-red-500 text-xs">
                      {errors.emergencyContactRelationship.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="emergencyContactPhone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="emergencyContactPhone"
                    placeholder="123-456-7890"
                    {...register("emergencyContactPhone")}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6`}
                  />
                  {errors.emergencyContactPhone && (
                    <span className="text-red-500 text-xs">
                      {errors.emergencyContactPhone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Summary Section */}
        {currentStep === 2 && (
          <div className="flex-grow max-w-[940px] m-auto my-6 bg-[#F2F2F2] rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">Form Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Display each form field */}
              <div>
                <strong>First Name:</strong> {watch("firstName")}
              </div>
              <div>
                <strong>Last Name:</strong> {watch("lastName")}
              </div>
              <div>
                <strong>Date of Birth:</strong> {watch("dob")}
              </div>
              <div>
                <strong>Address:</strong> {watch("address")}
              </div>
              <div>
                <strong>City:</strong> {watch("city")}
              </div>
              <div>
                <strong>Province:</strong> {watch("province")}
              </div>
              <div>
                <strong>Postal Code:</strong> {watch("postalCode")}
              </div>
              <div>
                <strong>Chapter:</strong> {watch("chapter")}
              </div>
              <div>
                <strong>Primary Phone:</strong> {watch("primaryPhone")}
              </div>
              <div>
                <strong>Secondary Phone:</strong> {watch("secondaryPhone")}
              </div>
              <div>
                <strong>Email:</strong> {watch("email")}
              </div>
              <div>
                <strong>Employer:</strong> {watch("employer")}
              </div>
              <div>
                <strong>Volunteer Experience Details</strong>
                {watch("volunteerExperienceDetails")}
              </div>
              <div>
                <strong>Conviction:</strong>
                {""}
                {watch("conviction") ? "Yes" : "No"}
              </div>
              <div>
                <strong>Bondable:</strong> {""}
                {watch("bondable") ? "Yes" : "No"}
              </div>
              <div>
                <strong>Medical Condition:</strong>{" "}
                {watch("medicalCondition") ? "Yes" : "No"}
              </div>
              <div>
                <strong>Medical Condition Details:</strong>
                {watch("medicalConditionDetails")}
              </div>
              <div>
                <strong>Emergency Contact Name:</strong>
                {watch("emergencyContactName")}
              </div>
              <div>
                <strong>Emergency Contact Relationship:</strong>
                {watch("emergencyContactRelationship")}
              </div>
              <div>
                <strong>Emergency Contact Phone:</strong>
                {watch("emergencyContactPhone")}
              </div>
            </div>
          </div>
        )}
        {/* Acknowledgement Section */}
        {currentStep === 3 && (
          <div className="flex-grow max-w-[940px] m-auto my-6 bg-[#F2F2F2] rounded-lg p-8">
            <div className="block text-center">
              <h1 className="font-bold ">ACKNOWLEDGEMENT</h1>
            </div>
            <div className="mt-12">
              <div className="flex">
                <p>Please read carefully:</p>
              </div>
              <div className="flex p-3">
                <p>
                  {" "}
                  • I acknowledge and hereby irrevocably authorize that, in the
                  event of me being physically, bodily injured during any of my
                  activities as a KidSport™ Society of Calgary or Calgary Flames
                  Sports Bank volunteer, KidSport™ Calgary or Calgary Flames
                  Sports Bank shall be permitted to obtain copies of any of my
                  relevant health records as it may request. I shall execute any
                  authorization for Release of Health Records as KidSport™
                  Calgary or Calgary Flames Sports Bank considers necessary, and
                  my failure to do so will result in the automatic suspension of
                  any claim I may have. A claim will automatically terminate if
                  I rescind a release.{" "}
                </p>
              </div>
              <div className="flex p-3">
                <p>
                  {" "}
                  • I understand the information will be kept confidential in
                  accordance with Alberta&apos;s Personal Information Protection
                  Act (PIPA).{" "}
                </p>
              </div>
              <div className="flex p-3">
                <p>
                  • I hereby give my permission to KidSport™ Calgary or Calgary
                  Flames Sports Bank to use my photo when necessary for the
                  purpose of KidSport™ Calgary.{" "}
                </p>
              </div>
              <div className="flex p-3">
                <p>
                  • I hereby release KidSport™ Calgary or Calgary Flames Sports
                  Bank from all responsibility that may occur as a result of my
                  personal use of an automobile when volunteering for KidSport™
                  Calgary or Calgary Flames Sports Bank activities.{" "}
                </p>
              </div>
              <div className="flex p-3">
                <p>
                  • I agree to carry out my assigned volunteer tasks in a
                  reasonable and safe manner.
                </p>
              </div>
              <div className="flex p-3">
                <p>
                  • I am aware of the KidSport™ Calgary or Calgary Flames Sports
                  Bank policy that breach of confidentiality with respect to
                  KidSport™ Calgary or Calgary Flames Sports Bank Applicants
                  will result in an immediate request for my resignation.{" "}
                </p>
              </div>
              <div className="flex p-3">
                <p>
                  • I am aware that if my behavior while volunteering is found
                  to be questionable or inappropriate by the KidSport™ Calgary
                  or Calgary Flames Sports Bank staff, I will be given a verbal
                  warning. Should the behavior persist I will be provided a
                  written warning followed by a request for my resignation.{" "}
                </p>
              </div>
              <div className="flex p-3">
                <p>
                  • I am aware that KidSport™ Calgary or Calgary Flames Sports
                  Bank provides insurance coverage for me while I perform
                  volunteer duties with due care.{" "}
                </p>
              </div>
              <div className="flex p-3">
                <p>
                  • The personal information on this form will only be collected
                  and shared under the authority of the Freedom of Information
                  and Protection of Privacy Act (FOIP) of the Province of
                  Alberta, Section 32(c) and 33(1) (b2) and the Canadian
                  Immigration Act Section 96.1-3. The purpose of collecting this
                  information includes: determining eligibility for volunteer
                  opportunities, programs, services, and recognition, to
                  facilitate your registration process, to administer and
                  evaluate our volunteers and programs, statistical purposes and
                  to activate the Volunteer Accident Insurance coverage. This
                  information may be shared with other volunteers and
                  volunteers&apos; supervisory staff.
                </p>
              </div>

              <div className="flex justify-center mt-5 p-2">
                <input
                  type="checkbox"
                  id="agreedToTerms"
                  {...register("agreedToTerms")}
                  className="align-middle justify-center w-5 h-5 rounded-sm text-[#6CC24A] focus:ring-[#6CC24A]"
                />
                <label htmlFor="acknowledgement" className="ml-3">
                  I agree to the terms and conditions.
                </label>
                {errors.agreedToTerms && (
                  <span className="text-red-500 text-xs">
                    {errors.agreedToTerms.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        {/* What's Next Section */}
        {currentStep === 4 && (
          <div className="flex-grow max-w-[940px] m-auto my-6 bg-[#F2F2F2] rounded-lg p-8">
            <div className="block text-center">
              <h1 className="font-bold">What&apos;s Next</h1>
            </div>

            <div className="mt-12">
              <div className="flex">
                <h2>You&apos;ve applied, now what?</h2>
              </div>
              <div className="flex p-3 mt-4">
                <p>
                  Once you submit your volunteer application form, you will then
                  need to be added to our Volunteer Newsletter, meaning
                  you&apos;ll receive monthly or bi-monthly emails from us
                  indicating what events and opportunities we have coming up
                  that you could sign up for. If you see an event that you want
                  to be a part of, sign up via the link in the email, and closer
                  to the event, we&apos;ll reach out again with more information
                  about that specific event and your role.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between flex-grow max-w-[940px]">
          {currentStep === 0 && (
            <div className="flex mt-12 ml-auto">
              <div>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {currentStep === 1 && (
            <div className="flex justify-between flex-grow mt-12">
              <button
                type="button"
                onClick={prev}
                className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
              >
                Back
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
              >
                Next
              </button>
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex justify-between flex-grow mt-12">
              <button
                type="button"
                onClick={prev}
                className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
              >
                Back
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
              >
                Next
              </button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="flex justify-between flex-grow mt-12">
              <button
                type="button"
                onClick={prev}
                className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
              >
                Back
              </button>
              <button
                type="submit"
                onClick={() => {
                  next();
                }}
                className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
              >
                Next
              </button>
            </div>
          )}
          {currentStep === 4 && (
            <div className="flex mt-12 ml-auto">
              <div></div>
              <button
                type="button"
                onClick={() =>
                  (window.location.href = "https://kidsportcanada.ca/")
                }
                className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
              >
                Home
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default VolunteerApplicationForm;
