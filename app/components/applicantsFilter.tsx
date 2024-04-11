import React, { useState, ChangeEvent } from "react";

interface FilterComponentProps {
  onSort: (sortBy: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onSort }) => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    onSort(e.target.value);
  };

  return (
    <div>
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" value={sortBy} onChange={handleSortChange} className="border border-gray-300 rounded p-1 mx-2">
        <option value="" className="hover:bg-[#6CC24A]">Select...</option>
        <option value="name">Name</option>
        <option value="date">Application Date</option>
        <option value="chapter">Chapter</option>
      </select>
    </div>
  );
};

export default FilterComponent;
