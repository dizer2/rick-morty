import React, { useState } from 'react'
import "./Popup.css"

function Popup({ popupObj, isOpen, setIsOpen }) {
	const popup = isOpen ? 'popup' : 'popup-none';

	const popupClose = () => {
		setIsOpen(false);
	}

	return (
	  <div onClick={popupClose} className={popup}>
		<div className="popup__cart">
		<div key={popupObj.id} className="characters__main-cart">
            <div className="cart__frame">
              <img className='cart__frame-img' src={popupObj.image} alt="rick-and-morty" />
            </div>
            <p className='cart__title'>{popupObj.name}</p>
            <div className="cart__box">
			{popupObj.location && (
			 <p className='cart__box-text'>Location: <span>{popupObj.location.name}</span></p>
			)}
              <p className='cart__box-text'>Species: <span>{popupObj.species}</span></p>
              <p className='cart__box-text'>Status:: <span>{popupObj.status}</span></p>
              <p className='cart__box-text'>Gender: <span>{popupObj.gender}</span></p>
			  {popupObj.episode && popupObj.episode.length > 0 && (
				<p className='cart__box-text'>Episodes: <span><a target="_blank" href={popupObj.episode[0]}>url</a></span></p>
			)}
            </div>
          </div>
		</div>
	  </div>
	);
  }
export default Popup;