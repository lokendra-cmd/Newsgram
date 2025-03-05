import React from 'react'
import { useSetAtom } from "jotai";
import { useAtom } from "jotai";
import { categoryAtom } from "@/app/StateManagement/Category"; 
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'], // Choose weights as needed
  variable: '--font-montserrat', // Optional CSS variable
});


const Header = () => {
  const setCategory = useSetAtom(categoryAtom); // Function to update category
  const [category] = useAtom(categoryAtom); // Read category from atom
  return (
    <div style={{backgroundColor: '#1A1A1A', color:'#E0E0E0'}}
    className='fixed top-0 w-[100vw] h-[10vh] flex justify-start items-center gap-[10vw] pl-[1vw] pr-[1vw] z-100'>
        <div className={`logo ${montserrat.className}`} style={{color:'#B71C1C',fontSize:'2.5rem'}}>
            NEWSGRAM
        </div>
        <div className="navMenu">
            <ul className='navMenuItems list-none flex gap-[4vw]' style={{cursor:'pointer'}}>
                <li onClick={()=>{setCategory('general')}}>General</li>
                <li onClick={()=>{setCategory('science')}}>Science</li>
                <li onClick={()=>{setCategory('sports')}}>Sports</li>
                <li onClick={()=>{setCategory('business')}}>Business</li>
                <li onClick={()=>{setCategory('health')}}>Health</li>
                <li onClick={()=>{setCategory('entertainment')}}>Entertainment</li>
                <li onClick={()=>{setCategory('technology')}}>Tech</li>
            </ul>
        </div>
    </div>
  )
}

export default Header