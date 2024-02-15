'use client'

import React from "react";
import { useState } from "react";

const Acknowledgement = () => {
  const [agreed,setAgreed] = useState(false);

  return (
    <div className="flex-grow max-w-[940px] m-auto my-6">
      <title>KidSport Acknowledgement</title>
      <form action="" className="bg-[#F2F2F2] rounded-lg p-8">
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
              Sports Bank volunteer, KidSport™ Calgary or Calgary Flames Sports
              Bank shall be permitted to obtain copies of any of my relevant
              health records as it may request. I shall execute any
              authorization for Release of Health Records as KidSport™ Calgary
              or Calgary Flames Sports Bank considers necessary, and my failure
              to do so will result in the automatic suspension of any claim I
              may have. A claim will automatically terminate if I rescind a
              release.{" "}
            </p>
          </div>
          <div className="flex p-3">
            <p>
              {" "}
              • I understand the information will be kept confidential in
              accordance with Alberta&apos;s Personal Information Protection Act
              (PIPA).{" "}
            </p>
          </div>
          <div className="flex p-3">
            <p>
              • I hereby give my permission to KidSport™ Calgary or Calgary
              Flames Sports Bank to use my photo when necessary for the purpose
              of KidSport™ Calgary.{" "}
            </p>
          </div>
          <div className="flex p-3">
            <p>
              • I hereby release KidSport™ Calgary or Calgary Flames Sports Bank
              from all responsibility that may occur as a result of my personal
              use of an automobile when volunteering for KidSport™ Calgary or
              Calgary Flames Sports Bank activities.{" "}
            </p>
          </div>
          <div className="flex p-3">
            <p>
              • I agree to carry out my assigned volunteer tasks in a reasonable
              and safe manner.
            </p>
          </div>
          <div className="flex p-3">
            <p>
              • I am aware of the KidSport™ Calgary or Calgary Flames Sports
              Bank policy that breach of confidentiality with respect to
              KidSport™ Calgary or Calgary Flames Sports Bank Applicants will
              result in an immediate request for my resignation.{" "}
            </p>
          </div>
          <div className="flex p-3">
            <p>
              • I am aware that if my behavior while volunteering is found to be
              questionable or inappropriate by the KidSport™ Calgary or Calgary
              Flames Sports Bank staff, I will be given a verbal warning. Should
              the behavior persist I will be provided a written warning followed
              by a request for my resignation.{" "}
            </p>
          </div>
          <div className="flex p-3">
            <p>
              • I am aware that KidSport™ Calgary or Calgary Flames Sports Bank
              provides insurance coverage for me while I perform volunteer
              duties with due care.{" "}
            </p>
          </div>
          <div className="flex p-3">
            <p>
              • The personal information on this form will only be collected and
              shared under the authority of the Freedom of Information and
              Protection of Privacy Act (FOIP) of the Province of Alberta,
              Section 32(c) and 33(1) (b2) and the Canadian Immigration Act
              Section 96.1-3. The purpose of collecting this information
              includes: determining eligibility for volunteer opportunities,
              programs, services, and recognition, to facilitate your
              registration process, to administer and evaluate our volunteers
              and programs, statistical purposes and to activate the Volunteer
              Accident Insurance coverage. This information may be shared with
              other volunteers and volunteers&apos; supervisory staff.
            </p>
          </div>

          <div className="flex justify-center mt-5 p-2">
            <input
              type="checkbox"
              name="acknowledgement"
              id="acknowledgement"
              className="align-middle justify-center w-5 h-5"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <label htmlFor="acknowledgement" className="ml-3">
              I agree to the terms and conditions.
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-20">
          <div>
            <button
              type="submit"
              id="acknowledgement-back"
              className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
            >
              Back
            </button>
          </div>

          <div>
            <button
              type="submit"
              id="volunteer-info-next"
              className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75 ${agreed ? 'bg-[#6CC24A]' : 'bg-gray-400'}`}
              disabled={!agreed}
            >
              Finish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Acknowledgement;
