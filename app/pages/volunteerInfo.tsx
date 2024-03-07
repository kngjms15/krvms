import React, { useState, useEffect, FC } from "react";
import Image from "next/image";
import { set, z } from "zod";
import provinceChapters from "../provinceChapters.json";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  dob?: string;
  address?: string;
  cityInfo?: string;
  province?: string;
  postalCode?: string;
  chapter?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  email?: string;
}

const volunteerShcema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  address: z.string().min(1, "Address is required"),
  cityInfo: z.string().min(1, "City is required"),
  province: z
    .string()
    .min(2, "Province is required")
    .max(2, "Province must be 2 characters"),
  postalCode: z
    .string()
    .regex(/^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$/, "Invalid postal code"),
  chapter: z.string().min(1, "Chapter is required"),
  primaryPhone: z
    .string()
    .regex(
      /^(\+?1[.\-\s]?)?((\(\d{3}\))|\d{3})[.\-\s]?\d{3}[.\-\s]?\d{4}$/,
      "Invalid phone number"
    ),
  secondaryPhone: z
    .string()
    .regex(
      /^(\+?1[.\-\s]?)?((\(\d{3}\))|\d{3})[.\-\s]?\d{3}[.\-\s]?\d{4}$/,
      "Invalid phone number"
    )
    .or(z.string().length(0))
    .optional(),
  email: z.string().email("Invalid email address"),
});

type VolunteerInfoProps = {
  formData: any;
  setFormData: (data: any) => void;
  setCurrentStep: (step: number) => void;
};

const VolunteerInfo: React.FC<VolunteerInfoProps> = ({
  formData,
  setFormData,
  setCurrentStep,
}) => {
  const [maxDate] = useState(getFormattedDate(14)); // max dob for someone to volunteer
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("AB");
  const [selectedChapter, setSelectedChapter] = useState("Calgary & Area");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [cityInfo, setCityInfo] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [validationErrors, setValidationErrors] = useState<z.ZodError | null>(
    null
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  const resetForm = () => {
    // Reset all the state variables holding form field values
    setPrimaryPhone("");
    setSecondaryPhone("");
    setSelectedProvince("AB");
    setSelectedChapter("Calgary & Area");
    setEmail("");
    setFirstName("");
    setLastName("");
    setDob("");
    setAddress("");
    setCityInfo("");
    setPostalCode("");
  };

  const getErrorMessage = (fieldName: string): string | undefined => {
    const fieldError = validationErrors?.errors.find((error) =>
      error.path.includes(fieldName)
    );
    return fieldError?.message;
  };

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
    setFormData({ ...formData, province: event.target.value });
    setSelectedProvince(event.target.value);
  };
  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, chapter: event.target.value });
    setSelectedChapter(event.target.value);
  };
  
  const handlePrimaryPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, primaryPhone: event.target.value });
    setPrimaryPhone(event.target.value);
  };
  
  const handleSecondaryPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, secondaryPhone: event.target.value });
    setSecondaryPhone(event.target.value);
  };
  
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, firstName: event.target.value });
    setFirstName(event.target.value);
  };
  
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, lastName: event.target.value });
    setLastName(event.target.value);
  };
  
  const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, dob: event.target.value });
    setDob(event.target.value);
  };
  
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, address: event.target.value });
    setAddress(event.target.value);
  };
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: event.target.value });
    setEmail(event.target.value);
  };
  
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, cityInfo: event.target.value });
    setCityInfo(event.target.value);
  };
  
  const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, postalCode: event.target.value });
    setPostalCode(event.target.value);
  };
  

  const chaptersForSelectedProvince = (provinceChapters.find(
    (province) => province.province === selectedProvince
  )?.chapters || []) as string[];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const volunteerData = {
      firstName,
      lastName,
      dob,
      address,
      cityInfo: cityInfo,
      province: selectedProvince,
      postalCode,
      chapter: selectedChapter,
      primaryPhone,
      secondaryPhone,
      email,
    };
    
    try {
      volunteerShcema.parse(volunteerData);
      setValidationErrors(null);
      setIsFormValid(true);
      setIsFormSubmitted(true);
      // resetForm();
      setCurrentStep(2);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error);
        setIsFormValid(false);
        setIsFormSubmitted(false);
      }
    }
  };

  return (
    <div className="flex-grow max-w-[940px] m-auto my-6">
      <title>KidSport Volunteer Information</title>
      <form className="bg-[#F2F2F2] rounded-lg p-8" onSubmit={handleSubmit}>
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
                placeholder="First Name"
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6 ${
                  getErrorMessage("firstName") ? "border-red-500" : ""
                }`}
                value={formData.firstName}
                onChange={handleFirstNameChange}
              />
              {getErrorMessage("firstName") && (
                <p className="text-red-500">{getErrorMessage("firstName")}</p>
              )}
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
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6 ${
                  getErrorMessage("lastName") ? "border-red-500" : ""
                }`}
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleLastNameChange}
              />
              {getErrorMessage("lastName") && (
                <p className="text-red-500">{getErrorMessage("lastName")}</p>
              )}
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
                value={formData.dob}
                onChange={handleDobChange}
              />
              {getErrorMessage("dob") && (
                <p className="text-red-500">{getErrorMessage("dob")}</p>
              )}
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
                value={formData.address}
                onChange={handleAddressChange}
              />
              {getErrorMessage("address") && (
                <p className="text-red-500">{getErrorMessage("address")}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="cityInfo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="cityInfo"
                id="cityInfo"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
                placeholder="City"
                value={formData.cityInfo}
                onChange={handleCityChange}
              />
              {getErrorMessage("cityInfo") && (
                <p className="text-red-500">{getErrorMessage("cityInfo")}</p>
              )}
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
                value={formData.selectedProvince}
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
                value={formData.postalCode}
                onChange={handlePostalChange}
              />
              {getErrorMessage("postalCode") && (
                <p className="text-red-500">{getErrorMessage("postalCode")}</p>
              )}
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
                value={formData.selectedChapter}
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
            <label
              htmlFor="primary-phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Primary Phone Number
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="primary-phone"
                id="primary-phone"
                value={formData.primaryPhone}
                onChange={handlePrimaryPhoneChange}
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6 ${
                  getErrorMessage("primaryPhone") ? "border-red-500" : ""
                }`}
                placeholder="10-digit phone number"
              />
              {getErrorMessage("primaryPhone") && (
                <p className="text-red-500">
                  {getErrorMessage("primaryPhone")}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="secondary-phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Secondary Phone Number
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="secondary-phone"
                id="secondary-phone"
                value={formData.secondaryPhone}
                onChange={handleSecondaryPhoneChange}
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6 ${
                  getErrorMessage("secondaryPhone") ? "border-red-500" : ""
                }`}
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
                value={formData.email}
                onChange={handleEmailChange}
              />
              {getErrorMessage("email") && (
                <p className="text-red-500">{getErrorMessage("email")}</p>
              )}
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
