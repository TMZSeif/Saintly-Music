import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from './Pages/HomePage';
import MusicPage from './Pages/MusicPage';

function App() {
	return (
		<BrowserRouter basename="/Saintly-Music">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/:person" element={<MusicPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
