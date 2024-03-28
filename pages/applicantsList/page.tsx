'use client';

import React, { useEffect, useState } from "react";
import ApplicantsList from "./applicantsList";


import { VolunteerApplicant } from "@prisma/client"; // Or the correct type for an applicant

const ApplicantsListPage: React.FC = () => {
  const [applicants, setApplicants] = useState<VolunteerApplicant[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch("/api/applicants");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setApplicants(data);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div className="flex-grow max-w-[940px] m-auto ">
      <h1>Applicants</h1>
      {applicants.map((applicant) => (
        applicant && applicant.firstName && (
        <ApplicantsList key={applicant.applicantId} applicant={applicant} />
        )
      ))}
    </div>
  );
};

export default ApplicantsListPage;
