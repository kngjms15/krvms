import React from "react";
import "./volunteerInfo.css";

function VolunteerInfo() {
  return (
    <>
      <form>
        <div className="formHeader">
          <h1>Volunteer Information</h1>
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
          <div className="address1">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="address2">
            <label htmlFor="inputAddress2" className="form-label">
              Address 2
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
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
