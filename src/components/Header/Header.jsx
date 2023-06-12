import React, { useState } from 'react'
import "../Header/style/Header.css"
import Logo from '../../assets/Svg/Logo/Logo';
import { Link } from 'react-router-dom';


function Header({navigation}) {

  const [burgerOpen, setBurgerOpen] = useState(true);

  
	const hadleMouseOpenBurger = () => {
		setBurgerOpen(!burgerOpen);
	}

  return (
	<div className='header'>
    <Logo />

    <div className="header__nav">
      {navigation.map(item => {
        return <Link key={item.id} to={item.link}><p id={item.link} className="header__nav-text">{item.content}</p></Link>
      })}
		</div>
    <div className="header__burger" onClick={() => hadleMouseOpenBurger()}>
      <span className={burgerOpen ? 'header__burger-defult header__burger-defult1' : 'header__burger-defult header__burger-active1'}></span>
      <span  className={burgerOpen ? 'header__burger-defult header__burger-defult2' : 'header__burger-defult header__burger-active2'}></span>
      <span className={burgerOpen ? 'header__burger-custom' : 'header__burger-custom header__burger-active3'}></span>
    </div>

    {/* header menu */}
    <div className={burgerOpen ? 'header__menu' : 'header__menu-active'}>
      {navigation.map(item => {
        return <Link key={item.id} to={item.link}><p id={item.link} className={burgerOpen ? 'header__nav-text' : 'header__nav-text header__nav-active'}>{item.content}</p></Link>
      })}
    </div>
  </div>
  )
}

export default Header;