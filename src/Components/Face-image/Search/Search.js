import React, { useState } from "react";
import './Search.css';

const Search = ({onSearchChange,onButtonSubmit,searchValue}) => {
    const [isFocused,setIsFocused] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && isFocused) {
          onButtonSubmit();
        }
      };
    return(
                <div className="search"> 
                    <div className="row"> 
                        <div className="col-12"> 
                            <div> 
                                <div className="search-2"> 
                                    <i className='bx bx-search-alt'></i> 
                                    <input onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onKeyDown={handleKeyDown} type="text" onChange={onSearchChange} value={searchValue} placeholder="Search image"/> 
                                    <button onClick={onButtonSubmit}>Search</button>
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                </div>
            // {/* <input classname="form-control col-9" onChange={onSearchChange} type="search" placeholder="Url image" aria-label="Search"/> */}
            // {/* <button classname="btn d-inline-block btn-outline-success ml-2" onClick={onButtonSubmit} type="submit">Search</button> */}

    );
    
}
export default Search;