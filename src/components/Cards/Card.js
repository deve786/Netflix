import React, { useEffect, useState } from 'react'
import './Card.css'
import instance from '../../RequestApis/baseUrl'
function Card({fetchUrl,title,change}) {
const [movies, setMovies] = useState([])
const base_url = "https://image.tmdb.org/t/p/original/";
  const fetchMovies=async()=>{
    const out=await instance.get(fetchUrl)
    setMovies(out.data.results);
  }

  useEffect(() => {
    fetchMovies()
  }, [])
  console.log(movies);
  return (
    <div className='row'>
        
          <h1>{title}</h1>
            <div className='card'>
              {
                movies.length>0?
                (
                  movies.map(i=>(
                    <img className='card-img' src={`${base_url}${change?i.poster_path:i.backdrop_path}`} alt="" />
                  ))
                )
                :
                <h3>Loading.....</h3>
              }
            </div>
       
    </div>
  )
}

export default Card