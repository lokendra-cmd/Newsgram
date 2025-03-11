import React, { useState } from 'react'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div 
      style={{backgroundColor: '#1A1A1A', color:'#E0E0E0'}}
      className='fixed top-0 w-full h-auto min-h-[10vh] flex flex-col md:flex-row justify-between md:justify-start items-center md:gap-[5vw] px-4 md:px-[1vw] z-50'
    >
      <div className="w-full md:w-auto flex justify-between items-center py-3">
        <div className={`logo ${montserrat.className}`} style={{color:'#B71C1C', fontSize:'clamp(1.5rem, 4vw, 2.5rem)'}}>
          NEWSGRAM
        </div>
        <button 
          className="md:hidden text-white text-2xl"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`navMenu w-full md:w-auto ${mobileMenuOpen ? 'block' : 'hidden'} md:block pb-4 md:pb-0`}>
        <ul className='navMenuItems list-none flex flex-col md:flex-row gap-4 md:gap-[2vw] lg:gap-[4vw]' style={{cursor:'pointer'}}>
          <li className="py-2 md:py-0 text-center md:text-left" onClick={()=>{setCategory('general'); setMobileMenuOpen(false)}}>General</li>
          <li className="py-2 md:py-0 text-center md:text-left" onClick={()=>{setCategory('science'); setMobileMenuOpen(false)}}>Science</li>
          <li className="py-2 md:py-0 text-center md:text-left" onClick={()=>{setCategory('sports'); setMobileMenuOpen(false)}}>Sports</li>
          <li className="py-2 md:py-0 text-center md:text-left" onClick={()=>{setCategory('business'); setMobileMenuOpen(false)}}>Business</li>
          <li className="py-2 md:py-0 text-center md:text-left" onClick={()=>{setCategory('health'); setMobileMenuOpen(false)}}>Health</li>
          <li className="py-2 md:py-0 text-center md:text-left" onClick={()=>{setCategory('entertainment'); setMobileMenuOpen(false)}}>Entertainment</li>
          <li className="py-2 md:py-0 text-center md:text-left" onClick={()=>{setCategory('technology'); setMobileMenuOpen(false)}}>Tech</li>
        </ul>
      </div>
    </div>
  )
}

export default Header