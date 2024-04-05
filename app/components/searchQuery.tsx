import { Filtering } from "./filtering";

interface iSearchQuery{
    innerTexting: string;
    dropdownOptions: Filtering;
    handlingFilter: (value:any) => void;
    handlingOrder: (value:any) => void;
    submitSearch: () => void;
    clearSearch: () => void
    handleSearchValue: (value:any) => void;
}


const SearchQuery:React.FC<iSearchQuery> = ({innerTexting,dropdownOptions,handlingFilter,handlingOrder,submitSearch,clearSearch,handleSearchValue}) => {
    return (
        <div className="text-gray-600 flex flex-row justify-start mt-3 mb-3">
        <input type="search" name="search" id="search" placeholder={innerTexting} className="bg-white h-10 px-5 pr-10 rounded-xl text-sm focus:outline-none" onChange={(e)=>{handleSearchValue(e)}}/>
        <div className="w-fit ml-2">
            Filter: 
            <select id="filterSel" className="ml-2 bg-slate-50 rounded-md" onChange={handlingFilter}>
                {dropdownOptions.filterBy.map((option, index)=> (
                    <option key={index} value={option}>{option}&nbsp;&nbsp;</option>
                ))}
            </select>
        </div>
        <div className="w-fit ml-4">
            Order:
            <select id="orderSel" className="ml-2 bg-slate-50 rounded-md" onChange={handlingOrder}>
                {dropdownOptions.orderBy.map((option, index)=> (
                    <option key={index} value={option}>{option}&nbsp;&nbsp;</option>
                ))}
            </select>
        </div>
        <div className="w-fit ml-6 h-fit mt-1">
            <button className="bg-gray-200 border-2 border-black pb-1 pt-1 pr-5 pl-5 text-center rounded-md hover:bg-cyan-300 hover:border-white hover:text-white"
            onClick={()=>{submitSearch()}}>Search</button>
        </div>
        <div className="w-fit ml-6 h-fit mt-1">
            <button className="bg-gray-200 border-2 border-black pb-1 pt-1 pr-5 pl-5 text-center rounded-md hover:bg-cyan-300 hover:border-white hover:text-white"
            onClick={()=>{clearSearch()}}>Clear</button>
        </div>
      </div>
    );
}

export default SearchQuery;