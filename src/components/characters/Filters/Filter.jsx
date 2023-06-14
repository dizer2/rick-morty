import React from 'react'
import "./style/Filter.css"

function Filter({species, status, gender, changeSpecies, changeStatus, changeGender}) {


  return (
	<div className='filter'>
		<select onChange={changeSpecies} className='filter__button'>
			{species.map(item => {
				return ( <option  key={item} value={item}>{item}</option> )
			})}
		</select>

		<select onChange={changeStatus} className='filter__button'>
			{status.map(item => {
				return ( <option  key={item} value={item}>{item}</option> )
			})}
		</select>

		<select onChange={changeGender} className='filter__button'>
			{gender.map(item => {
				return ( <option  key={item} value={item}>{item}</option> )
			})}
		</select>
	</div>
  )
}

export default Filter;