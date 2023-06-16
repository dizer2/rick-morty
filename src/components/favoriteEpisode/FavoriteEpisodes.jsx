import React, { useEffect, useState } from 'react'
import "./style/FavoriteEpisodes.css"
import Header from '../Header/Header';
import NameFilter from '../nameFilter/nameFilter';

function FavoriteEpisodes() {

  const [name, setName] = useState("");
  const [allName, setAllName] = useState([]);
  const [favoriteEpisode, setFavoriteEpisode] = useState(() => {
    const localStorageEpisodes = localStorage.getItem('EPISODES');
    return localStorageEpisodes ? JSON.parse(localStorageEpisodes) : [];
  });
  
  const fetchData = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/?name=${name}`);
      if (!response.ok) {
        throw new Error("Eror");
      }
      const data = await response.json();

      const allNameArr = [];

      data.results.forEach((item) => {
        allNameArr.push(item.name)
       });
       setAllName(allNameArr);
			 localStorage.setItem("EPISODES", JSON.stringify(favoriteEpisode));

    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  });

  const choseNameInput = async (event) => {
    setName(event.target.id);
    console.log(event.target.id);
    let id = event.target.id;
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/?name=${id}`);
        if (!response.ok) {
          throw new Error("Eror");
        }
        const data = await response.json();
        const newEpisode = data.results[0];

        if (!favoriteEpisode.some(episode => episode.id === newEpisode.id)) {
          setFavoriteEpisode(prevEpisodes => [...prevEpisodes, {
            id: newEpisode.id,
            episode: newEpisode.episode,
            name: newEpisode.name,
            air_date: newEpisode.air_date,
            like: false,
            className: 'favoriteEpisodes__main-cart',
          }]);
          
        }
   
        
      setName("");
      } catch (error) {
        console.error("Error:", error);
      }
    };
  const nameFilter = (event) => {
    setName(event.target.value);
  }

  // We give a like status, which means that we have already watched this episode
  const handleClickOpacity = (id) => {
    favoriteEpisode.forEach((item) => {
      if (id === item.id) {
        item.like = !item.like;
        item.className = item.like ? "favoriteEpisodes__main-cart love" : "favoriteEpisodes__main-cart";
      }
    });
  };

  // remove our episodes
  const handleRemove = (id) => {
    favoriteEpisode.forEach((item, index) => {
      if (id === item.id) {
        favoriteEpisode.splice(index, 1);
      }
    });
  };


  const sortedTodo = favoriteEpisode.sort((a, b) => a.like - b.like);
  console.log(sortedTodo)


  return (
	<div className='favoriteEpisodes'>
    <Header />
    <NameFilter 
      name={name}
      nameFilter={nameFilter}
      allName={allName}
      choseNameInput={choseNameInput}
    />

    <div className="favoriteEpisodes__main">
    {sortedTodo.map(item => {          
      return (
            <div id={item.id} key={item.id} className={item.className}>
            <div className="charapter__name-box">
              <p className="charapter__name">{item.episode}</p>
            </div>
            <div className="description__container">
              <div className="description__container-contant">
                <p className="description__teg">Name: <span className="desciption__span species">{item.name}</span></p>
                <p className="description__teg">Date: <span className="desciption__span status">{item.air_date}</span>
                </p>
              </div>
              <div className="description__container-settings">
                <div onClick={() => handleClickOpacity(item.id)} className="settings__box">
                  <svg className='settings__box-love' width={26} height={26} viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                  <path className='lvoe__hover' d="M10.5314 8C8.62455 8 7 9.434 7 11.2964C7 12.5812 7.59818 13.6629 8.39096 14.5589C9.18103 15.4519 10.2003 16.2014 11.1218 16.8287L12.7117 17.9111C12.8858 18.0296 13.1142 18.0296 13.2883 17.9111L14.8782 16.8287C15.7997 16.2014 16.819 15.4519 17.609 14.5589C18.4018 13.6629 19 12.5812 19 11.2964C19 9.434 17.3754 8 15.4686 8C14.4856 8 13.6207 8.46354 13 9.06333C12.3793 8.46354 11.5144 8 10.5314 8Z" fill="white" />
                  </svg>
                </div>
                <div className="settings__box">
                  <svg onClick={() => handleRemove(item.id)} className='settings__box-remove' width={26} height={26} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className='remove__hover' d="M10.871 5.58065C10.871 5.25996 11.1309 5 11.4516 5H14.5484C14.8691 5 15.129 5.25996 15.129 5.58065V6.16129H18.4194C18.74 6.16129 19 6.42125 19 6.74194C19 7.06262 18.74 7.32258 18.4194 7.32258H7.58065C7.25996 7.32258 7 7.06262 7 6.74194C7 6.42125 7.25996 6.16129 7.58065 6.16129H10.871V5.58065Z" fill="white" />
                  <path className='remove__hover'fillRule="evenodd" clipRule="evenodd" d="M8.54056 9.40886C8.56235 9.21283 8.72805 9.06452 8.92529 9.06452H17.0747C17.2719 9.06452 17.4376 9.21283 17.4594 9.40886L17.6144 10.8035C17.8937 13.3172 17.8937 15.8542 17.6144 18.368L17.5991 18.5053C17.4974 19.4209 16.7878 20.1509 15.8755 20.2786C13.9678 20.5457 12.0322 20.5457 10.1244 20.2786C9.21216 20.1509 8.50259 19.4209 8.40086 18.5053L8.38561 18.368C8.1063 15.8542 8.1063 13.3172 8.38561 10.8035L8.54056 9.40886ZM12.0323 12.0839C12.0323 11.7632 11.7723 11.5032 11.4516 11.5032C11.1309 11.5032 10.871 11.7632 10.871 12.0839L10.871 17.5032C10.871 17.8239 11.1309 18.0839 11.4516 18.0839C11.7723 18.0839 12.0323 17.8239 12.0323 17.5032L12.0323 12.0839ZM15.129 12.0839C15.129 11.7632 14.8691 11.5032 14.5484 11.5032C14.2277 11.5032 13.9677 11.7632 13.9677 12.0839V17.5032C13.9677 17.8239 14.2277 18.0839 14.5484 18.0839C14.8691 18.0839 15.129 17.8239 15.129 17.5032V12.0839Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
           </div>
          )
    })}
    </div>
  </div>
  
  )
}

export default FavoriteEpisodes;