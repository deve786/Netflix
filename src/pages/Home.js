import React from 'react'
import Card from '../components/Cards/Card'
import requests from '../RequestApis/request'

function Home() {
  return (
    <div>
        <Card change={true} title={'Trending'} fetchUrl={requests.fetchTrending}/>
        <Card title={'Originals'} fetchUrl={requests.fetchNetflixOriginals}/>
        <Card title={'Top Rated'} fetchUrl={requests.fetchTopRated}/>
        <Card title={'Action'} fetchUrl={requests.fetchActionMovies}/>
        <Card title={'Comedy'} fetchUrl={requests.fetchComedyMovies}/>
        <Card title={'Horror'} fetchUrl={requests.fetchHorrorMovies}/>
        <Card title={'Romance '} fetchUrl={requests.fetchRomanceMovies}/>
        <Card title={'Documentary'} fetchUrl={requests.fetchDocumentaries}/>
    </div>
  )
}

export default Home