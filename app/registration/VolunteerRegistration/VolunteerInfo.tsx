"use client";

import React, { useState } from "react";
import provinceChapters from "./provinceChapters.json";
import Image from "next/image";
import { z } from "zod";

const phoneNumberSchema = z.string().regex(
  /^(\+?1[.\-\s]?)?((\(\d{3}\))|\d{3})[.\-\s]?\d{3}[.\-\s]?\d{4}$/,
  "Invalid phone number"
);

const emailSchema = z.string().email("Invalid email address");

const VolunteerInfo = () => {
  const [maxDate] = useState(getFormattedDate(14)); // max dob for someone to volunteer
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [validPrimePhoneNum, setValidPrimePhoneNum] = useState(true);
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [validSecondPhoneNum, setValidSecondPhoneNum] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [cityInfo, setCityInfo] = useState("");
  const [postalCode, setPostalCode] = useState("");
  

  function getFormattedDate(ageLimit: number = 14) {
    const currentDate = new Date();
    const year = currentDate.getFullYear() - ageLimit;
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProvince(event.target.value);
    setSelectedChapter("");
  };

  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChapter(event.target.value);
  };

  const checkValidNumber = (phoneNumber: string, isPrimary: boolean = true) => {
    const phoneNumberRegex =
      /^(\+?1[.\-\s]?)?((\(\d{3}\))|\d{3})[.\-\s]?\d{3}[.\-\s]?\d{4}$/;
    if (isPrimary) {
      setValidPrimePhoneNum(phoneNumberRegex.test(phoneNumber));
    } else {
      setValidSecondPhoneNum(phoneNumberRegex.test(phoneNumber));
    }
  };


  const handlePrimaryPhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const phoneNumber = event.target.value;
    setPrimaryPhone(phoneNumber);
  };

  const handleSecondaryPhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const phoneNumber = event.target.value;
    setSecondaryPhone(phoneNumber);
  };

  const handleFirstNameChange = (event: string) => {
    setFirstName(event);
  };

  const handleLastNameChange = (event: string) => {
    setLastName(event);
  };

  const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDob(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityInfo(event.target.value);
  };

  const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(event.target.value);
  };

  const chaptersForSelectedProvince = (provinceChapters.find(
    (province) => province.province === selectedProvince
  )?.chapters || []) as string[];

  const isValidPrimaryPhone = phoneNumberSchema.safeParse(primaryPhone).success;
  const isValidSecondaryPhone = phoneNumberSchema.safeParse(secondaryPhone)
    .success;
  const isValidEmail = emailSchema.safeParse(email).success;

  return (
    <div className="flex-grow max-w-[940px] m-auto my-6">
      <title>KidSport Volunteer Information</title>
      <form className="bg-[#F2F2F2] rounded-lg p-8">
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  handleFirstNameChange(e.target.value);
                }}
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  handleLastNameChange(e.target.value);
                }}
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
                autoComplete="bday"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="yyyy-mm-dd"
                max={maxDate}
                value={dob}
                onChange={handleDobChange}
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                value={address}
                onChange={handleAddressChange}
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
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="City"
                value={cityInfo}
                onChange={handleCityChange}
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                id="province"
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                {provinceChapters.map((province) => (
                  <option key={province.province} value={province.province}>
                    {province.province}
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
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="A1A 1A1"
                value={postalCode}
                onChange={handlePostalChange}
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                id="chapter"
                value={selectedChapter}
                onChange={handleChapterChange}
              >
                {chaptersForSelectedProvince.length > 0 ? (
                  typeof chaptersForSelectedProvince[0] === "string" ? (
                    chaptersForSelectedProvince.map((chapter, index) => (
                      <option key={index} value={chapter}>
                        {chapter}
                      </option>
                    ))
                  ) : (
                    <option value="No Chapters Available">
                      No Chapters Available
                    </option>
                  )
                ) : (
                  <option value="No Chapters Available">
                    No Chapters Available
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            {!validPrimePhoneNum ? (
              <div className="flex items-center">
                <label
                  htmlFor="primary-phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Primary Phone Number
                </label>
                <label
                  htmlFor="primary-phone"
                  className="block ml-2 text-xs font-small leading-6 text-red-600"
                >
                  Invalid Primary Number
                </label>
              </div>
            ) : (
              <label
                htmlFor="primary-phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Primary Phone Number
              </label>
            )}
            <div className="mt-2">
              <input
                type="text"
                name="primary-phone"
                id="primary-phone"
                value={primaryPhone}
                onChange={handlePrimaryPhoneChange}
                className={`block w-full rounded-md border ${
                  !validPrimePhoneNum ? "border-2 border-red-500" : ""
                } p-1.5 text-gray-900 ring-1 ring-inset border-0 ring-gray-300 placeholder:text-gray-400 focus:ring-[#6CC24A] focus:border-[#6CC24A] sm:text-sm sm:leading-6`}
                placeholder="10-digit phone number"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            {!validSecondPhoneNum ? (
              <div className="flex items-center">
                <label
                  htmlFor="secondary-phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Secondary Phone Number
                </label>
                <label
                  htmlFor="secondary-phone"
                  className="block ml-2 text-xs font-small leading-6 text-red-600"
                >
                  Invalid Secondary Number
                </label>
              </div>
            ) : (
              <label
                htmlFor="secondary-phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Secondary Phone Number
              </label>
            )}
            <div className="mt-2">
              <input
                type="text"
                name="secondary-phone"
                id="secondary-phone"
                value={secondaryPhone}
                onChange={handleSecondaryPhoneChange}
                className={`block w-full rounded-md border ${
                  !validSecondPhoneNum ? "border-2 border-red-500" : ""
                } p-1.5 text-gray-900 ring-1 ring-inset border-0 ring-gray-300 placeholder:text-gray-400 focus:ring-[#6CC24A] focus:border-[#6CC24A] sm:text-sm sm:leading-6`}
                placeholder="10-digit phone number"
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
                autoComplete="email"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="@example.com"
                value={email}
                onChange={handleEmailChange}
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
