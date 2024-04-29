
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home/>}></Route>
        <Route path={'/movie/:id'} element={<MoviePage/>}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
