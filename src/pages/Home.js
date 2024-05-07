import React from 'react'
import Card from '../components/Cards/Card'
import requests from '../RequestApis/request'
import Banner from '../components/Banner/Banner'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function Home() {
  return (
    <div>
      
      <Banner fetchUrl={requests.fetchTrending}/>
        <Card text={console.log()} change={true} title={'Trending'} fetchUrl={requests.fetchTrending}/>
        <Card title={'Originals'} fetchUrl={requests.fetchNetflixOriginals}/>
        <Card  title={'Top Rated'} fetchUrl={requests.fetchTopRated}/>
        <Card title={'Action'} fetchUrl={requests.fetchActionMovies}/>
        <Card title={'Comedy'} fetchUrl={requests.fetchComedyMovies}/>
        <Card title={'Horror'} fetchUrl={requests.fetchHorrorMovies}/>
        <Card title={'Romance '} fetchUrl={requests.fetchRomanceMovies}/>
        <Card title={'Documentary'} fetchUrl={requests.fetchDocumentaries}/>
        <Footer></Footer>
    </div>
  )
}

export default Home