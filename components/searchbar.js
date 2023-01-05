import React, { useState } from "react";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";
import Link from 'next/link';
import { Input } from "@nextui-org/react";

import { SearchIcon } from "./searchicon";


//filters results
function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
        console.log(value.displayName)
      return value.displayName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

//   const clearInput = () => {
//     setFilteredData([]);
//     setWordEntered("");
//   };


// search bar input and results
  return (
    <div >
      <div >
        <Input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          size="xl" 

          contentLeft={
            <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
          }
        />
       
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
                
              <a className="dataItem" href={value.link} target="_blank">
                <Link 
                    href={'/products/' + value["productId"]}>

                    <p >{value.displayName}</p>
                  </Link>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;