import React from 'react'
import Logo from '../../../assets/Svg/Logo/Logo';
import "../Header/Header.css"

const navigation = ["Characters", "Episodes", "Location", "My watch list"];
    

function Header() {
  return (
	<div className='header'>
    <Logo />

    <div className="nav">
          {navigation.map(todo => <p key={todo} className="nav__text">{todo}</p>)
          }
		</div>
  </div>
  )
}

export default Header;