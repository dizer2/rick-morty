import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import "./style/Location.css"
import NameFilter from '../nameFilter/nameFilter';
import { Pagination } from '@mui/material';


function Location() {
  
  const [pages, setPages] = useState();
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [allName, setAllName] = useState([]);
  const [location, setLocation] = useState([])
  const [type, setType] = useState([])
  const [names, setNames] = useState([])

  
  const fetchData = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/location/?name=${name}&page=${page}`);
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
        const typeArr = [];
        for (let i = 0; i < 7; i++) {
          const response = await fetch(`https://rickandmortyapi.com/api/location?page=${i}`);
          const data = await response.json();
          console.log(data);

          data.results.forEach((item) => {
            if (!typeArr.includes(item.type)) {
              typeArr.push(item.type);
            }
          });
        }
        console.log(typeArr)
        setType(typeArr);

      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchCharactersData();
  }, []);


  const changePage = (event, thisPage) => {
    setPage(thisPage);
  }

  const nameFilter = (event) => {
    setPage(1);
    setName(event.target.value);
  }

  const choseNameInput = (event) => {
    setPage(1);
    setName(event.target.id);
  }


  return (
	<div className='location'>
    <Header />
    <NameFilter 
      name={name}
      nameFilter={nameFilter}
      choseNameInput={choseNameInput}
      allName={allName}
    />
     {/* <div className="location_filter">
        <Filter 
          species={species}
          status={status}
          gender={gender}
          changeSpecies={changeSpecies}
          changeStatus={changeStatus}
          changeGender={changeGender}
          restlFilters={restlFilters}
        />
      </div> */}
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