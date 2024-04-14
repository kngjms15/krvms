'use client';

import React, { useEffect, useState } from "react";
import ApplicantsList from "./applicantsList";
import { VolunteerApplicant } from "@prisma/client"; 
import FilterComponent from "@/app/components/applicantsFilter";

const ApplicantsListPage: React.FC = () => {
  const [applicants, setApplicants] = useState<VolunteerApplicant[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<VolunteerApplicant[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch("/api/applicants");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setApplicants(data);
        setFilteredApplicants(data); // Set filtered applicants initially
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

  const handleSort = (sortBy: string) => {
    let sortedApplicants = [...applicants];

    if (sortBy === "name") {
      sortedApplicants.sort((a, b) => {
        return a.firstName.localeCompare(b.firstName) || a.lastName.localeCompare(b.lastName);
      });
    } else if (sortBy === "date") {
      sortedApplicants.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    } else if (sortBy === "chapter"){
      sortedApplicants.sort((a, b) => {
        return a.chapter.localeCompare(b.chapter);
      });
    }

    setFilteredApplicants(sortedApplicants);
  };

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
    <div className="flex-grow m-auto">
      <FilterComponent onSort={handleSort} />
      {filteredApplicants.map((applicant) => (
        applicant && applicant.firstName && (
        <ApplicantsList key={applicant.applicantId} applicant={applicant} />
        )
      ))}
    </div>
  );
};

export default ApplicantsListPage;