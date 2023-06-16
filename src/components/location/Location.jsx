import React, { useCallback, useEffect, useState } from 'react'
import Header from '../Header/Header';
import "./style/Location.css"
import NameFilter from '../nameFilter/nameFilter';
import { Pagination } from '@mui/material';
import Filter from './Filters/Filter';


function Location() {

  const [allName, setAllName] = useState([]);
  const [location, setLocation] = useState([])
  const [type, setType] = useState([])
  const [dimension, setDimension] = useState([])

  const [name, setName] = useState("");
  const [thisType, setThisType] = useState('')
  const [thisDimension, setThisDimension] = useState('')
  const [pages, setPages] = useState();
  const [page, setPage] = useState(1);
  
  
  const fetchData = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/location/?name=${name}&page=${page}&type=${thisType}&dimension=${thisDimension}`);
      if (!response.ok) {
        throw new Error("Eror");
      }
      const data = await response.json();
      setLocation(data.results);
      setPages(data.info.pages);
      const allNameArr = [];
      
      data.results.forEach((item) => {
        allNameArr.push(item.name)
       });

       setAllName(allNameArr);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  })


  useEffect(() => {
    const fetchCharactersData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location`);
        const data = await response.json();
        console.log(data);
  
        const typeArr = data.results.map((item) => item.type);
        const dimensionArr = data.results.map((item) => item.dimension);
  
        setType([...new Set(typeArr)]);
        setDimension([...new Set(dimensionArr)]);
  
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchCharactersData();
  }, []);

  const changePage = useCallback((event, thisPage) => {
    setPage(thisPage);
  }, []);
  
  const nameFilter = useCallback((event) => {
    setPage(1);
    setThisType('');
    setThisDimension('');
    setName(event.target.value);
  }, []);
  
  const choseNameInput = useCallback((event) => {
    setPage(1);
    setName(event.target.id);
  }, []);
  
  const resetFilters = useCallback(() => {
    setThisType('');
    setThisDimension('');
  }, []);
  
  const changeType = useCallback((event) => {
    setThisType(event.target.value);
  }, []);
  
  const changeDimension = useCallback((event) => {
    setThisDimension(event.target.value);
  }, []);


  return (
	<div className='location'>
    <Header />
    <NameFilter 
      name={name}
      nameFilter={nameFilter}
      choseNameInput={choseNameInput}
      allName={allName}
    />
     <div className="location__filter">
        <Filter 
          type={type}
          dimension={dimension}
          changeType={changeType}
          changeDimension={changeDimension}
          resetFilters={resetFilters}
        />
      </div>
    <div className="location__main">
    {location.map(item => {
          return (
            <div key={item.id} className="characterCard">
            <div className="charapter__nameBox">
              <p className="charapter__name">{item.name}</p>
            </div>
            <div className="description__container">
              <p className="description__teg">Type: <span className="desciption__span species">{item.type}</span></p>
              <p className="description__teg">Dimension: <span className="desciption__span status">{item.dimension}</span>
              </p>
            </div>
           </div>
          )
    })}
    </div>
    <div className="pagination">
      <Pagination 
        count={pages}
        color="secondary" 
        onChange={changePage}
      />
      </div>
  </div>
  )
}

export default Location;