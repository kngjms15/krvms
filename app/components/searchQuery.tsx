interface iSearchQuery{
    innerTexting: string;
    submitSearch: () => void;
    clearSearch: () => void
    handleSearchValue: (value:any) => void;
    togglefilter: () => void;
}


const SearchQuery:React.FC<iSearchQuery> = ({innerTexting,submitSearch,clearSearch,handleSearchValue,togglefilter}) => {
    
    return (
        <div className="text-gray-600 flex items-center mt-3 mb-3">
            Search:&nbsp;
            <input type="search" name="search" id="search" placeholder={innerTexting} className="bg-white h-10 px-5 pr-10 rounded-xl text-sm focus:outline-none" onChange={(e)=>{handleSearchValue(e);}}/>
            <div className="ml-2">
                <button className="rounded-lg p-1 pr-4 pl-4 font-bold bg-gray-400 text-white hover:bg-cyan-400" onClick={()=>{togglefilter()}}>+</button>
            </div>
            <div className="ml-6">
                <button className="bg-gray-200 border-2 border-black pb-1 pt-1 pr-5 pl-5 text-center rounded-md hover:bg-cyan-300 hover:border-white hover:text-white"
                onClick={()=>{submitSearch()}}>Search</button>
            </div>
            <div className="ml-6">
                <button className="bg-gray-200 border-2 border-black pb-1 pt-1 pr-5 pl-5 text-center rounded-md hover:bg-cyan-300 hover:border-white hover:text-white"
                onClick={()=>{clearSearch()}}>Clear</button>
            </div>
        </div>
    );
}

export default SearchQuery;