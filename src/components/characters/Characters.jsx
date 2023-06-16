import React, { useCallback, useEffect, useState } from 'react'
import "./style/Characters.css"
import Header from '../Header/Header';
import Filter from './Filters/Filter';
import Pagination from '@mui/material/Pagination';
import Popup from '../UI/Popup';

function Characters() {
  

  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState();
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState();
  const [isOpen, setIsOpen] = useState(false);


  const [species, setSpecies] = useState([]);
  const [status, setStatus] = useState([]);
  const [gender, setGender] = useState([]);
	const [popupObj, setPopupObj] = useState([]);

  let [thisSpecies, setThisSpecies] = useState("");
  let [thisStatus, setThisStatus] = useState("");
  let [thisGender, setThisGender] = useState("");


  useEffect(() => {
    const fetchCharactersData = async () => {
      try {
        const requests = [];
        const speciesArr = [];
        const statusArr = [];
        const genderArr = [];
  
        for (let i = 0; i < 42; i++) {
          requests.push(fetch(`https://rickandmortyapi.com/api/character?page=${i}`));
        }
        
        const responses = await Promise.all(requests);
  
        for (const response of responses) {
          const data = await response.json();
          
          data.results.forEach((item) => {
            if (!speciesArr.includes(item.species)) {
              speciesArr.push(item.species);
            }
            if (!statusArr.includes(item.status)) {
              statusArr.push(item.status);
            }
            if (!genderArr.includes(item.gender)) {
              genderArr.push(item.gender);
            }
          });
        }
  
        setSpecies(speciesArr);
        setStatus(statusArr);
        setGender(genderArr);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchCharactersData();
  }, []);



  const fetchData = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&species=${thisSpecies}&status=${thisStatus}&gender=${thisGender}`);
      if (!response.ok) {
        throw new Error("Eror");
      }
      const data = await response.json();
      setAllPage(data.info.pages);
      setCharacters(data.results);
      setPages(data.info.pages);
    } catch (error) {
      console.error("Error:", error);
      window.location.reload(true);
    }
  };

  useEffect(() => {
    fetchData();
  })


  const changeSpecies = useCallback(event => {
    setThisSpecies(event.target.value);
  }, []);
  
  const changeStatus = useCallback(event => {
    setThisStatus(event.target.value);
  }, []);
  
  const changeGender = useCallback(event => {
    setThisGender(event.target.value);
  }, []);

  const changePage = (event, thisPage) => {
    setPage(thisPage);
  }

  const restlFilters = () => {
    setThisSpecies('');
    setThisStatus('');
    setThisGender('');
  }

  const popupInfo = (obj) => {
    setPopupObj(obj);
    setIsOpen(true);
  }



  return (
    <div className="characters">
      <Popup 
        popupObj={popupObj}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Header />
      <div className="characters__filter">
        <Filter 
          species={species}
          status={status}
          gender={gender}
          changeSpecies={changeSpecies}
          changeStatus={changeStatus}
          changeGender={changeGender}
          restlFilters={restlFilters}
        />
      </div>
      <div className="characters__main">
        {characters.map(item => {
          return (
            <div onClick={() => popupInfo(item)} key={item.id} className="characters__main-cart">
            <div className="cart__frame">
              <img className='cart__frame-img' src={item.image} alt="rick-and-morty" />
            </div>
            <p className='cart__title'>{item.name}</p>
            <div className="cart__box">
              <p className='cart__box-text'>Location: <span>{item.location.name}</span></p>
              <p className='cart__box-text'>Species: <span>{item.species}</span></p>
              <p className='cart__box-text'>Status:: <span>{item.status}</span></p>
              <p className='cart__box-text'>Gender: <span>{item.gender}</span></p>
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

export default Characters;