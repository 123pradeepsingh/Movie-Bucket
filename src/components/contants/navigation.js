import { MdHome } from "react-icons/md";
import { FiTv } from "react-icons/fi";
import { MdLocalMovies } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

export const navigation = [
    {
      label : 'Tv shows',
      href : 'tv',
      icon : <FiTv/>
    },
    {
      label : 'Movies',
      href : 'movie',
      icon : <MdLocalMovies/>
    }
  ]
  
  export const mobileNavigation = [
   {
       label:"Home",
       href:"/",
       icon:<MdHome/>
   },
    ...navigation,
    {
        label : "search",
        href : "/search",
        icon :<IoSearchOutline/>
    }
  ]