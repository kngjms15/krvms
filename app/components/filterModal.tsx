import React, { useState } from "react";
import { Filtering } from "./filtering";

interface FilterModalProps {
  message: string;
  onSubmit: () => void;
  filterOptions: Filtering;
  defaultFilter: string;
  defaultOrder: string;
  filterName: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  message,
  onSubmit,
  filterOptions,
  defaultFilter,
  defaultOrder,
  filterName
}) => {
    const [selectedFilterOption, setSelectedFilterOption] = useState(defaultFilter);
    const [selectedFilterOrder, setSelectedFilterOrder] = useState(defaultOrder);

    const handleSelectFilter = (value:string) => {
        setSelectedFilterOption(value);
    }

    const handleSelectOlder = (value:string) => {
        setSelectedFilterOrder(value);
    }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-400 pl-28 pr-28 p-2 rounded-t-lg shadow-md">
        <p className="text-lg text-white">{message}</p>
      </div>
      <div className="bg-white pl-7 pr-7 p-6 rounded-b-lg shadow-md">
        <div className="flex flex-row">
            <div className="justify-start flex-1 mb-4 mt-3">
                {filterOptions.filterBy.map((option,index)=> (
                    <div key={`A${index}`} className={`rounded-lg p-1 pr-4 ${selectedFilterOption===option && 'bg-gray-600 text-white'}`}>
                        <input type="radio" id={`${selectedFilterOption===option?`${filterName}SelectedA`:`${filterName}UnselectedA${index}`}`} value={option} checked={selectedFilterOption===option} onChange={()=>{handleSelectFilter(option)}} className="selected:bg-white"/>&nbsp;&nbsp;{option}
                    </div>
                ))}
            </div>
            <div className="justify-start flex-2 mb-4 mt-3">
                {filterOptions.orderBy.map((option,index)=> (
                    <div key={`B${index}`} className="border-l-2 border-gray-300 ml-4 pl-5">
                        <div className={`rounded-lg p-1 pr-4 ${selectedFilterOrder===option && 'bg-gray-600 text-white'}`}>
                            <input type="radio" value={option} id={`${selectedFilterOrder===option?`${filterName}SelectedB`:`${filterName}UnselectedB${index}`}`} checked={selectedFilterOrder===option} onChange={()=>{handleSelectOlder(option)}}/>&nbsp;&nbsp;{option}
                        </div>
                    </div>
                ))}
            </div> 
        </div>       
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
            onClick={()=>{onSubmit()}}
          >
            Exit / Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
