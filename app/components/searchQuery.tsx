import { useState } from "react";
 
interface iSearchQuery{
    innerTexting: string;
    submitSearch: () => void;
    clearSearch: () => void
    handleSearchValue: (value:any) => void;
    togglefilter: () => void;
    value: string;
}
 
 
const SearchQuery:React.FC<iSearchQuery> = ({innerTexting,submitSearch,clearSearch,handleSearchValue,togglefilter,value}) => {
    const [isEmpty, setIsEmpty] = useState(false);
 
    const setThenSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
        handleSearchValue(event);
        if(isEmpty){
            clearSearch();
            setIsEmpty(false);
        }else{
            submitSearch();
        }
    }
 
    const emptyingInput = (input:React.KeyboardEvent<HTMLInputElement>) => {
        if(input.key === 'Delete' || input.key === 'Backspace'){
            const searchInputElement = document.getElementById('search') as HTMLInputElement | null;
            const considerValue = searchInputElement ? searchInputElement.value.toString() : '';
            if(value.length-1===0 || /^\s+$/.test(considerValue)){
                setIsEmpty(true);
            }else{
                setIsEmpty(false);
            }
        }
    }
 
    return (
        <div className="text-gray-600 flex items-center mt-3 mb-3">
            Search:&nbsp;
            <input type="search" name="search" id="search" value={value} placeholder={innerTexting} className="bg-white h-10 px-5 pr-10 rounded-xl text-sm focus:outline-none" onKeyDown={emptyingInput} onInput={setThenSearch}/>
            <div className="ml-2">
                <button className="rounded-lg p-1 pr-4 pl-4 font-bold bg-gray-400 text-white hover:bg-cyan-400" onClick={()=>{togglefilter()}}>+</button>
            </div>
            <div className="ml-6">
                <button className="bg-gray-200 border-2 border-black pb-1 pt-1 pr-5 pl-5 text-center rounded-md hover:bg-cyan-300 hover:border-white hover:text-white"
                onClick={()=>{clearSearch()}}>Clear</button>
            </div>
        </div>
    );
}
 
export default SearchQuery;