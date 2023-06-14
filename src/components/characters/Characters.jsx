import React, { useEffect, useState } from 'react'
import "./style/Characters.css"
import Header from '../Header/Header';
import Filter from './Filters/Filter';
import Pagination from '@mui/material/Pagination';

function Characters() {
  

  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState();
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState();

  const [species, setSpecies] = useState([]);
  const [status, setStatus] = useState([]);
  const [gender, setGender] = useState([]);

  let [thisSpecies, setThisSpecies] = useState("");
  let [thisStatus, setThisStatus] = useState("");
  let [thisGender, setThisGender] = useState("");


  
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}&species=${thisSpecies}&status=${thisStatus}&gender=${thisGender}`) 
      .then(response => response.json())
      .then(data => {
        setAllPage(data.info.pages);
        setCharacters(data.results);
        setPages(data.info.pages);
    }).catch(err =>  window.location.reload(true))

  }, [characters]);

  useEffect(() => {
    let speciesArr = [];
    let statusArr = [];
    let genderArr = [];

    for(let i = 0; i < 42; i++){
    fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
      .then((response) => {
         return response.json()
      })
      .then((data) => {
        data.results.map((item) => {
          if(!speciesArr.includes(item.species)){
            speciesArr.push(item.species);
          }
          if(!statusArr.includes(item.status)){
            statusArr.push(item.status);
          }
          if(!genderArr.includes(item.gender)){
            genderArr.push(item.gender);
          }
          setSpecies(speciesArr);
          setStatus(statusArr);
          setGender(genderArr);
        })
    })

    }    
    }, [])


    const changeSpecies = (event) => {
      setThisSpecies(event.target.value);
    }
    const changeStatus = (event) => {
      setThisStatus(event.target.value);
    }
    const changeGender = (event) => {
      setThisGender(event.target.value);
    }

  const changePage = (event, thisPage) => {
    setPage(thisPage);
  }

  return (
    <div className="characters">
      <Header />
      <div className="characters__filter">
        <Filter 
          species={species}
          status={status}
          gender={gender}
          changeSpecies={changeSpecies}
          changeStatus={changeStatus}
          changeGender={changeGender}

        />
      </div>
      <div className="characters__main">
        {characters.map(item => {
          return (
            <div key={item.id} className="characters__main-cart">
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