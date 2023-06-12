import React from 'react';
import { Link } from 'react-router-dom';


function Link({navigation}) {

  return (
	<div className="header__nav">
	 {navigation.map(item => {
        return <Link key={item.id} to={item.link} id={item.link} className="header__nav-text">{item.content}</Link>
     })}
	</div>
  )
}

export default Link;