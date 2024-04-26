import React, { useEffect, useState } from 'react'
import './MoreDetails.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const base_url = "https://image.tmdb.org/t/p/original/";
function MoreDetails() {
    const [more, setMore] = useState(null)
    const [watch, setWatch] = useState(null)
    const params = useParams()
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTBmMGNkMzdjOGQ0Yzc5YTI0M2ZjNmY0YjIxZDRiZCIsInN1YiI6IjY0MTQ2ZDlhZWRlMWIwMjhjNTk5MDU5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LO9yHDEu14k3o0-owXeHZLi4qvdseR_HELmIHq4HYd4'
        }
    };

    const moreFetch = async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, options)

        setMore(data.data)
        

    }
    const watchProFetch = async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/watch/providers`, options)
        setWatch(data.data.results.CA.buy)
        console.log(data.data);


    }
    const watchList=watch?watch.slice(0,1):''
    // console.log(watchList[0].provider_name);

    const avatar = more && more.production_companies ? 
        more.production_companies.map(company => company.logo_path).join(', ') : '';
        const list1=avatar.split(",").slice(0,1);
        // console.log(list1);
    const productionList = more && more.production_companies ? 
        more.production_companies.map(company => company.name).join(', ') : '';
        const list=productionList.split(",").slice(0,1);

        
    useEffect(() => {
        moreFetch()
        watchProFetch()
    }, [params.id])
    // console.log(more?more:'');  
    return (
        <div>
            {
               more && watch.length>0 ?
                    <div className='more_details'>
                        <div className='main_details'>
                            <p className=''>Watch Providers:</p>
                            <p className='imgs'><img src={`${base_url}${watchList[0].logo_path}`} /> {watchList[0].provider_name}</p>
                        </div>
                        <div className='main_details'>
                            <p className=''>Production:</p>
                            <p className='imgs'><img src={`${base_url}${list1}`}/> {list || 'No production companies listed'}</p>
                        </div>
                        <div className='main_details'>
                            <p className=''>Release Date:</p>
                            <p className='imgs'>{more.release_date} </p>
                        </div>
                        <div className='main_details'>
                            <p className=''>Status</p>
                            <p className='imgs'> {more.status}</p>
                        </div>
                        <div className='main_details'>
                            <p className=''>Collection</p>
                            <p className='imgs'> $ {more.revenue?more.revenue:'Not Found'}</p>
                        </div>
                    </div>
                :<>asd</>
            }
        </div>
    )
}

export default MoreDetails