'use client';

import React, { useEffect, useState } from "react";
import ApplicantsList from "./applicantsList";

import { VolunteerApplicant } from "@prisma/client"; // Or the correct type for an applicant
import SearchQuery from "@/app/components/searchQuery";
import { Filtering } from "@/app/components/filtering";
import FilterModal from "@/app/components/filterModal";

const ApplicantsListPage: React.FC = () => {
  const [applicants, setApplicants] = useState<VolunteerApplicant[]>([]);
  const [chosenFilter, setChosenFilter] = useState('By Name');
  const [chosenOrder, setChosenOrder] = useState('First Name A-Z');
  const [searchedValue, setSearchedValue] = useState(" ");
  const [innerTexting, setInnerTexting] = useState("Enter Applicant's info:");
  const errorTexting = "Please enter Applicant's info!";
  const [foundResults, setFoundResults] = useState(false);
  const [numberOfApplicants, setNumberOfApplicants] = useState(0);
  const [numberQueried, setNumberQueried] = useState(0);
  const [failedOrMissingQuery, setFailedOrMissingQuery] = useState("Please wait a moment!")
  const [filterShown, setFilterShown] = useState(false);

  const fetchNumberOfApplicants = async () => {
    let gatheredApplicants: VolunteerApplicant[] = []
    try {
      const response = await fetch("/api/applicants");
      if(!response.ok){
        setNumberOfApplicants(0);
      }
      const data = await response.json();
      gatheredApplicants = data;
      setNumberOfApplicants(gatheredApplicants.length);
    } catch (error) {
      console.error("Failed to fetch applicants:",error);
      setNumberOfApplicants(0);
    }
  }

  useEffect(() => {
    fetchNumberOfApplicants();
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
      setFoundResults(false);
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

const submitSearch = () => {
  let updatedFilteredApplicants: VolunteerApplicant[] = [];
  setFailedOrMissingQuery("There is nothing that matches!")
  if(searchedValue!==" "){
      updatedFilteredApplicants = applicants.filter(applicant => {
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
      setNumberQueried(0);
      fetchNumberOfApplicants();
      setInnerTexting(`${errorTexting}`);
      setTimeout(()=>{
          setInnerTexting(innerTexting);
      },8000);
  }
  setNumberQueried(updatedFilteredApplicants.length);
  fetchNumberOfApplicants();
  setFoundResults(true);
}

const handleSearchValue = (event:React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value
  setSearchedValue(value);
 }

 const cancelFilterToggle = () => {
  setFilterShown(false);
 }

 const handlingFilterChoices = () => {
  const valueA = (document.querySelector('input[id="selectedA"]:checked') as HTMLInputElement)?.value;
  const valueB = (document.querySelector('input[id="selectedB"]:checked') as HTMLInputElement)?.value;
  if(valueA!==null && valueB!==null){
    setChosenFilter(valueA);
    setChosenOrder(valueB);
  }else{
    setChosenFilter(filterByArr[0]);
    setChosenOrder(orderByArr[0]);    
  } 
  cancelFilterToggle();
 }

  return (
    <div className="flex-grow m-auto">
      <div className="flex flex-row items-center">
      {filterShown &&
          <FilterModal
            message="Filter and Order Options"
            onSubmit={()=>handlingFilterChoices()}
            filterOptions={dropdownOptions}
            defaultFilter={chosenFilter}
            defaultOrder={chosenOrder}
          />        
        }        
        <SearchQuery
          handleSearchValue={handleSearchValue}
          submitSearch={submitSearch}
          clearSearch={clearSearch}
          innerTexting={innerTexting}
          togglefilter={()=>{setFilterShown(true)}}
        />
        {(chosenFilter && chosenOrder) && 
                <div className="ml-6 text-cyan-600 text-lg border-r border-gray-400 pr-6">
                    <strong>Filter: </strong>{chosenFilter} <strong className="ml-2 pl-4 border-l border-gray-400 ">Order: </strong>{chosenOrder}    
                </div>               
        }  
        {foundResults &&
          <div className="ml-6 text-lg">
              <p className="text-cyan-600">
                  <strong>{numberQueried}</strong> Results out of <strong>{numberOfApplicants}</strong> total
              </p>
          </div>         
        } 
      </div> 
      {applicants.length>0?(applicants.map((applicant) => (
          applicant && applicant.firstName && (
            <ApplicantsList key={applicant.applicantId} applicant={applicant} />
          )
        ))
      ):(
        <div className="justify-center align-middle">
          <h2 className="text-center">{failedOrMissingQuery}</h2>
        </div>
      )}
    </div>
  );
};

export default ApplicantsListPage;
