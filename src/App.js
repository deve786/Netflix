
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import MoviePage from './pages/MoviePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home/>}></Route>
        <Route path={'/movie/:id'} element={<MoviePage/>}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
