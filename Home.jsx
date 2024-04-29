import React, { useState, useEffect } from 'react';
import Hero from '../Hero';
import Blocks from '../Blocks';
import Donation from '../Donation';
import Gallery from "../Gallery";
import Resform from './Resform';
import Cards from '../Cards';
import Scroll from '../Scroll';
import Contact from '../Contact';
import Reviewform from '../Reviewform'

const Home = () => {
  const [loading, setLoading] = useState(true);

// Empty dependency array to ensure this effect only runs once

  return (
    <div>
     
     <div>
     
     <>
       <Hero />
       
       <Blocks />
       <Donation />
       <Cards />
       {localStorage.getItem('authtoken') && <Reviewform/>}
       
       {/* <Cards /> */}
     </>
   
 </div>
      
    </div>
  );
}

export default Home;
