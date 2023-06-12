import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Characters from "./components/characters/Characters";
import Location from "./components/location/Location";
import Episodes from "./components/episodes/Episodes";
import FavoriteEpisodes from "./components/favoriteEpisode/FavoriteEpisodes";

function App() {
  return (
	<BrowserRouter>
		<Routes>
			<Route path="/*" element={<Home />} />
			<Route path="/characters" element={<Characters />} />
			<Route path="/episodes" element={<Episodes />} />
			<Route path="/location" element={<Location />} />
			<Route path="/favoriteEpisodes" element={<FavoriteEpisodes />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;

