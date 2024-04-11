import { Filtering } from "@/app/components/filtering";
import { Volunteer, VolunteerApplicant } from "@prisma/client";

export function filterApplicants(filterChoice:string,orderChoice:string,array:VolunteerApplicant[],calculateAge:(value:Date)=>number, searchedValue:string): VolunteerApplicant[]{
    const result = array.filter(applicant => {
        if (filterChoice === "By Name") {
              const fullname = `${applicant.firstName} ${applicant.lastName}`.trimEnd();
            return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? fullname.startsWith(searchedValue.trimEnd()) || fullname.endsWith(searchedValue.trimEnd()):false;
        } else if (filterChoice === "By Age") {
            return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? calculateAge(applicant.dob) === Number(searchedValue):false;
        } else if (filterChoice === "By Id") {
            return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? applicant.applicantId === searchedValue:false;
        } else if (filterChoice === "By Chapter") {
            return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? applicant.chapter.startsWith(searchedValue) || applicant.chapter.endsWith(searchedValue):false;
        } else if (filterChoice === "By Minimum Age"){
          return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? calculateAge(applicant.dob) >= Number(searchedValue):false;
        } else if (filterChoice === "By Maximum Age"){
          return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? calculateAge(applicant.dob) <= Number(searchedValue):false;
        } else if (filterChoice === "By Email Address"){
          return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))?applicant.email.trimEnd().startsWith(searchedValue.trimEnd()) || applicant.email.trimEnd().endsWith(searchedValue.trimEnd()):false;
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
    } else if (orderChoice === "Email A-Z"){
      result.sort((a,b)=> {
          const emailA = a.email.toLowerCase();
          const emailB = b.email.toLowerCase();
          return emailA.localeCompare(emailB);
      })
    } else if (orderChoice === "Email Z-A"){
      result.sort((a,b)=> {
          const emailA = a.email.toLowerCase();
          const emailB = b.email.toLowerCase();
          return emailA.localeCompare(emailB) * -1;
      })
    }

    return result;
}

export function filterVolunteers(filterChoice:string,orderChoice:string,array:Volunteer[],calculateAge:(value:Date)=>number, searchedValue:string): Volunteer[]{
  const result = array.filter(applicant => {
      if (filterChoice === "By Name") {
            const fullname = `${applicant.firstName} ${applicant.lastName}`.trimEnd();
          return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? fullname.startsWith(searchedValue.trimEnd()) || fullname.endsWith(searchedValue.trimEnd()):false;
      } else if (filterChoice === "By Age") {
          return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? calculateAge(applicant.dob) === Number(searchedValue):false;
      } else if (filterChoice === "By Id") {
          return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? applicant.volunteerId === searchedValue:false;
      } else if (filterChoice === "By Chapter") {
          return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? applicant.chapter.startsWith(searchedValue) || applicant.chapter.endsWith(searchedValue):false;
      } else if (filterChoice === "By Minimum Age"){
        return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? calculateAge(applicant.dob) >= Number(searchedValue):false;
      } else if (filterChoice === "By Maximum Age"){
        return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))? calculateAge(applicant.dob) <= Number(searchedValue):false;
      } else if (filterChoice === "By Email Address"){
        return (/^(?=.*[a-zA-Z0-9]).*$/.test(searchedValue))?applicant.email.trimEnd().startsWith(searchedValue.trimEnd()) || applicant.email.trimEnd().endsWith(searchedValue.trimEnd()):false;
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
  } else if (orderChoice === "Email A-Z"){
    result.sort((a,b)=> {
        const emailA = a.email.toLowerCase();
        const emailB = b.email.toLowerCase();
        return emailA.localeCompare(emailB);
    })
  } else if (orderChoice === "Email Z-A"){
    result.sort((a,b)=> {
        const emailA = a.email.toLowerCase();
        const emailB = b.email.toLowerCase();
        return emailA.localeCompare(emailB) * -1;
    })
  }

  return result;
}

export function gatherDropdownOptions():Filtering{
    const filterByArr = ["By Name","By Age","By Id","By Chapter","By Minimum Age","By Maximum Age","By Email Address"];
    const orderByArr = ["First Name A-Z","Last Name A-Z","First Name Z-A","Last Name Z-A","Oldest First",
    "Youngest First","Most Recent","Least Recent","Chapter A-Z","Chapter Z-A","Email A-Z","Email Z-A"]
   
    const dropdownOptions: Filtering = {filterBy: filterByArr, orderBy: orderByArr}

    return dropdownOptions;
}