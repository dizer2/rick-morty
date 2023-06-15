import React from 'react'
import "./style/NameFilter.css"

function NameFilter({name, nameFilter, allName, choseNameInput}) {
  return (
	<div className="episodes__filers">
    <input
      id="episodeInp"
      placeholder="Seach by the name"
      className="episodes__filers-input"
      type="text"
      value={name}
      onChange={nameFilter}
    />
    <div className="episodes__filers-name">
      {allName.map(item => {
          if (name.length >= 3) {
            return (
              <p key={item} onClick={choseNameInput} id={item}>{item}</p>
            )
          }
      })}
    </div>
    </div>
  )
}

export default NameFilter;