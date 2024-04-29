import React from 'react'
import { Link } from 'react-router-dom'
import a from "../a1.jpg"
import b from "../a4.jpg"
import c from "../a3.jpg"
import d from "../p1.jpg"
import e from "../p2.jpg"

import Aos from "aos"
import q from "../alo.jpg"
import "aos/dist/aos.css"
import { useEffect } from 'react'
import { useState } from 'react'


const Airport = () => {
  useEffect(()=>{
    Aos.init({duration:900})
  })

 
  return (
    <>
    
    <div className='bg-gray-800 md:h-[400px] h-[200px] flex justify-center items-center'>

        <h className="md:text-[30px] text-[19px] text-white no">Home / <span className='text-yellow-500'>Airport</span></h>

    </div>

<div className='flex flex-col justify-center items-center gap-y-1'>

    <h1 style={{ fontFamily: 'Alisandra-Bold' }} className='text-yellow-500 md:text-[60px] text-[21px] tracking-wide no text-center py-5 font-extrabold'>Airports We Service</h1>
    <hr className='rounded-[3px] h-[3px] w-[30px] border-4 border-white' />
    </div>
<div className='py-6'>    
<div className='flex md:flex-row flex-col gap-y-5 justify-between items-center md:px-11 px-3'>


  
<div data-aos="fade-up" className='rounded-[10px] cursor-pointer relative group  '>
  <div className='md:w-[600px] w-full md:h-[510px] h-[340px]'>
    <img  src={d} alt='Image' className='rounded-[15px] w-full h-full object-cover md:px-1 px-3 object-center brightness-50' />

    </div>
    <div className='absolute top-4 left-4 right-4 bottom-4 flex flex-col justify-center items-center gap-y-3'>
        <p className='text-slate-50 font-black md:text-[60px] text-[22px] mo tracking-wide'>BDL AIRPORT</p>
      </div>


      <div className='absolute top-0 left-0 w-full px-3 h-full text-center  opacity-0 group-hover:opacity-100 transition-opacity duration-500 card-overlay md:px-8 gap-y-5 text-gray-200 flex flex-col justify-center md:text-[21px] text-[15px] items-center'>
      <p className='text-yellow-500 font-semibold md:text-[30px] text-[22px] no'>BDL AIRPORT</p>
      <p className='break-normal text-gray-100 mo md:text-[25px] text-center  text-[14px] tracking-wide leading-normal capitalize'>Simplify your Bradley International Airport journey by booking BDL Airport Transportation. Bid farewell to traffic woes and parking hassles, ensuring a stress-free BDL airport experience whether you're arriving or departing.
</p>    
 <Link to="/about"><button className='capitalize md:mx-1 md:w-[230px] w-[150px]  px-4 md:py-2 py-1 text-yellow-500 hover:bg-yellow-700 md:text-[23px] text-[14px] hover:text-white transition ease-in duration-200 no border-2 border-yellow-600 bg-black'>read more</button></Link> 


    </div>
  </div>
  
  <div data-aos="flip-right"  className=' shadow-xl cursor-pointer relative group'>
    <div className='md:w-[600px] w-full md:h-[510px] h-[340px]'>
    <img  src={q} alt='Image' className='rounded-[10px] w-full h-full object-cover md:px-1 px-3 object-center brightness-50' />

    </div>

    
    <div className='px-5'>
    <div className='absolute top-4 left-3 right-3 bottom-3 flex flex-col justify-center items-center gap-y-3'>
        <p className='text-slate-50 font-extrabold antialiased decoration-8 tracking-wide md:text-[60px] text-[24px] mo'>JKF AIRPORT</p>
      </div>
    <div className='absolute top-0 left-0 w-full px-3 h-full text-center  opacity-0 group-hover:opacity-100 transition-opacity  duration-500 card-overlay md:px-8 px-3 yes gap-y-5 text-gray-200 flex flex-col justify-center items-center'>
    <p className='text-yellow-500 font-semibold md:text-[30px] text-[22px] no'>JKF AIRPORT</p>

      <p className='break-normal text-center  text-gray-100 mo md:text-[25px]  text-[14px] tracking-wide leading-normal capitalize'>Navigating traffic and parking can be nerve-wracking when heading to the airport. Consider reserving JKF Airport Transportation for seamless travel to and from JKF Airport. Simplify your journey and leave the stress behind.
</p>
<Link to="/about"><button data-aos="fade-in" className='capitalize md:mx-1 md:w-[230px] w-[150px]  px-4 md:py-2 py-1 text-yellow-500 hover:bg-yellow-700 md:text-[23px] text-[14px] hover:text-white transition ease-in duration-200 no border-2 border-yellow-600 bg-black'>read more</button></Link> 

    </div>
  </div>
  </div>

    
  <div data-aos="flip-right"  className=' shadow-xl cursor-pointer relative group'>
  <div className='md:w-[600px] w-full md:h-[510px] h-[340px]'>
    <img  src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=600" alt='Image' className='rounded-[10px] w-full h-full object-cover md:px-1 px-3 object-center brightness-50' />

    </div>    <div className='absolute top-4 left-3 right-3 bottom-3 flex flex-col justify-center items-center gap-y-3'>
        <p className='text-white font-black md:text-[60px] text-[22px] mo tracking-wide'>LGA AIRPORT</p>
      </div>
    <div className='absolute top-0 left-0 w-full px-3 h-full text-center  opacity-0 group-hover:opacity-100 transition-opacity  duration-500 card-overlay md:px-8 px-3 yes gap-y-5 text-gray-200 flex flex-col justify-center md:text-[21px] text-[15px] items-center'>
    <p className='text-yellow-500 font-semibold md:text-[30px] text-[22px] no'>LGA AIRPORT</p>

      <p className='break-normal text-center  text-gray-100 mo md:text-[25px]  text-[14px] tracking-wide leading-normal capitalize'>When traveling to LGA Airport, the prospect of traffic and parking can be daunting. Ease your worries by booking LGA Airport Transportation for LGA Airport flights.
</p>
<Link to="/about"><button data-aos="fade-in" className='capitalize md:mx-1 md:w-[230px] w-[150px]  px-4 md:py-2 py-1 text-yellow-500 hover:bg-yellow-700 md:text-[23px] text-[14px] hover:text-white transition ease-in duration-200 no border-2 border-yellow-600 bg-black'>read more</button></Link> 

    </div>
  </div>







</div>


  <div className='flex md:flex-row flex-col gap-y-5 justify-between items-center md:px-11 md:mt-7 mt-4 px-2'>
  
  <div data-aos="flip-right"  className=' shadow-xl cursor-pointer relative group'>
  <div className='md:w-[600px] w-full md:h-[510px] h-[340px]'>
    <img  src={e} alt='Image' className='rounded-[10px] w-full h-full object-cover md:px-1 px-3 object-center brightness-50' />

    </div>    <div className='absolute top-4 left-3 right-3 bottom-3 flex flex-col justify-center items-center gap-y-3'>
        <p className='text-white font-black md:text-[60px] text-[22px] mo tracking-wide'>EWR AIRPORT</p>
      </div>
    <div className='absolute top-0 left-0 w-full px-3 h-full text-center  opacity-0 group-hover:opacity-100 transition-opacity  duration-500 card-overlay md:px-8 px-3 yes gap-y-5 text-gray-200 flex flex-col justify-center md:text-[21px] text-[15px] items-center'>
    <p className='text-yellow-500 font-semibold md:text-[30px] text-[22px] no'>EWR AIRPORT</p>

      <p className='break-normal text-center  text-gray-100 mo md:text-[25px]  text-[14px] tracking-wide leading-normal capitalize'>When traveling to EWR Airport, the prospect of traffic and parking can be daunting. Ease your worries by booking EWR Airport Transportation.
</p>
<Link to="/about"><button data-aos="fade-in" className='capitalize md:mx-1 md:w-[230px] w-[150px]  px-4 md:py-2 py-1 text-yellow-500 hover:bg-yellow-700 md:text-[23px] text-[14px] hover:text-white transition ease-in duration-200 no border-2 border-yellow-600 bg-black'>read more</button></Link> 

    </div>
  </div>


  
  <div data-aos="fade-up" className='rounded-[10px] cursor-pointer relative group  '>
  <div className='md:w-[600px] w-full md:h-[510px] h-[340px]'>
    <img  src="https://images.pexels.com/photos/163771/airport-airplanes-gates-flight-line-163771.jpeg?auto=compress&cs=tinysrgb&w=600" alt='Image' className='rounded-[15px] w-full h-full object-cover md:px-1 px-3 object-center brightness-50' />

    </div>
    <div className='absolute top-4 left-4 right-4 bottom-4 flex flex-col justify-center items-center gap-y-3'>
        <p className='text-slate-50 font-black md:text-[60px] text-[22px] mo tracking-wide'>BOSTON AIRPORT</p>
      </div>


      <div className='absolute top-0 left-0 w-full px-3 h-full text-center  opacity-0 group-hover:opacity-100 transition-opacity duration-500 card-overlay md:px-8 gap-y-5 text-gray-200 flex flex-col justify-center md:text-[21px] text-[15px] items-center'>
      <p className='text-yellow-500 font-semibold md:text-[30px] text-[22px] no'>BOSTON AIRPORT</p>
      <p className='break-normal text-gray-100 mo md:text-[25px] text-center  text-[14px] tracking-wide leading-normal capitalize'>Simplify your Boston International Airport journey by booking BOSTON Airport Transportation. Bid farewell to traffic woes and parking hassles, ensuring a stress-free BOSTON airport experience whether you're arriving or departing. 
</p>    
 <Link to="/about"><button className='capitalize md:mx-1 md:w-[230px] w-[150px]  px-4 md:py-2 py-1 text-yellow-500 hover:bg-yellow-700 md:text-[23px] text-[14px] hover:text-white transition ease-in duration-200 no border-2 border-yellow-600 bg-black'>read more</button></Link> 


    </div>
  </div>

  
 


   
  
  <div data-aos="fade-up" className='rounded-[10px] cursor-pointer relative group  '>
  <div className='md:w-[600px] w-full md:h-[510px] h-[340px]'>
    <img  src="https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=600" alt='Image' className='rounded-[15px] w-full h-full object-cover md:px-1 px-3 object-center brightness-50' />

    </div>
    <div className='absolute top-4 left-4 right-4 bottom-4 flex flex-col justify-center items-center gap-y-3'>
        <p className='text-slate-50 font-black md:text-[60px] text-[22px] mo tracking-wide'>CHICAGO AIRPORT</p>
      </div>


      <div className='absolute top-0 left-0 w-full px-3 h-full text-center  opacity-0 group-hover:opacity-100 transition-opacity duration-500 card-overlay md:px-8 gap-y-5 text-gray-200 flex flex-col justify-center md:text-[21px] text-[15px] items-center'>
      <p className='text-yellow-500 font-semibold md:text-[30px] text-[22px] no'>CHICAGO AIRPORT</p>
      <p className='break-normal text-gray-100 mo md:text-[25px] text-center  text-[14px] tracking-wide leading-normal capitalize'>Simplify your Chicago International Airport journey by booking CHICAGO Airport Transportation. Bid farewell to traffic woes and parking hassles, ensuring a stress-free CHICAGO airport experience whether you're arriving or departing.
</p>    
 <Link to="/about"><button className='capitalize md:mx-1 md:w-[230px] w-[150px]  px-4 md:py-2 py-1 text-yellow-500 hover:bg-yellow-700 md:text-[23px] text-[14px] hover:text-white transition ease-in duration-200 no border-2 border-yellow-600 bg-black'>read more</button></Link> 


    </div>
  </div>



 
  



  

{/* 
   <div data-aos="fade-up" className='rounded-[10px] cursor-pointer relative group'>
  <div className='md:w-[600px] w-full md:h-[510px] h-[360px]'>
    <img src="https://images.pexels.com/photos/1815385/pexels-photo-1815385.jpeg?auto=compress&cs=tinysrgb&w=600" alt='Image' className='rounded-[10px] w-full h-full object-cover px-3 md:px-1 object-center brightness-50' />
  </div>
  <div className='absolute top-4 left-4 right-4 bottom-4 flex flex-col justify-center items-center gap-y-3'>
    <p className='text-white font-black md:text-[60px] text-[22px] no tracking-wide'>LGA AIRPORT</p>
  </div>
  <div className='absolute top-0 px-3 left-0 w-full h-full text-center opacity-0 group-hover:opacity-100 card-overlay duration-500 md:px-8 px-3 yes gap-y-5 text-slate-200 flex flex-col justify-center md:text-[21px] text-[15px] items-center'>
    <p className='text-yellow-500 font-semibold md:text-[30px] text-[22px] no'>LGA AIRPORT </p>
    <p className='break-normal text-center text-gray-100 mo md:text-[25px] text-[14px] tracking-wide leading-normal capitalize'>With numerous options for airport transportation, ensuring reliability is crucial. Choose us, BDL Airport Car Service, for dependable and tailored transport to and from LGA Airport, guaranteeing your peace of mind.</p>
    <Link to="/about"><button data-aos="fade-in" className='capitalize md:mx-1 md:w-[230px] w-[150px]  px-4 md:py-2 py-1 text-yellow-500 hover:bg-yellow-700 md:text-[23px] text-[14px] hover:text-white transition ease-in duration-200 no border-2 border-yellow-600 bg-black'>read more</button></Link> 
  </div>
</div> */}



  </div>



</div>



    </>

  )
}

export default Airport