import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Trailer() {
    const [trailer, setTrailer] = useState(null)
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
            if (response.data.results.length > 0) {
                setTrailer(response.data.results[0]); 
            } else {
                setTrailer(null); 
            }
        } catch (error) {
            console.error('Error fetching related movies:', error);
            setTrailer(null);
        }
    };

    useEffect(() => {
      trailerFetch()
    }, [params.id])
    console.log(trailer);
    
    const link1 = trailer ? `https://www.youtube.com/embed/${trailer.key}` : 'No trailer available';
    console.log(link1);
  return (
    <div>
        {
            trailer?
            <iframe width="100%"  style={{height:'55vh'}} src={link1} title="Deadpool &amp; Wolverine | Official Trailer | Experience It In IMAX®" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>:
            <></>
        }
            
    </div>
  )
}

export default Trailer