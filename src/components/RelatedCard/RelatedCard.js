import React, { useEffect, useState } from 'react'
import './RelatedCard.css'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
const base_url = "https://image.tmdb.org/t/p/original/";
function RelatedCard() {
    const params = useParams()
    const [related, setRelated] = useState([])
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTBmMGNkMzdjOGQ0Yzc5YTI0M2ZjNmY0YjIxZDRiZCIsInN1YiI6IjY0MTQ2ZDlhZWRlMWIwMjhjNTk5MDU5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LO9yHDEu14k3o0-owXeHZLi4qvdseR_HELmIHq4HYd4'
        }
    };


    const relatedFetch = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/recommendations`, options);
            setRelated(response.data.results.slice(0, 7));  
        } catch (error) {
            console.error('Error fetching related movies:', error);
        }
    };
    

    useEffect(() => {
        relatedFetch()
    }, [params.id])


   

    return (
        <>
            {related ? (
                related.map(movie => (
                    <Link key={movie.id} to={`/movie/${movie.id}`} style={{textDecoration:"none"}}>
                        <div  className='cards'>  
                            <div className='related-image'>
                                <img src={`${base_url}${movie.backdrop_path ? movie.backdrop_path : movie.poster_path}`} alt={movie.title} />
                            </div>
                            <div>
                                {movie.title}  
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Loading related movies...</p>  
            )}
        </>
    );
    
}

export default RelatedCard