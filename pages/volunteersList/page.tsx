'use client';

import React, { useEffect, useState } from "react";
import VolunteersList from "./volunteersList";

import { Volunteer } from "@prisma/client"; // Or the correct type for an applicant
import SearchQuery from "@/app/components/searchQuery";
import FilterModal from "@/app/components/filterModal";
import { filterVolunteers, gatherDropdownOptions } from "@/app/assets/scripts/specialFilteration";

const ApplicantsListPage: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [defaultVolunteers, setDefaultVolunteers] = useState<Volunteer[]>([]);
  const [chosenFilter, setChosenFilter] = useState('By Name');
  const [chosenOrder, setChosenOrder] = useState('First Name A-Z');
  const [searchedValue, setSearchedValue] = useState("");
  const [innerTexting, setInnerTexting] = useState("Enter Applicant's info:");
  const errorTexting = "Please enter info!";
  const [foundResults, setFoundResults] = useState(false);
  const [numberOfVolunteers, setNumberOfVolunteers] = useState(0);
  const [numberQueried, setNumberQueried] = useState(0);
  const [failedOrMissingQuery, setFailedOrMissingQuery] = useState("Please wait a moment!")
  const [filterShown, setFilterShown] = useState(false);

  const fetchNumberOfApplicants = async () => {
    let gatheredApplicants: Volunteer[] = []
    try {
      const response = await fetch("/api/applicants");
      if(!response.ok){
        setNumberOfVolunteers(0);
      }
      const data = await response.json();
      gatheredApplicants = data;
      setNumberOfVolunteers(gatheredApplicants.length);
    } catch (error) {
      console.error("Failed to fetch applicants:",error);
      setNumberOfVolunteers(0);
    }
  }

  if(numberOfVolunteers===0){fetchNumberOfApplicants();}

  useEffect(() => {
    fetchNumberOfApplicants();
    const fetchApplicants = async () => {
      try {
        const response = await fetch("/api/applicants");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setVolunteers(data);
        setDefaultVolunteers(data);
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
      setVolunteers(data);
      setFoundResults(false);
      setSearchedValue('')
    } catch (error) {
      console.error("Failed to fetch applicants:", error);
    }
  }

const calculateAge = (value:Date): number => {
  const currentDate = new Date();
  const valuedDate = new Date(value);

  return currentDate.getFullYear() - valuedDate.getFullYear();
 }

const submitSearch = () => {
  let updatedFilteredApplicants: Volunteer[] = [];
  setFailedOrMissingQuery("There is nothing that matches!")
  if(/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue.trimEnd())){
      updatedFilteredApplicants = filterVolunteers(chosenFilter,chosenOrder,defaultVolunteers,calculateAge,searchedValue);
      setVolunteers(updatedFilteredApplicants);
      setFoundResults(true);
      setNumberQueried(updatedFilteredApplicants.length);
      fetchNumberOfApplicants();
  }else{
      setNumberQueried(0);
      fetchNumberOfApplicants();
      setVolunteers(defaultVolunteers);
      setFoundResults(false);
      setInnerTexting(`${errorTexting}`);
      setTimeout(()=>{
          setInnerTexting(innerTexting);
      },8000);
  }
}

const handleSearchValue = (event:React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value
  setSearchedValue(value.trimEnd());
 }

 const cancelFilterToggle = () => {
  setFilterShown(false);
 }

 const handlingFilterChoices = () => {
  const valueA = (document.querySelector('input[id="volunteerListSelectedA"]:checked') as HTMLInputElement)?.value;
  const valueB = (document.querySelector('input[id="volunteerListSelectedB"]:checked') as HTMLInputElement)?.value;
  if(valueA!==null && valueB!==null){
    setChosenFilter(valueA);
    setChosenOrder(valueB);
  }else{
    setChosenFilter(gatherDropdownOptions().filterBy[0]);
    setChosenOrder(gatherDropdownOptions().orderBy[0]);    
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
            filterOptions={gatherDropdownOptions()}
            defaultFilter={chosenFilter}
            defaultOrder={chosenOrder}
            filterName="volunteerList"
          />        
        }        
        <SearchQuery
          handleSearchValue={handleSearchValue}
          submitSearch={submitSearch}
          clearSearch={clearSearch}
          innerTexting={innerTexting}
          togglefilter={()=>{setFilterShown(true)}}
          value={searchedValue}
        />
        {(chosenFilter && chosenOrder) && 
                <div className="ml-6 text-cyan-600 text-lg border-r border-gray-400 pr-6">
                    <strong>Filter: </strong>{chosenFilter} <strong className="ml-2 pl-4 border-l border-gray-400 ">Order: </strong>{chosenOrder}    
                </div>               
        }  
        {foundResults &&
          <div className="ml-6 text-lg">
              <p className="text-cyan-600">
                  <strong>{numberQueried}</strong> Result{numberQueried>1?'s':''} out of <strong>{numberOfVolunteers}</strong> total
              </p>
          </div>         
        } 
      </div> 
      {volunteers.length>0?(volunteers.map((volunteer) => (
          volunteer && volunteer.firstName && (
            <VolunteersList key={volunteer.volunteerId} volunteer={volunteer} />
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
