import React from "react";

const BackgroundInfo = () => {
  return (
    // Volunteer Background Info Form
    <div className="flex-grow max-w-[940px] m-auto">
      <title>KidSport Volunteer Background Info</title>
      <form className="bg-[#F2F2F2] rounded-lg p-8">
        <div className="block text-center">
          <h1 className="font-bold ">VOLUNTEER BACKGROUND</h1>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="employer"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Employer
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="employer"
                id="employer"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Employer"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="conviction"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Have you had any criminal conviction for which a pardon has not
              been granted?
            </label>
            <div className="mt-2 flex gap-8 ">
              <div>
                <input
                  id="conviction-yes"
                  name="conviction"
                  type="radio"
                  className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label>Yes</label>
              </div>
              <div>
                <input
                  id="conviction-no"
                  name="conviction"
                  type="radio"
                  className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked
                />
                <label>No</label>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="conviction-details"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              If yes, please provide details:
            </label>
            <div className="mt-2">
              <textarea
                id="conviction-details"
                name="conviction-details"
                rows={1}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="bondable"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Are you bondable?
            </label>
            <div className="mt-2 flex gap-8 ">
              <div>
                <input
                  id="bondable-yes"
                  name="bondable"
                  type="radio"
                  className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked
                />
                <label>Yes</label>
              </div>
              <div>
                <input
                  id="bondable-no"
                  name="bondable"
                  type="radio"
                  className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label>No</label>
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="medical-condition"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Do you have any medical conditions or disability that we should be
              aware of?
            </label>
            <div className="mt-2 flex gap-8 ">
              <div>
                <input
                  id="medicalCondition-yes"
                  name="medicalCondition"
                  type="radio"
                  className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked
                />
                <label>Yes</label>
              </div>
              <div>
                <input
                  id="medicalCondition-no"
                  name="medicalCondition"
                  type="radio"
                  className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked
                />
                <label>No</label>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="conviction-details"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              If yes, please provide details:
            </label>
            <div className="mt-2">
              <textarea
                id="conviction-details"
                name="conviction-details"
                rows={1}
                placeholder="Please provide details of your medical condition or disability."
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
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
              Full name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="emergency-full-ame"
                id="emergency-full-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Full Name"
              />
            </div>
          </div>
          <div className="col-span-3"></div>
          <div className="col-span-3">
            <label
              htmlFor="relationship"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Relationship
            </label>
            <div className="mt-2">
              <input
                type="relationship"
                name="relationship"
                id="relationship"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Relationship"
              />
            </div>
          </div>
          <div className="col-span-3"></div>
          <div className="col-span-3">
            <label
              htmlFor="emergency-phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Emergency Phone
            </label>
            <div className="mt-2">
              <input
                type="phone"
                name="emergency-phone"
                id="emergency-phone"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Primary Phone"
              />
            </div>
          </div>
          <div className="col-span-3"></div>

          <div className="sm:col-span-6">
            <label
              htmlFor="other-notes"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Notes
            </label>
            <div className="mt-2">
              <textarea
                id="conviction-details"
                name="conviction-details"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
                placeholder="Please provide any additional notes or information you would like to disclose."
              />
            </div>
          </div>
        </div>

        <div className="max-w-full mt-10 ">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            * Please upload a copy of your criminal record check with the vulnerable sector check included (Must have been completed in the last year) 
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
          />
        </div>

        <div className="flex justify-between mt-20">
          <div>
            <button
              type="submit"
              id="volunteer-info-back"
              className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
            >
              Back
            </button>
          </div>

          <div>
            <button
              type="submit"
              id="volunteer-info-next"
              className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BackgroundInfo;
