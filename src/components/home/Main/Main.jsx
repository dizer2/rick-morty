import React from 'react'
import "./style/Main.css"
import AnimatedSVG from '../../../assets/Svg/RickPicture/AnimatedSVG';
import Sociable from '../../../assets/Svg/Sociable/Sociable';



function Main() {
  return (
	<div className="main">
		<div className="left__main">
			<p className="main__titel">
			Your favorite <br /> cartoon is here
			</p>
			<p className="main__desciption">
			Rick and Morty is the Emmy award-winning half-hour animated hit comedy
			series on Adult Swim that follows a sociopathic genius scientist.
			</p>
			<a href="/characters">
				<button className="main__button">get started</button>
			</a>
			<Sociable />
		</div>

		<div className="right__main">
			<AnimatedSVG />
		</div>
	</div>

  )
}

export default Main;