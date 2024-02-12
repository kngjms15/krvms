"use client";

import React from "react";
import "./volunteerInfo.css";
import { useState } from "react";
import ProvinceChapters from "./provinceChapters.json";

function VolunteerInfo() {
  const [province] = useState(
    ProvinceChapters.map((province) => province.Province)
  );

  const [selectedProvince, setSelectedProvince] = useState("AB");
  const [selectedChapter, setSelectedChapter] = useState("");

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
    <>
      <form>
        <div className="formHeader">
          <h1 className="text-blue- ">VOLUNTEER INFORMATION</h1>
        </div>

        <div className="inputFieldFlex">
          <div className="fNameDiv">
            <label htmlFor="inputFirstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
            />
          </div>
          <div className="lNameDiv">
            <label htmlFor="inputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
        </div>

        <div className="inputFieldFlex">
          <div className="fNameDiv">
            <label htmlFor="inputFirstName" className="form-label">
              Date of birth
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="dd/mm/yyyy"
              aria-label="First name"
            />
          </div>
        </div>

        <div className="inputFieldFlex">
          <div className="address1">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control2"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
        </div>

        <div className="inputFieldBlock">
          <div>
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input type="text" className="form-control-small" id="inputCity" />
          </div>

          <div>
            <label htmlFor="Province" className="form-label">
              Province
            </label>
            <select
              className="formSelect"
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

          <div>
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
        </div>

        <div>
          <label htmlFor="Chapter" className="form-label">
            Chapter
          </label>
          <select
            className="formSelect"
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

        <div className="inputFieldBlock">
          <div className="inputFieldFlex">
            <div className="inputFieldBlock">
              <label htmlFor="inputPhone" className="form-label">
                Primary Phone number
              </label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
            <div>
              <label htmlFor="inputPhone" className="form-label">
                Secondary Phone number
              </label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
          </div>
          <div>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div className="buttonDiv">
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </>
  );
}

export default VolunteerInfo;
