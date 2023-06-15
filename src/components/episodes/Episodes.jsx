import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import { Pagination } from '@mui/material';
import "./style/Episodes.css"
import Filter from '../nameFilter/nameFilter';

function Episodes() {

  const [pages, setPages] = useState();
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [allName, setAllName] = useState([]);
  const [episodes, setEpisodes] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/?name=${name}&page=${page}`);
      if (!response.ok) {
        throw new Error("Eror");
      }
      const data = await response.json();
      setEpisodes(data.results);
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


  const changePage = (event, thisPage) => {
    setPage(thisPage);
  }

  const nameFilter = (event) => {
    setName(event.target.value);
    
  }
  const choseNameInput = (event) => {
    setName(event.target.id);
  }


  return (
	<div className='episodes'>
    <Header />
    <Filter 
      name={name}
      nameFilter={nameFilter}
      choseNameInput={choseNameInput}
      allName={allName}
    />
    <div className="episodes__main">
    {episodes.map(item => {
          return (
            <div key={item.id} className="characterCard">
            <div className="charapter__nameBox">
              <p className="charapter__name">{item.episode}</p>
            </div>
            <div className="description__container">
              <p className="description__teg">Name: <span className="desciption__span species">{item.name}</span></p>
              <p className="description__teg">Date: <span className="desciption__span status">{item.air_date}</span>
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

export default Episodes;