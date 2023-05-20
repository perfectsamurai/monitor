import React from 'react';

const Search = ({searchValue, setSearchValue}) => {
    return (
        <div  className="search-block">
            <img height={30} width={30} src='img/magnifying-glass.png' alt='Поиск'/>
            <input 
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)} 
            placeholder='Поиск' 
            />
            {searchValue && (
            <img onClick={() => setSearchValue('')} className="closeIcon" src='../img/close.png' alt='Закрыть'/>
            )}
        </div>
    );
};
  
export default Search;