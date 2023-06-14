import React from 'react'
import "./style/Home.css"
import Main from './Main/Main';
import Header from '../Header/Header';

	  

function Home() {
  return (
	<div className='home'>
		<Header />
		<Main />
	</div>
  )
}

export default Home;