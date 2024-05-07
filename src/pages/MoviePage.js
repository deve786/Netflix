
import React, { useEffect, useState } from 'react'
import '../components/MovieBanner/MovieBanner.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import RelatedCard from '../components/RelatedCard/RelatedCard';
import '../components/RelatedCard/RelatedCard.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Trailer from '../components/Trailer/Trailer';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import Navbar from '../components/Navbar/Navbar'
import MoreDetails from '../components/MoreDetails/MoreDetails'
const base_url = "https://image.tmdb.org/t/p/original/";

function MoviePage() {
  const [singleMovie, setSingleMovie] = useState([])
  const [cast, setCast] = useState([])
  const params = useParams()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTBmMGNkMzdjOGQ0Yzc5YTI0M2ZjNmY0YjIxZDRiZCIsInN1YiI6IjY0MTQ2ZDlhZWRlMWIwMjhjNTk5MDU5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LO9yHDEu14k3o0-owXeHZLi4qvdseR_HELmIHq4HYd4'
    }
  };

  const ids = params.id


  const movieFetch = async () => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${ids}?language=en-US`, options).catch(error => {
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response error:", error.response.data);
          console.error("Status:", error.response.status);
          console.error("Headers:", error.response.headers);
      } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
      }
      console.error("Config:", error.config);
  });

    setSingleMovie(data?data.data:"")



  }
  console.log(singleMovie);
  const castFetch = async () => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${ids}/credits?language=en-US`, options).catch(error => {
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response error:", error.response.data);
          console.error("Status:", error.response.status);
          console.error("Headers:", error.response.headers);
      } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
      }
      console.error("Config:", error.config);
  });
   

    setCast(data?data.data.cast:'')
  }

  const genres = singleMovie.genres && singleMovie.genres.length > 0 ? singleMovie.genres[0].name : 'N/A';

console.log(singleMovie);

  const year = singleMovie.release_date
    ? singleMovie.release_date.slice(0, 4) : 'N/A'

  const castName = cast.length > 0 ? cast[0].name : 'N/A';



  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  }

  const time = toHoursAndMinutes(singleMovie.runtime)
  function getWriters(cast) {
    const writers = [];
    for (let i in cast) {
      if (cast[i].known_for_department === "Writing") {
        writers.push(cast[i].name);
      }
      else {

      }
    }
    return writers;
  }
  const writers = getWriters(cast);
  const imageUrl = singleMovie.backdrop_path ? 
  `${base_url}${singleMovie.backdrop_path}` : 
  `${base_url}${singleMovie.poster_path}`;


  useEffect(() => {
    movieFetch()
    castFetch()
  }, [params.id])
console.log(imageUrl);
  return (





    <>
      <Navbar />
      { singleMovie?<>
        <div className='movie-banner'>
  
          <div className='banner-left'>
            <img src={imageUrl} alt="" />
          </div>
  
          <div className='banner-right'>
            <div>
              <div className='title'>
                <h2>{singleMovie.original_title}</h2>
                <p>{singleMovie.vote_average} ⭐</p>
              </div>
              <div className='sub'><p className='sub-title'><span>{year}</span>|<span>{time.hours}h {time.minutes}min</span>|<span>{singleMovie.adult == 'true' ? '18+' : '16+'}</span></p>
                <></>
              </div>
            </div>
            <div>
              <Tabs className={'tabs'}>
                <TabList className={'tabList'}>
                  <Tab className={'tab'}>Overview</Tab>
                  <Tab className={'tab'} >Trailer & More</Tab>
                  <Tab className={'tab'}>More About</Tab>
                  <Tab className={'tab'}>Review</Tab>
                </TabList>
  
                <TabPanel>
                  <div className='overviewpanel'>
                    <p>{singleMovie.overview}</p>
                    <p className='panel-movie-detail'>
                      <div className='panel-detail'><span>Starring</span> <span className='name'> {castName}</span></div>
                      <div className='panel-detail'><span>Created By</span> <span className='name'>{writers[0] ? writers[0] : 'Not Found'}</span></div>
                      <div className='panel-detail'><span>Genre</span> <span className='name'>{genres}</span></div>
                    </p>
  
                  </div>
                </TabPanel>
                <TabPanel>
                  <Trailer />
                </TabPanel>
                <TabPanel>
                  <MoreDetails />
                </TabPanel>
                <TabPanel>
                  {/* <div className='reviewCardMain'> */}
                  <ReviewCard />
                  {/* </div> */}
                </TabPanel>
              </Tabs>
            </div>
          </div>
  
        </div>
  
  
        <div className='related'>
          <h3>Realted Movies</h3>
          <div className='rows'>
            <RelatedCard />
  
  
          </div>
        </div>
      </>:<div className='no-movie'><h1>No details about this Movie</h1></div>}



    </>


  )
}

export default MoviePage