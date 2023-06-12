import React from 'react'
import "./style/Home.css"
import Main from './Main/Main';
import Header from '../Header/Header';

const navigation = [
	{
	  "id": 0,
	  "content": "Home",
	  "link" : "home"
	},
  
	{
	  "id": 1,
	  "content": "Characters",
	  "link" : "characters"
	},
  
	{
	  "id": 2,
	  "content": "Episodes",
	  "link" : "episodes"
	},
  
	{
	  "id": 3,
	  "content": "Location",
	  "link" : "location"
	},
	{
	  "id": 4,
	  "content": "My watch list",
	  "link" : "favoriteEpisodes"
	},
  ];
	  

function Home() {
  return (
	<div className='home'>
		<Header navigation={navigation} />
		<Main />
	</div>
  )
}

export default Home;