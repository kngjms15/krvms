import React from "react";
import "./backgroundInfo.css";

function BackgroundInfo() {
  return (
    <>
    
      <form>
        <div className="formHeader">
          <h1>BACKGROUND INFORMATION</h1>
        </div>

        <div className="inputFieldBlock">
          <div className="inputFieldBlock">
            <label htmlFor="employer" className="form-label">
              Employer:
            </label>
            <input type="text" className="form-control" />
          </div>

          <div className="inputFieldBlock">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Please list previous volunteer experience (who you volunteered
              with and what your tasks were):
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
            ></textarea>
          </div>

          <div className="inputFieldBlock">
            <label htmlFor="conviction" className="form-label">
              Have you had any criminal conviction for which a pardon has not
              been granted?
            </label>

            <div className="inputFieldFlexRadio">
              <div className="inputFieldFlexRadio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="conviction"
                  id="convictionYes"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Yes
                </label>
              </div>
              <div className="inputFieldFlexRadio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="conviction"
                  id="convictionNo"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>

            <div className="inputFieldBlock">
              <label htmlFor="inputZip" className="form-label">
                (Please note: a security reference check is required)
              </label>
            </div>
          </div>

          <div className="inputFieldBlock">
            <label htmlFor="conviction" className="form-label">
              Are you bondable?
            </label>

            <div className="inputFieldFlexRadio">
              <div className="inputFieldFlexRadio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bondable"
                  id="bondableYes"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Yes
                </label>
              </div>
              <div className="inputFieldFlexRadio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bondable"
                  id="bondableNo"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="inputFieldBlock">
            <label htmlFor="conviction" className="form-label">
              Do you have any medical condition or disability that we should be
              aware of?
            </label>

            <div className="inputFieldFlexRadio">
              <div className="inputFieldFlexRadio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="medicalCondition"
                  id="medicalConditionYes"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Yes
                </label>
              </div>
              <div className="inputFieldFlexRadio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="medicalCondition"
                  id="medicalConditionNo"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <div className="inputFieldBlock">
              <label htmlFor="inputZip" className="form-label">
                If Yes, Please explain:
              </label>
              <input
                type="text"
                className="form-control"
                id="inputZip"
                placeholder="Please leave blank if it doesn't apply"
              />
            </div>
          </div>
        </div>

        <div className="formHeader">
          <h1>EMERGENCY CONTACT INFORMATION</h1>
        </div>

        <div className="inputFieldBlock">
          <div className="inputFieldBlock">
            <label htmlFor="eContact" className="form-label">
              Full Name:
            </label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="inputFieldBlock">
          <div className="inputFieldBlock">
            <label htmlFor="eContact" className="form-label">
              Relationship to you:
            </label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="inputFieldBlock">
          <div className="inputFieldBlock">
            <label htmlFor="eContact" className="form-label">
              Emergency Phone Number:
            </label>
            <input type="text" className="form-control" />
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

export default BackgroundInfo;
