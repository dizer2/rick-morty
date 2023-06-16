import React from 'react'
import "./style/Filter.css"

function Filter({ type, dimension, changeType, changeDimension, resetFilters }) {
	return (
	  <div className='filter'>
		<select onChange={changeType} className='filter__button'>
		  {type.map(item => (
			<option key={item} value={item}>{item}</option>
		  ))}
		</select>
  
		<select onChange={changeDimension} className='filter__button'>
		  {dimension.map(item => (
			<option key={item} value={item}>{item}</option>
		  ))}
		</select>
  
		<button onClick={resetFilters} className='filter__button'>Reset filters</button>
	  </div>
	);
  }

export default Filter;