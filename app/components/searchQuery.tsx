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
            <div className="flex flex-row relative">
                <input type="search" name="search" id="search" value={value} placeholder={innerTexting} className="bg-white h-10 px-5 pr-10 rounded-xl text-sm focus:outline-none" onKeyDown={emptyingInput} onInput={setThenSearch}/>
                <span className="absolute right-3 top-1" style={{ fontSize: '20px', color: 'gray' }}>
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