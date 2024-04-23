import React, { useEffect, useState } from 'react'
import './Banner.css'
import instance from '../../RequestApis/baseUrl'
const base_url = "https://image.tmdb.org/t/p/original/";
function Banner({fetchUrl}) {

  const [trend, setTrend] = useState([])
  const fetchTrend=async()=>{
    const data= await instance.get(fetchUrl)
    setTrend(data.data.results[Math.floor(Math.random()*data.data.results.length)]);
  }
useEffect(() => {
  fetchTrend()
}, [])

  return (
    <div className='banner' style={{backgroundImage:`url(${base_url}${trend.backdrop_path})`}}>
        <div className='content'>
            <h1>{trend.title?trend.title:trend.name}</h1>
            <p>{trend.overview}</p>
        </div>
    </div>
  )
}

export default Banner