import React from 'react'
import Aos from "aos"
import "aos/dist/aos.css"
import { Link } from 'react-router-dom'
import { useState } from 'react';

import { useEffect } from 'react'
import c from "../pehli.jpg"
import a from "../alo.jpg"
import { LazyLoadImage } from 'react-lazy-load-image-component'


const About = () => {

    useEffect(()=>{
        Aos.init({duration:900})
    })
    useEffect(()=>{
      Aos.init({duration:900})
    })
  
   
  return (
  <>
  <div className='bg-gray-700 md:h-[400px] h-[200px] flex justify-center gap-y-1 flex-col items-center'>
  <h1 data-aos="fade-up" style={{ fontFamily: 'Alisandra-Bold' }} className='md:text-[49px] font-black  text-[20px] text-white text-center'>Hash Limo Car Services Blog!</h1>

    <h className="no text-white md:text-[30px] text-[20px]">Home / <span className='text-yellow-500'>Blog</span></h>
  
  </div>
  
  

  <div id="vision" className='flex md:flex-row flex-col gap-x-5 xl:justify-between gap-y-6 mt-4 md:px-20 px-5 py-2 justify-between items-center'>

      



      <div className='flex flex-col gap-y-4 max-w-[800px] md:px-none px-3 md:items-start justify-center items-center'>
      <h1 data-aos="fade-down" className='no md:text-[70px] text-[22px] text-center md:text-left capitalize font-semibold tracking-tight'>
  <span style={{ fontFamily: 'Alisandra-Bold' }} className="text-yellow-500  relative">
Enjoy The Convenient Ride With<span className='text-yellow-500'> Hash Limo</span>
    <span className="absolute inset-x-0 bottom-0 h-1 w-[24px] bg-white"></span>
  </span>
</h1>

        <p data-aos="fade-down" className='text-center md:text-left md:text-left break-normal leading-loose tracking-wide mo text-white md:text-[24px] text-[14px] capitalize'>
Discover the epitome of luxury travel with Hash Limo. Our distinguished fleet of vehicles, meticulously curated for your comfort and style, sets the standard for exceptional transportation services. At Hash Limo, we prioritize your experience, guaranteeing reliability and punctuality on every journey. We are dedicated to exceeding your expectations, ensuring that each ride is an embodiment of our commitment to excellence. With Hash Limo, you'll relish not just in our elegant fleet, but also in the seamless, user-centric experience that defines our service. Elevate your travel with us, where sophistication meets unparalleled satisfaction.</p>
       <Link to="/airport"><button data-aos="fade-up" className='capitalize md:mx-1 md:w-[230px] w-[150px]  px-4 py-1 md:py-2 text-yellow-500 hover:bg-yellow-700 md:text-[23px] text-[14px] hover:text-white transition ease-in duration-200 po border-2 border-yellow-600 bg-black'>More Services</button></Link> 
       
 

      </div>



   
      <LazyLoadImage data-aos="fade-up"
          className="w-[100%] h-[330px] md:w-[44%] md:h-[600px] object-cover rounded-[9px] object-center"
          src={c}
         
         
        />












     

    </div>
    <div className='flex flex-row md:justify-start justify-center md:px-12 py-5 jo px-4 md:ml-2 md:mt-3 mt-1 gap-x-3'>
<p style={{ fontFamily: 'Alisandra-Bold' }} data-aos="fade-down" className=' text-yellow-500 font-semibold  capitalize md:text-left text-center md:text-[29px] tracking-wide text-[19px]'>Your event will always be conducted on time</p>
</div>
<p data-aos="fade-up" className='md:px-12 py-5 capitalize  md:ml-2 px-4 text-center md:text-left text-white mo md:text-[26px] text-[13px] tracking-wide'>There may be many unforeseen events which may cause the delay of your guests arriving on time. Most corporate events are notorious for starting late and going on for a longer period of time than anticipated. This can cause many guests to get upset or angry as they might have other engagements as well Hash Limo car service, you always stay on top of the event schedule as there will be no delays whatsoever in any case. We have drivers who are very reliable and we pride ourselves in observing correct timings for pick-ups and drop-offs always. Your guests will always be on time for the event. This will ensure that everything in the event goes smoothly without a delay. The starting will be on time as your VIP members and guests will all be present at the appointed time. This ensures that the event will also end on time helping the guests with prior engagements to leave and attend those as well. This keeps up your reputation of being punctual and people will want to attend your events in the future as well.</p>

<div className='flex flex-row md:justify-start justify-center md:px-12 py-5 jo px-4 md:ml-2 md:mt-3 mt-1 gap-x-3'>
<p style={{ fontFamily: 'Alisandra-Bold' }} data-aos="fade-down" className=' capitalize  text-yellow-500  md:text-left text-center font-semibold capitalize md:text-[29px] tracking-wide text-[19px]'>You demonstrate your commitment to your guests and clients</p>
</div>
<p data-aos="fade-up" className='md:px-12 py-5 mo capitalize  px-4 md:ml-2 text-white  md:text-[26px] text-center md:text-left text-[13px] tracking-wide'>Inviting your guests to be a part of your corporate event is easy. However, taking care of their every need and making sure that they reach the venue on time with comfort is not an easy feat to achieve. You will be busy in organizing and running a huge event for your company. But the guests and clients you invite will take note of every minute details and the kind of attention you provide to them. Showing them that you will go out of your way to make sure that their journey is comfortable will earn them your trust. A great car service will always make sure that you are presented as the best in front of your clients. All you need to do is hire us and avail of the services that we provide for corporate events. This will build strong business relationships with your clients and you will earn a great reputation for good conduct. This will definitely help you with your business and ensure brand loyalty for your company’s business.</p>

  
  </>
  )
}

export default About