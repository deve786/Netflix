import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Trailer() {
    const [trailer, setTrailer] = useState([])
    const params = useParams()
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTBmMGNkMzdjOGQ0Yzc5YTI0M2ZjNmY0YjIxZDRiZCIsInN1YiI6IjY0MTQ2ZDlhZWRlMWIwMjhjNTk5MDU5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LO9yHDEu14k3o0-owXeHZLi4qvdseR_HELmIHq4HYd4'
        }
    };


    const trailerFetch = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos`, options);
            setTrailer(response.data.results);  
        } catch (error) {
            console.error('Error fetching related movies:', error);
        }
    };

    useEffect(() => {
      trailerFetch()
    }, [params.id])
    console.log(trailer[0].key);
    
    const link1 = trailer ? `https://www.youtube.com/embed/${trailer[0].key}` : 'No trailer available';
    console.log(link1);
  return (
    <div>
        {
            trailer?
            <iframe width="100%" height="514" src={link1} title="Deadpool &amp; Wolverine | Official Trailer | Experience It In IMAX®" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>:
            <></>
        }
            
    </div>
  )
}

export default Trailer