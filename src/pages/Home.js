import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import axios from 'axios'
import useFetch from '../Hooks/useFetch'
const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData)
  const {data : nowPlayingData} = useFetch('/movie/now_playing')
  const {data : topRatedData} = useFetch('/movie/top_rated')
  const {data : populatTvShowData} = useFetch('/tv/top_rated')
  const {data : onTheAirData} = useFetch('/tv/popular')
  

  return (
    <div>
      <BannerHome/>
      <HorizontalScrollCard data ={trendingData} heading={"trending"} trending={true}/>
      <HorizontalScrollCard data ={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
      <HorizontalScrollCard data ={topRatedData} heading={"Top Rated Movies"}  media_type={"movie"}/>
      <HorizontalScrollCard data ={populatTvShowData} heading={"Popular Shows"}  media_type={"tv"}/>
      <HorizontalScrollCard data ={onTheAirData} heading={"Ongoing Shows"}  media_type={"tv"}/>
      
      
    </div>
  )
}

export default Home
