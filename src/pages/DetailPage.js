import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../Hooks/useFetch'
import useFetchDetails from '../Hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import VideoPlay from '../components/VideoPlay'

const DetailPage = () => {
  const params = useParams()
  const imageURl =useSelector(state => state.movieData.imageURl)
  const {data} = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const {data :castData} = useFetchDetails(`/${params?.explore}/${params.id}/credits`)
  const {data : similarData} = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const {data : recommendationData} = useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const [playVideo, setplayVideo] = useState(false)
  const [playVideoid ,setplayVideoId] = useState("")


  console.log("data",data)
  console.log("start cast",castData)

  const handlePlayVideo = (data)=>{
    setplayVideoId(data)
    setplayVideo(true)
  }

  const duration = (data?.runtime/60).toFixed(1)?.split(".")
  const writer = castData?.crew?.filter(el => el?.job ==="writer")?.map(el=> el?.name)?.join(", ")
  

  
  return (
    <div>
         <div className='w-full h-[280px] relative hidden lg:block'>
             <div className='w-full h-full'>
                 <img
                     src={imageURl+data?.backdrop_path}
                     className='h-full w-full object-cover'
                 />
             </div>
             <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>

         </div>

         <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
              <div className=' relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
                  <img
                       src={imageURl+data?.poster_path}
                       className='h-80 w-60 object-cover rounded'
                  />
                  <button onClick={()=>handlePlayVideo(data)} className='mt-5 w-full py-2 px-4 text-center bg-white text-black rounded font-bold  text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>Play Now</button>
              </div>
              <div>
                  <h2 className='text-2xl lg:text-4xl font-bold text-white'>{data?.title || data.name}</h2>
                  <p className='text-neutral-400'>{data?.tagline}</p>
                    <Divider/>
                  <div className='flex items-center  gap-3'>
                      <p>
                          Rating : {Number(data?.vote_average).toFixed(1)}+
                      </p>
                      <span>|</span>
                      <p>
                          Views : {Number(data?.vote_count)}
                      </p>
                      <span>|</span>
                      <p>
                          Duration : {duration[0]}h {duration[1]}m
                      </p>
                      <span>|</span>
                      <p>
                          Duration : {duration[0]}h {duration[1]}m
                      </p>
                  </div>

                  <Divider/>

                  <div>
                      <h3 className='text-2xl font-bold text-white mb-1'>Overview</h3>
                      <p>{data?.overview}</p>

                      <Divider/>

                      <div className='flex items-center gap-3 my-3 text-center'>
                           <p>
                              Staus : {data?.status}
                           </p>
                           <span>|</span>
                           <p>
                              Release Date : {moment(data?.release_date).format("MMMM Do YYYY")}
                           </p>
                           <span>|</span>
                           <p>
                              Revenue : {Number(data.revenue)}
                           </p>
                      </div>
                      <Divider/>
                  </div>
                  <div>
                       <p><span className='text-white'>Director</span> : {castData?.crew?.find(crewMember => crewMember.job === "Director")?.name}</p>
                       <Divider/>
                       <p><span>Writer : {writer}</span></p>


                  </div>
                      <Divider/>
                      <h2 className='font-bold text-lg'>Cast :</h2>
                      <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
                           {
                            castData?.cast?.filter(el => el?.profile_path).map((starCast,index)=>{
                              return(
                                <div>
                                     <div>
                                          <img
                                              src={imageURl+starCast?.profile_path}
                                              className='w-24 h-24 object-cover rounded-full'
                                          />
                                     </div>
                                     <p className='font-bold text-center text-sm'>{starCast?.name}</p>
                                </div>
                              )
                            })
                           }
                      </div>

              </div>
         </div>
         <div>
              <HorizontalScrollCard data={similarData} heading={"similar" + params?.explore} media_type={params?.explore}/>
              <HorizontalScrollCard data={recommendationData} heading={"Recommendation" + params?.explore} media_type={params?.explore}/>
         </div> 
         {
            playVideo &&(
                <VideoPlay data={playVideoid} close = {()=> setplayVideo(false)} media_type={params?.explore}/>
            )
         }
         
    </div>
  )
}

export default DetailPage
