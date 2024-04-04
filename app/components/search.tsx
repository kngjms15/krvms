import React, { useState } from "react";
import { VolunteerApplicant, Volunteer } from "@prisma/client";

interface SearchProps {
  data: (VolunteerApplicant | Volunteer)[];
  renderItem: (item: VolunteerApplicant | Volunteer) => React.ReactNode;
}

const Search: React.FC<SearchProps> = ({ data, renderItem }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<(VolunteerApplicant | Volunteer)[]>([]);

  const handleSearch = (query: string) => {
    const filteredResults = data.filter(item =>
      item.firstName.toLowerCase().includes(query.toLowerCase()) ||
      item.lastName.toLowerCase().includes(query.toLowerCase()) ||
      item.email.toLowerCase().includes(query.toLowerCase()) ||
      (item.primaryPhone && item.primaryPhone.includes(query))
    );
    setSearchResults(filteredResults);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by first name, last name, email, or phone number"
        value={searchQuery}
        onChange={handleChange}
      />
      {searchResults.map((result, index) => (
        <div key={index}>{renderItem(result)}</div>
      ))}
    </div>
  );
};

export default Search;
