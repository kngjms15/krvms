"use client";


import React from "react";
import { useState } from "react";
import ProvinceChapters from "./provinceChapters.json";


const VolunteerInfo = () => {
  const [province] = useState(
    ProvinceChapters.map((province) => province.Province)
  );

  const ReadjustDate = (ageLimit = 18) => {
    var currentDate = new Date();

    var year = currentDate.getFullYear()-ageLimit;
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
    var day = ("0" + currentDate.getDate()).slice(-2); 

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }

  const [maxDate,setMaxDate] = useState(ReadjustDate());

  const [selectedProvince, setSelectedProvince] = useState("AB");
  const [selectedChapter, setSelectedChapter] = useState("Calgary & Area");

  // Function to handle province change
  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProvince(event.target.value);
    setSelectedChapter(""); // Reset chapter selection when province changes
  };

  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChapter(event.target.value);
  };

  const chaptersForSelectedProvince = ProvinceChapters.find(
    (province) => province.Province === selectedProvince
  )?.Chapters;

  return (
    // Volunteer Information form
    <div className="flex-grow max-w-[940px] m-auto my-6" >
      <title>KidSport Volunteer Information</title>
      <form className="bg-[#F2F2F2] rounded-lg p-8">
        <div className="block text-center">
          <h1 className="font-bold ">VOLUNTEER INFORMATION</h1>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="First Name"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="dob"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date of Birth
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="dob"
                id="dob"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="yyyy-mm-dd"
                max={maxDate}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="volunteer-address"
                id="volunteer-address"
                autoComplete="street-address"
                placeholder="Street Address"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="City"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="province"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Province
            </label>
            <div className="mt-2">
              <select
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="province"
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                {ProvinceChapters.map((province) => (
                  <option key={province.Province} value={province.Province}>
                    {province.Province}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Postal Code
            </label>
            <div className="mt-2">
              <input
                type="postal-code"
                name="postal-code"
                id="postal-code"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="A1A 1A1"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="chapter"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Chapter
            </label>
            <div className="mt-2">
              <select
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="chapter"
                value={selectedChapter}
                onChange={handleChapterChange}
              >
                {chaptersForSelectedProvince &&
                typeof chaptersForSelectedProvince !== "string" ? (
                  chaptersForSelectedProvince.map((chapter, index) => (
                    <option key={index} value={chapter}>
                      {chapter}
                    </option>
                  ))
                ) : (
                  <option value="No Chapters Available">
                    No Chapters Available
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="primary-phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Primary Phone
            </label>
            <div className="mt-2">
              <input
                type="phone"
                name="primary-phone"
                id="primary-phone"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Primary Phone"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="secondary-phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Secondary Phone
            </label>
            <div className="mt-2">
              <input
                type="phone"
                name="secondary-phone"
                id="secondary-phone"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Secondary Phone"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="abcde@gmail.com"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-20">
          <button
            type="button"
            id="volunteer-info-cancel"
            className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
          >
            Cancel
          </button>

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

export default VolunteerInfo;
