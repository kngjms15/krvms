import { useState } from "react";
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

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
    const [priorValue, setPriorValue] = useState("");

    const setThenSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleSearchValue(value.trimEnd());
        setIsEmpty(value.trim().length === 0);
        if (value.trim().length === 0) {
            clearSearch();
            setPriorValue("");
        } else {
            submitSearch();
            setPriorValue(value.trimEnd());
        }
    };

    const handleInput = () => {
        const searchInputElement = document.getElementById('search') as HTMLInputElement | null;
        const newValue = searchInputElement ? searchInputElement.value.toString() : '';
        if (newValue.trim().length === 0 || newValue.trim()!==priorValue) {
            setIsEmpty(true);
            setPriorValue(newValue);
        } else {
            setIsEmpty(false)
            submitSearch();
        }
    }

    return (
        <div className="text-gray-600 flex items-center mt-3 mb-3">
            Search:&nbsp;
            <div className="flex flex-row relative">
                <input type="search" name="search" id="search" value={value} placeholder={innerTexting} className="bg-white h-10 px-5 pr-10 rounded-xl text-sm focus:outline-none" onChange={setThenSearch} onInput={handleInput}/>
                <span className="ml-1 mt-1" style={{ fontSize: '20px', color: 'gray' }}>
                    <button onClick={()=>{togglefilter()}}>
                        <MenuOutlined/>
                    </button>
                    <button className='ml-2' onClick={()=>{clearSearch()}}>
                        <CloseOutlined style={{color:'red', fontWeight:'bolder'}}/>
                    </button>
                </span>
            </div>
        </div>
    );
}

export default SearchQuery;