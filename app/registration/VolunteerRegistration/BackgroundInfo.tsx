"use client";

import React, { useState } from "react";

const BackgroundInfo = () => {
  const [employer, setEmployer] = useState("");
  const [conviction, setConviction] = useState(false);
  const [convictionDetails, setConvictionDetails] = useState("");
  const [bondable, setBondable] = useState(true);
  const [medicalCondition, setMedicalCondition] = useState(false);
  const [medicalConditionDetails, setMedicalConditionDetails] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [otherNotes, setOtherNotes] = useState("");

  return (
    <div className="flex-grow max-w-[940px] m-auto">
      <title>KidSport Volunteer Background Info</title>
      <form className="bg-[#F2F2F2] rounded-lg p-8">
        <div className="block text-center">
          <h1 className="font-bold ">VOLUNTEER BACKGROUND</h1>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="employer" className="block text-sm font-medium leading-6 text-gray-900">
              Employer
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="employer"
                id="employer"
                value={employer}
                onChange={(e) => setEmployer(e.target.value)}
                className="block w-full rounded-md border-gray-300 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Employer"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <fieldset>
              <legend className="block text-sm font-medium leading-6 text-gray-900">
                Have you had any criminal conviction for which a pardon has not been granted?
              </legend>
              <div className="mt-2 flex gap-8">
                <div>
                  <input
                    id="conviction-yes"
                    name="conviction"
                    type="radio"
                    className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={conviction}
                    onChange={() => setConviction(true)}
                  />
                  <label htmlFor="conviction-yes">Yes</label>
                </div>
                <div>
                  <input
                    id="conviction-no"
                    name="conviction"
                    type="radio"
                    className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={!conviction}
                    onChange={() => setConviction(false)}
                  />
                  <label htmlFor="conviction-no">No</label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="conviction-details" className="block text-sm font-medium leading-6 text-gray-900">
              If yes, please provide details:
            </label>
            <div className="mt-2">
              <textarea
                id="conviction-details"
                name="conviction-details"
                rows={1}
                value={convictionDetails}
                onChange={(e) => setConvictionDetails(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
                placeholder="Please provide details of your conviction."
                disabled={!conviction}
              />
            </div>
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
                    className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={bondable}
                    onChange={() => setBondable(true)}
                  />
                  <label htmlFor="bondable-yes">Yes</label>
                </div>
                <div>
                  <input
                    id="bondable-no"
                    name="bondable"
                    type="radio"
                    className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={!bondable}
                    onChange={() => setBondable(false)}
                  />
                  <label htmlFor="bondable-no">No</label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="sm:col-span-6">
            <fieldset>
              <legend className="block text-sm font-medium leading-6 text-gray-900">
                Do you have any medical conditions or disability that we should be aware of?
              </legend>
              <div className="mt-2 flex gap-8">
                <div>
                  <input
                    id="medicalCondition-yes"
                    name="medicalCondition"
                    type="radio"
                    className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={medicalCondition}
                    onChange={() => setMedicalCondition(true)}
                  />
                  <label htmlFor="medicalCondition-yes">Yes</label>
                </div>
                <div>
                  <input
                    id="medicalCondition-no"
                    name="medicalCondition"
                    type="radio"
                    className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={!medicalCondition}
                    onChange={() => setMedicalCondition(false)}
                  />
                  <label htmlFor="medicalCondition-no">No</label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="condition-details" className="block text-sm font-medium leading-6 text-gray-900">
              If yes, please provide details:
            </label>
            <div className="mt-2">
              <textarea
                id="condition-details"
                name="condition-details"
                rows={1}
                value={medicalConditionDetails}
                onChange={(e) => setMedicalConditionDetails(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
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
            <label htmlFor="emergency-full-name" className="block text-sm font-medium leading-6 text-gray-900">
              Full name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="emergency-full-name"
                id="emergency-full-name"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                className="block w-full rounded-md border-gray-300 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Full Name"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="relationship" className="block text-sm font-medium leading-6 text-gray-900">
              Relationship
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="relationship"
                id="relationship"
                value={emergencyContactRelationship}
                onChange={(e) => setEmergencyContactRelationship(e.target.value)}
                className="block w-full rounded-md border-gray-300 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Relationship"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="emergency-phone" className="block text-sm font-medium leading-6 text-gray-900">
              Emergency Phone
            </label>
            <div className="mt-2">
              <input
                type="tel"
                name="emergency-phone"
                id="emergency-phone"
                value={emergencyContactPhone}
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                className="block w-full rounded-md border-gray-300 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Primary Phone"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="other-notes" className="block text-sm font-medium leading-6 text-gray-900">
              Notes
            </label>
            <div className="mt-2">
              <textarea
                id="other-notes"
                name="other-notes"
                rows={3}
                value={otherNotes}
                onChange={(e) => setOtherNotes(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Please provide any additional notes or information you would like to disclose."
              />
            </div>
          </div>
        </div>

        <div className="max-w-full mt-10 px-10">
          <p className="text-sm font-medium text-gray-900 dark:text-white text-center">
            Please note, a criminal record check might be required for some opportunities.<br />
            If you are selected for a position that requires a criminal record check, you will be asked to provide one.
          </p>
        </div>

        <div className="flex justify-between mt-20">
          <button
            type="button"
            id="volunteer-info-back"
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
