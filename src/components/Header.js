import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import usericon from '../assets/user.png'
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from './contants/navigation';




const Header = () => {
    const location = useLocation()
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
    const [searchinput, setsearchinput] = useState(removeSpace)
    const navigate = useNavigate()


    console.log("location")

    
    useEffect(()=>{
          if(searchinput){
            navigate(`/search?q=${searchinput}`)
          }
           
    },[searchinput])
    const handlesubmit = (e)=>{
      e.preventDefault()
    }
  return (
    <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
      <div className='container mx-auto px-4 flex items-center h-full'>
           <Link to="/">
                <img
                    src ={logo}
                    alt='logo'
                    width={120}
                />
           </Link>
           <nav className='hidden lg:flex items-center gap-2 ml-4'>
              {
                 navigation.map((nav,index)=>{
                  return(
                      <div>
                           <NavLink key={nav.label} to={nav.href} className={(isActive)=>`px-2 hover:text-neutral-200 ${isActive && "text-neutral-100"}`}>
                               {nav.label}
                           </NavLink>
                      </div>
                  )
                 })
              }
           </nav>
           <div className='ml-auto flex items-center gap-4'>
                <form className='flex items-center gap-2'onSubmit={handlesubmit}>
                      <input
                        type='text'
                        placeholder='search here...'
                        className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                        onChange={(e)=>setsearchinput(e.target.value)}
                        value={searchinput}
                      />
                      <button className='text-2xl text-white'>
                        <IoSearchOutline/>
                      </button>
                </form>

                <div className='h-8 w-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                     <img
                        src={usericon}
                        width='w-ful h-full'
                     />
                </div>
           </div>
      

      </div>
      
    </header>
  );
};

export default Header;
