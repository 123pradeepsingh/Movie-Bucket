import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'

const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setpageno] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)

  console.log("params",params.explore)

  const fetchData= async()=>{
    try {
        const response = await axios.get(`/discover/${params.explore}`,{
          params : {
            page : pageNo
          }
        })
        setData((preve)=>{
          return[
             ...preve,
             ...response.data.results
          ]
        })
        setTotalPageNo(response.data.total_pages)

    } catch (error) {
      console.log('error', error)
    }
  }

  const handleScroll=()=>{
    if((window.innerHeight + window.scrollY)>= document.body.offsetHeight){
      setpageno(preve => preve+1)
    }
  }

  useEffect(()=>{
    fetchData() 
  },[pageNo])

  useEffect(()=>{
    setpageno(1)
    setData([])
    fetchData() 
  },[params.explore])
  
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
  },[])

  return (
    <div className='py-16'>
          <div className='container mx-auto'>
                <h3 className='capitalize text-lg lg:text-xl font-semibold my-2'>Popular  {params.explore} Shows</h3>
                <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
                   {
                    data.map((exploreData, index)=>{
                      return(
                        <Card data={exploreData} key={exploreData.id+"exploreSEction"} media_type={params.explore}/>
                      )
                    })
                   }
                </div>
          </div>
    </div>
  )
}

export default ExplorePage