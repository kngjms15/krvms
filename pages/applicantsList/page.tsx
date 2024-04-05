'use client';

import React, { useEffect, useState } from "react";
import ApplicantsList from "./applicantsList";

import { VolunteerApplicant } from "@prisma/client"; // Or the correct type for an applicant
import SearchQuery from "@/app/components/searchQuery";
import { Filtering } from "@/app/components/filtering";

const ApplicantsListPage: React.FC = () => {
  const [applicants, setApplicants] = useState<VolunteerApplicant[]>([]);
  const [chosenFilter, setChosenFilter] = useState('By Name');
  const [chosenOrder, setChosenOrder] = useState('First Name A-Z');
  const [searchedValue, setSearchedValue] = useState(" ");
  const [innerTexting, setInnerTexting] = useState("Enter Applicant's info:");
  const errorTexting = "Please enter Applicant's info!";

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
  },[]);

  const clearSearch = async () =>{
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
  }

const calculateAge = (value:Date): number => {
  const currentDate = new Date();
  const valuedDate = new Date(value);

  return currentDate.getFullYear() - valuedDate.getFullYear();
 }

 const filterByArr = ["By Name","By Age","By Id","By Chapter","By Minimum Age","By Maximum Age"];
 const orderByArr = ["First Name A-Z","Last Name A-Z","First Name Z-A","Last Name Z-A","Oldest First",
 "Youngest First","Most Recent","Least Recent","Chapter A-Z","Chapter Z-A"]

 const dropdownOptions: Filtering = {filterBy: filterByArr, orderBy: orderByArr}

 const handlingFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setChosenFilter(e.target.value);
  }
 const handlingOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setChosenOrder(e.target.value);
}

const submitSearch = () => {
  if(searchedValue!==" "){
      const updatedFilteredApplicants = applicants.filter(applicant => {
          if (chosenFilter === "By Name") {
              return applicant.firstName === searchedValue.split(' ')[0] || applicant.lastName === searchedValue.split(' ')[1];
          } else if (chosenFilter === "By Age") {
              return calculateAge(applicant.dob) === Number(searchedValue);
          } else if (chosenFilter === "By Id") {
              return applicant.applicantId === searchedValue;
          } else if (chosenFilter === "By Chapter") {
              return applicant.chapter === searchedValue;
          } else if (chosenFilter === "By Minimum Age"){
            return calculateAge(applicant.dob) >= Number(searchedValue);
          } else if (chosenFilter === "By Maximum Age"){
            return calculateAge(applicant.dob) <= Number(searchedValue);
          }
      });

      if (chosenOrder === "First Name A-Z") {
        updatedFilteredApplicants.sort((a, b) => {
            const nameA = a.firstName.toLowerCase();
            const nameB = b.firstName.toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (chosenOrder === "Last Name A-Z") {
      updatedFilteredApplicants.sort((a, b) => {
            const nameA = a.lastName.toLowerCase();
            const nameB = b.lastName.toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (chosenOrder === "First Name Z-A") {
      updatedFilteredApplicants.sort((a, b) => {
            const nameA = a.firstName.toLowerCase();
            const nameB = b.firstName.toLowerCase();
            return nameA.localeCompare(nameB) * -1;
        });
    } else if (chosenOrder === "Last Name Z-A") {
      updatedFilteredApplicants.sort((a, b) => {
            const nameA = a.lastName.toLowerCase();
            const nameB = b.lastName.toLowerCase();
            return nameA.localeCompare(nameB) * -1;
        });
    } else if (chosenOrder === "Oldest First") {
      updatedFilteredApplicants.sort((a, b) => {
            const ageA = calculateAge(a.dob);
            const ageB = calculateAge(b.dob);
            return ageA - ageB;
        });
    } else if (chosenOrder === "Youngest First") {
      updatedFilteredApplicants.sort((a, b) => {
            const ageA = calculateAge(a.dob);
            const ageB = calculateAge(b.dob);
            return ageB - ageA;
        });
    } else if (chosenOrder === "Most Recent") {
      updatedFilteredApplicants.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        const differenceInMilliseconds = dateA.getTime() - dateB.getTime();
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))*-1;
        return differenceInDays;
        });
    } else if (chosenOrder === "Least Recent") {
      updatedFilteredApplicants.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        const differenceInMilliseconds = dateA.getTime() - dateB.getTime();
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return differenceInDays;
      });
    } else if (chosenOrder === "Chapter A-Z") {
      updatedFilteredApplicants.sort((a, b) => {
            const nameA = a.chapter.toLowerCase();
            const nameB = b.chapter.toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (chosenOrder === "Chapter Z-A") {
      updatedFilteredApplicants.sort((a, b) => {
            const nameA = a.chapter.toLowerCase();
            const nameB = b.chapter.toLowerCase();
            return nameA.localeCompare(nameB) * -1;
        });
    }
      setApplicants(updatedFilteredApplicants);
  }else{
      setInnerTexting(`${errorTexting}`);
      setTimeout(()=>{
          setInnerTexting(innerTexting);
      },8000);
  }
}

const handleSearchValue = (event:React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value
  setSearchedValue(value);
 }

  return (
    <div className="flex-grow m-auto">
        <SearchQuery
          handleSearchValue={handleSearchValue}
          handlingFilter={handlingFilter}
          dropdownOptions={dropdownOptions}
          handlingOrder={handlingOrder}
          submitSearch={submitSearch}
          clearSearch={clearSearch}
          innerTexting={innerTexting}
        />
      {applicants.length>0?(applicants.map((applicant) => (
          applicant && applicant.firstName && (
            <ApplicantsList key={applicant.applicantId} applicant={applicant} />
          )
        ))
      ):(
        <div className="justify-center align-middle">
          <h2 className="text-center">Sorry! Nothing fits that search query</h2>
        </div>
      )}
    </div>
  );
};

export default ApplicantsListPage;
