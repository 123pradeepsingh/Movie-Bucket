import React, { useRef } from 'react'
import Card from './Card'
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

const HorizontalScrollCard = ({data = [],heading, trending, media_type}) => {
    const containerRef = useRef()
    const handleNext = ()=>{
        containerRef.current.scrollLeft += 300
  
      }
    const handlePrevious = ()=>{
        containerRef.current.scrollLeft -= 300
        
      }
  return (
    <div className='container mx-auto my-10'>
                <h2 className='text-lg lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>
                <div className='relative'>
                    <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden  overflow-x-scroll relative z-10 scroll-smooth transition-all scrolbar-none'>
                        {
                            data.map((data, index)=>{
                                return(
                                    <Card key={data.id+"heading"+index} data={data} index={index+1} trending={trending} media_type={media_type}/>
                                )
                            })
                        }
                    </div>
                    <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
                        <button onClick={handlePrevious} className=' bg-white p-1 rounded-full text-xl z-10 text-black -ml-2 '>
                            <FcPrevious/>
                        </button>
                        <button onClick={handleNext} className=' bg-white p-1 rounded-full text-xl z-10 text-blac -mr-2'>
                            <FcNext/>
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default HorizontalScrollCard
