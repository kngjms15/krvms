"use client";

import React from "react";
import "./volunteerInfo.css";
import { useState } from "react";

function VolunteerInfo() {

  const provinces = [];

  const albertaChapters = [
    "Bonnyville",
    "Bow Valley",
    "Calgary",
    "Camrose",
    "Claresholm",
    "Cold Lake",
    "Crowsnest Pass",
    "Delia",
    "Drumheller",
    "Edmonton",
    "Fairview",
    "Fort Saskatchewan",
    "Grande Cache",
    "Hanna",
    "Kneehill",
    "Lac La Biche",
    "Lacombe",
    "Leduc & County",
    "Lethbridge & Taber",
    "Medicine Hat & Redcliff",
    "Okotoks",
    "Parkland",
    "Pincher Creek",
    "Ponoka",
    "Provost",
    "Red Deer",
    "Slave Lake",
    "St Albert",
    "St Paul",
    "Stettler",
    "Vegreville (County of Minburn)",
    "Vermilion",
    "Viking",
    "Vulcan County",
    "Wainwright",
    "Whitecourt",
    "Wood Buffalo"
  ];

  const [chapter, setChapter] = useState("");

  const [province, setProvince] = useState("");  





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
            <select className="formSelect">
              <option value="AB">AB</option>
              <option value="SK">SK</option>
              <option value="BC">BC</option>
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
            <select className="formSelect">
              {
                albertaChapters.map((chapter) => {
                  if(chapter == 'AB')
                  return <option value={chapter}>{chapter}</option>
                })
              }
         
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
