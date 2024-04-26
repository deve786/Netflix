import React, { useEffect, useState } from 'react'
import './ReviewCard.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const base_url = "https://image.tmdb.org/t/p/original/";
function ReviewCard() {

  const [review, setReview] = useState([])
  const params = useParams()
  

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTBmMGNkMzdjOGQ0Yzc5YTI0M2ZjNmY0YjIxZDRiZCIsInN1YiI6IjY0MTQ2ZDlhZWRlMWIwMjhjNTk5MDU5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LO9yHDEu14k3o0-owXeHZLi4qvdseR_HELmIHq4HYd4'
    }
  };




  const reviewFetch = async () => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/reviews`, options)

    setReview(data.data.results)
    console.log(data.data.results);

  }

  function daysAgo(dateString) {
    const now = new Date();
    const pastDate = new Date(dateString);

    const timeDifference = now - pastDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return Math.floor(daysDifference);
  }

  const daysSince = daysAgo(review.updated_at);
  console.log(`Days since 2024-03-13T13:23:41.909Z: ${daysSince}`);

  useEffect(() => {

    reviewFetch()
  }, [params.id])

  // console.log(review);
  // console.log(review.updated_at);
  return (
    <div className='reviewCardMain'>
      {
        review.length > 0 ?
          review.slice(0,4).map((item, index) => (
            <div key={index} className='reviewCard'>
              <div className='reviewCard_details'>
                <div className='user_details'>
                  <img className='avatar_review' src={item.author_details.avatar_path ? `${base_url}${item.author_details.avatar_path}` : 'https://in.bmscdn.com/in/synopsis-new/noimguser.jpg'}
                  />
                  <p>{item.author_details.username}</p>
                </div>
                <div className='reviewCard_rating'>
                  <p>⭐ <span>{item.author_details.rating?item.author_details.rating:'*'}</span><span>/10</span></p>
                </div>
              </div>
              <div className='reviewCard_review'>
                {item.content.slice(0, 250)}...
              </div>
              <div className='reviewCard_bottom'>
                <p><span className='reviewDayAgo'>{daysAgo(item.updated_at)}</span> days ago</p>
              </div>
            </div>
          ))
          :
          <></>
      }
    </div>
  )
}

export default ReviewCard