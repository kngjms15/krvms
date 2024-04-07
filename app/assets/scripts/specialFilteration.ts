import { Filtering } from "@/app/components/filtering";
import { VolunteerApplicant } from "@prisma/client";

export function filterApplicants(filterChoice:string,orderChoice:string,array:VolunteerApplicant[],calculateAge:(value:Date)=>number, searchedValue:string): VolunteerApplicant[]{
    const result = array.filter(applicant => {
        if (filterChoice === "By Name") {
            return applicant.firstName === searchedValue.split(' ')[0] || applicant.lastName === searchedValue.split(' ')[1];
        } else if (filterChoice === "By Age") {
            return calculateAge(applicant.dob) === Number(searchedValue);
        } else if (filterChoice === "By Id") {
            return applicant.applicantId === searchedValue;
        } else if (filterChoice === "By Chapter") {
            return applicant.chapter === searchedValue;
        } else if (filterChoice === "By Minimum Age"){
          return calculateAge(applicant.dob) >= Number(searchedValue);
        } else if (filterChoice === "By Maximum Age"){
          return calculateAge(applicant.dob) <= Number(searchedValue);
        }
    });

    if (orderChoice === "First Name A-Z") {
        result.sort((a, b) => {
            const nameA = a.firstName.toLowerCase();
            const nameB = b.firstName.toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (orderChoice === "Last Name A-Z") {
      result.sort((a, b) => {
            const nameA = a.lastName.toLowerCase();
            const nameB = b.lastName.toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (orderChoice === "First Name Z-A") {
      result.sort((a, b) => {
            const nameA = a.firstName.toLowerCase();
            const nameB = b.firstName.toLowerCase();
            return nameA.localeCompare(nameB) * -1;
        });
    } else if (orderChoice === "Last Name Z-A") {
      result.sort((a, b) => {
            const nameA = a.lastName.toLowerCase();
            const nameB = b.lastName.toLowerCase();
            return nameA.localeCompare(nameB) * -1;
        });
    } else if (orderChoice === "Oldest First") {
      result.sort((a, b) => {
            const ageA = calculateAge(a.dob);
            const ageB = calculateAge(b.dob);
            return ageA - ageB;
        });
    } else if (orderChoice === "Youngest First") {
      result.sort((a, b) => {
            const ageA = calculateAge(a.dob);
            const ageB = calculateAge(b.dob);
            return ageB - ageA;
        });
    } else if (orderChoice === "Most Recent") {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        const differenceInMilliseconds = dateA.getTime() - dateB.getTime();
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))*-1;
        return differenceInDays;
        });
    } else if (orderChoice === "Least Recent") {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        const differenceInMilliseconds = dateA.getTime() - dateB.getTime();
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return differenceInDays;
      });
    } else if (orderChoice === "Chapter A-Z") {
      result.sort((a, b) => {
            const nameA = a.chapter.toLowerCase();
            const nameB = b.chapter.toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (orderChoice === "Chapter Z-A") {
      result.sort((a, b) => {
            const nameA = a.chapter.toLowerCase();
            const nameB = b.chapter.toLowerCase();
            return nameA.localeCompare(nameB) * -1;
        });
    }

    return result;
}

export function gatherDropdownOptions():Filtering{
    const filterByArr = ["By Name","By Age","By Id","By Chapter","By Minimum Age","By Maximum Age"];
    const orderByArr = ["First Name A-Z","Last Name A-Z","First Name Z-A","Last Name Z-A","Oldest First",
    "Youngest First","Most Recent","Least Recent","Chapter A-Z","Chapter Z-A"]
   
    const dropdownOptions: Filtering = {filterBy: filterByArr, orderBy: orderByArr}

    return dropdownOptions;
}