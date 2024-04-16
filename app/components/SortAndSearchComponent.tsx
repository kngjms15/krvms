import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SortAndSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const SortAndSearchComponent: React.FC<SortAndSearchProps> = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
}) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center">
        <label htmlFor="search" className="mr-2 font-semibold">
          Search:
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="block rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="sort" className="mr-2 font-semibold">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="block rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6CC24A] sm:text-sm sm:leading-6"
        >
          <option value="">-- Select --</option>
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="province">Province</option>
          <option value="chapter">Chapter</option>

        </select>
      </div>
    </div>
  );
};

export default SortAndSearchComponent;
