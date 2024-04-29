import React, { useEffect } from 'react';
import Login from '../Login'
import { useState } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";
import {get, useForm} from 'react-hook-form'
import { Navigate, json } from 'react-router';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser'
import card from '../credit-card-logos.png'

const Resform = () => {
  const [invoice,setinvoice] = useState()
  const [rentDate, setRentDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleRentDateChange = (event) => {
    if (event.target.value > returnDate){
      setRentDate(returnDate)
    }
    else{
      setRentDate(event.target.value)
    }
    // const selectedRentDate = event.target.value;
    // setRentDate(selectedRentDate);
  };

  const handleReturnDateChange = (event) => {
    if (event.target.value < rentDate) {
      setReturnDate(rentDate);
    }
    else{
      setReturnDate(event.target.value);
    }
  };


  const navigate = useNavigate()
  const handlecontinueclick = ()=>{
    navigate('/reservation')
  }
  const handlehomeclick = ()=>{
    navigate('/')
  }
  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const date = today.getDate()
  const [formstep, setformstep] = useState(0)
  const { watch, register,handleSubmit,setError, formState:{errors, isValid}, getValues }= useForm({mode:'all'})
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [carname,setcarname] = useState()
  const [total, setTotal] = useState(0)
  const [extracharges , setextracharges] = useState(0)
  const [cardetails,setcardetails] = useState({
    car_id : '',
    car_name : '',
    description : '',
    car_model : '',
    year_of_registration : '',
    color : '',
    rateperday : '',
    status : ''
  })
 
  const [drivercharges, setdrivercharges] = useState(0)
  const [tax, setTax] = useState(0)
  const [maintainence, setmaintenence] = useState(0)
  const [carcharge, setcarcharge] = useState(0)
  const [driverself, setdriverself] = useState()
  const [formdetailsone, setformdetailsone] = useState('')



  const onChange = async (e)=>{
    setcarname(e.target.value)
    const response = await fetch (`http://localhost:5000/api/auth/fetchcardetails/${e.target.value}`,{
    method : 'GET',
    headers : {
      "Content-Type": "application/json"
    }
  })
  const cardata = await response.json()
    const {car_id, car_name, description, car_model, year_of_registration, color, rateperday,status} = cardata
    setcardetails({
      car_id : car_id,
      car_name : car_name,
      description : description,
      car_model : car_model,
      year_of_registration : year_of_registration,
      color : color,
      rateperday : rateperday,
       status : status
    })
    
  }





  
  const CompleteFormStepsNext =  (e)=>{
  const values = getValues();
  
  

  let extra= 0 
  const rentDate = new Date(values.rentdate);
  const returnDate = new Date(values.returndate);
  const daysDifference = Math.floor((returnDate - rentDate) / (1000 * 60 * 60 * 24));
  const drivercharge = daysDifference * 50
  const maintcharges = daysDifference * 10
  const car = cardetails.rateperday * daysDifference
  setcarcharge(car)
  setmaintenence(maintcharges)
  setdrivercharges(drivercharge)
  setNumberOfDays(daysDifference);

  

  if(driverself === 'driver')
  {
    let tot = drivercharge + maintcharges + car
    const taxcharges = tot * 3/100
    extra = taxcharges + maintcharges + drivercharge
    setextracharges(extra)
    tot = tot + taxcharges
    setTax(taxcharges)
    setTotal(tot)
  }
  else{
    let tot =   maintcharges + car
    const taxcharges = tot * 3/100
    extra = taxcharges + maintcharges
    setextracharges(extra)
    tot = tot + taxcharges
    setTax(taxcharges)
    setTotal(tot)
  }
  setformdetailsone(values);
  const invnumber = Math.floor(Math.random() * 9000 + 1000)
  setinvoice(invnumber)
  
  setformstep(cur => cur + 1)
  }



  const CompleteFormStepsBack = ()=>{
    
    setformstep(cur => cur - 1)
  }






  const laststep = async(e)=>{
    const valuesoform = getValues()
    e.preventDefault()
    let email = localStorage.getItem('email')
  const response = await fetch(`http://localhost:5000/api/auth/fetchuserdata/${email}`,{
    method : 'GET',
    headers : {
      "Content-Type": "application/json"
    }
  })
  const userdata = await response.json()
  const {customer_id, name} = userdata
  const storedata = await fetch('http://localhost:5000/api/reservation/reserve',{
    method : 'POST',
    headers :{ "Content-Type" : "application/json"},
    body : JSON.stringify({
      returndate : valuesoform.returndate,
      rentdate : valuesoform.rentdate,
      customer_id : customer_id,
      car_id : cardetails.car_id,
      extra_charges : extracharges,
      amount : total,
      email : email
    })
  })
  const sentdata = await storedata.json()
  console.log('Data sent is ',sentdata)



// sending email
  const res = await emailjs.send("service_pdei5jd","user_invoice",{
      user_name: name,
      from_name: "teamHashLimo",
      message: `Your booking has been confirmed. Your total amount is $${total} with invoice No INV${invoice}. Thanks for booking your ride through HashLimo`,
      user_email: email,
      },'Sw3xMOkvvYPcPfBZw');
      const status =  res.status
      console.log(status)
    setformstep(cur => cur + 1)
  }

  
  
  
  const driverchange= (e)=>{
    setdriverself(e.target.value)
  }

  

  const renderButton = ()=>{
    if(formstep > 2)
    {
      return undefined
    }
    else if (formstep === 2){
      return (<button
              disabled={!isValid}
              onClick={laststep}
              type='submit'
              className="mt-6 bg-black hover:bg-gray-600 text-white  rounded-full px-8 py-6 text-sm  disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Book Ride
            </button>)
    }
    else if (formstep === 0)
    {
      return (  <> 

                <button
                disabled={true}
              onClick={CompleteFormStepsBack}
              type="button"
              className="mt-6 bg-yellow-500 hover:bg-gray-600 text-white rounded-full float-left my-3 px-8 py-6 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Back
            </button>
              <button
              disabled= {!isValid}
              onClick={CompleteFormStepsNext}
              type="button"
              className="mt-6 bg-black hover:bg-gray-600 flex text-white rounded-full float-right my-3 px-8 py-6 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next Step
            </button>

            </>
            
            )
            
    }
    else{
      return (<>
            <button
            onClick={CompleteFormStepsBack}
              type="button"
              className="mt-6 bg-yellow-500 hover:bg-gray-600 text-white rounded-full float-left my-3 px-8 py-6 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Back
            </button>
              <button
            onClick={CompleteFormStepsNext}
              type="button"
              className="mt-6 bg-black hover:bg-gray-600 text-white rounded-full float-right my-3 px-8 py-6 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next Step
            </button></>)
    }
  }
  useEffect(() => {
    Aos.init({ duration: 200 });
  });







  

  return (
    !localStorage.getItem("authtoken") ? <Login/> : 
    <>
      <div className="h-[150px] h-[200px] bg-gray-700 flex justify-center items-center">
        <h className="md:text-[30px] text-[19px] text-white no">Home / <span className="text-yellow-500">Reservation</span></h>
      </div>
      <div className='md:mx-10 mb-5 mx-2 mt-10'></div>
      
      <div className="min-h-screen  flex flex-col items-start text-gray-900 antialiased relative">
      <div
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)",
          height: "34rem",
          backgroundColor : '#374151'
        }}
        className="absolute  inset-x-0 top-0"
      ></div>
      <div className="mx-auto z-10 mt-48 text-center">
        <h1 className="text-white text-5xl font-semibold no">
          Welcome to <span className="text-yellow-500 no">the Club</span>
        </h1>
        <p className="text-yellow-500 mt-2 no">
          Book a Ride in 3 simple steps
        </p>
      </div>
      <div className="max-w-xl w-full mt-24 mb-24 rounded-lg shadow-2xl bg-white mx-auto overflow-hidden z-10">
        <div className="px-16 py-10">
          <form>
          {formstep === 0 && (<section>
            <h2 className="font-bold text-2xl mb-8 my-4 text-center">
              Rental Information
            </h2>
            <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="fullname"   id="fullname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required { ...register('fullname', {
              required: 'Full Name cannot be blank'
            })}/>
            {errors.fullname && <p className='text-red-600 text-sm mt-2'>{errors.fullname.message}</p>}
            <label for="fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="fathername"   id="fathername" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('fathername',{
              required:'Fathers Name cannot be blank'
            })}/>
            {errors.fathername && <p className='text-red-600 text-sm mt-2'>{errors.fathername.message}</p>}
            <label htmlFor="fathername" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Father Name</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="cnic"   id="cnic" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('cnic',{
              required:'CNIC cannot be blank',
              maxLength:{
                value:13,
                message:'Value cannot be greater than 13'
              },
              minLength:{
                value:13,
                message : 'Value cannot be less than 13'
              }
            })}/>
            {errors.cnic && <p className='text-red-600 text-sm mt-2'>{errors.cnic.message}</p>}
            <label htmlForfor="cnic" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CNIC NO</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="address"   id="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('address',{
              required:'Address cannot be blank'
            })}/>
            {errors.address && <p className='text-red-600 text-sm mt-2'>{errors.address.message}</p>}
            <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="contact"  id="contact" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('contact',{
              required:'Contact cannot be blank and must begin with +92',
              pattern : /^\+92\d{10}$/g,
              maxLength : {
              value : 13,
              message : 'Value cannot be greater than 13'
              },
              minLength:{
               value : 13,
               message : 'Value cannot be less than 13'
              }
            })} />
             {errors.contact && <p className='text-red-600 text-sm mt-2'>{errors.contact.message}</p>}
            <label htmlFor="contact" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact No</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="rental" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Rental-Type</label>
          <div class="flex">
           
           <div class="flex items-center me-4 mt-4">
        <input id="inline-2-radio" type="radio"   name="driver" value="driver" onChange={driverchange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-300">Driver</label>
         </div>
         <div class="flex items-center me-4 mt-4">
        <input id="inline-2-radio" type="radio"  name="driver" value = "self" onChange={driverchange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-300">Self</label>
         </div>
          </div>
          </div>
           
            
            
            
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="date"  name="rentdate"  value={rentDate}  id="rentdate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('rentdate',{
          required:'Select rent date',
          onChange : handleRentDateChange
        })}/>
         {errors.rentdate && <p className='text-red-600 text-sm mt-2'>{errors.rentdate.message}</p>}
        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Rent Date</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="date" name="returndate"   value={returnDate}  id="returndate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('returndate',{
          required:'Select return date',
          onChange : handleReturnDateChange
        })}/>
         {errors.returndate && <p className='text-red-600 text-sm mt-2'>{errors.returndate.message}</p>}
        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Return Date</label>
    </div>
  </div>
  <div className="relative z-0 w-full mb-5 group">
            <input type="number" name="noofpassengers"   id="noofpassengers" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('noofpassengers',{
              required : 'Select no of passengers'
            })}/>
             {errors.noofpassengers && <p className='text-red-600 text-sm mt-2'>{errors.noofpassengers.message}</p>}
            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No of Passengers</label>
          </div>


<div className="relative z-0  mb-5 group">

          <ul className="max-w-sm flex flex-col">
  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="1" value='Bentley' onChange={onChange} name="hs-list-group-item-radio" type="radio" className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" defaultChecked/>
      </div>
      <label htmlFor="hs-list-group-item-radio-1"  className="ms-3 block w-full text-sm text-gray-600 dark:text-gray-500">
        Bentley
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="2" value='Mercedes' name="hs-list-group-item-radio" onChange={onChange} type="radio" className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
      </div>
      <label htmlFor="hs-list-group-item-radio-2" className="ms-3 block w-full text-sm text-gray-600 dark:text-gray-500">
        Mercedes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="3" value='Audi' onChange={onChange} name="hs-list-group-item-radio" type="radio" className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
      </div>
      <label htmlFor="hs-list-group-item-radio-3" className="ms-3 block w-full text-sm text-gray-600 dark:text-gray-500">
        Audi
      </label>
    </div>
  </li>
  <li class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <div class="relative flex items-start w-full">
      <div class="flex items-center h-5">
        <input id="4" value='Landcruiser' onChange={onChange} name="hs-list-group-item-radio" type="radio" className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
      </div>
      <label htmlFor="hs-list-group-item-radio-3" className="ms-3 block w-full text-sm text-gray-600 dark:text-gray-500">
        Landcruiser
      </label>
    </div>
  </li>
  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="5" value='Corolla' onChange={onChange} name="hs-list-group-item-radio" type="radio" className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
      </div>
      <label htmlFor="hs-list-group-item-radio-3" className="ms-3 block w-full text-sm text-gray-600 dark:text-gray-500">
        Corolla
      </label>
    </div>
  </li>
  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <div className="relative flex items-start w-full">
      <div class="flex items-center h-5">
        <input id="6" value ='Civic' onChange={onChange} name="hs-list-group-item-radio" type="radio" className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
      </div>
      <label htmlFor="hs-list-group-item-radio-3" className="ms-3 block w-full text-sm text-gray-600 dark:text-gray-500">
        Civic
      </label>
    </div>
  </li>
</ul>
</div>

          




            </section>)}
            { formstep === 1 && (<section>
            
    <h1 className="font-bold text-2xl my-4 text-center text-yellow-500">HashLimo Services</h1>
    <hr className="mb-2"/>
    <div className="flex justify-between mb-6">
        <h1 className="text-lg font-bold">Invoice</h1>
        <div className="text-gray-700">
            <div>Date: {`${month}/${date}/${year}`}</div>
            <div>Invoice #: {`INV${invoice}`}</div>
        </div>
    </div>
    <div class="mb-8">
        <h2  className="text-lg font-bold mb-4">Booking Details:</h2>
        <div className="text-gray-700 mb-2">Booking name : {formdetailsone.fullname}</div>
        <div className="text-gray-700 mb-2">Return date : {formdetailsone.returndate}</div>
        <div className="text-gray-700 mb-2">Contact No : {formdetailsone.contact}</div>
        <div className="text-gray-700">ID card No : {formdetailsone.cnic}</div>
    </div>
    <table class="w-full mb-8">
        <thead>
            <tr>
                <th className="text-left font-bold text-gray-700">Description</th>
                <th className="text-right font-bold text-gray-700">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="text-left text-gray-700">Car ( {cardetails.car_name} ) charges</td>
                <td className="text-right text-gray-700">${carcharge}.00</td>
            </tr>
            <tr>
                <td className="text-left text-gray-700">Maintainence charges</td>
                <td className="text-right text-gray-700">${maintainence}.00</td>
            </tr>
           
           {driverself === 'driver' &&  <tr>
                <td className="text-left text-gray-700">Driver charges</td>
                <td className="text-right text-gray-700">${drivercharges}.00</td>
            </tr>}
            <tr>
                <td className="text-left text-gray-700">Tax</td>
                <td className="text-right text-gray-700">${tax}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td className="text-left font-bold text-gray-700">Total</td>
                <td className="text-right font-bold text-gray-700">${total}</td>
            </tr>
        </tfoot>
    </table>
    <div className="text-gray-700 mb-2">Thank you for your business!</div>
    <div className="text-gray-700 text-sm">Note : Complete rent will be charged if the car is not returned within due period.</div>

            </section>)}
            { formstep === 2 && (<section >
            <h1 className="font-bold text-2xl mb-8 my-4 text-center">Billing</h1>
            <img src={card} alt="card" />
            <div className="relative z-0 w-full mb-5 group">
            
            <input type="text" name="cardnumber" id="cnumber" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('cardnumber',{
              required:'Card Number cannot be left blank',
              maxLength :{
                value: 16,
                message : 'Value cannot be greater than 16'
              },
              minLength :{
                value : 16,
                message : 'Value cannot be less than 16'
              }
            })} />
             {errors.cardnumber && <p className='text-red-600 text-sm mt-2'>{errors.cardnumber.message}</p>}
            <label htmlFor="cnumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Card Number</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input type="date" name="exdate" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('exdate',{
              required : 'Expiration Date cannot be left blank'
            })}/>
             {errors.exdate && <p className='text-red-600 text-sm mt-2'>{errors.exdate.message}</p>}
            <label htmlFor="exdate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Expiration Date</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="cvv" id="cvv" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required {...register('cvv',{
              required:'CVV cannot be left blank',
              maxLength : {
                value : 3,
                message  : 'Value cannot be greater than 3'
              },
              minLength : {
                value : 3,
                message : 'Value cannot be less than 3'
              }
            })} />
             {errors.cvv && <p className='text-red-600 text-sm mt-2'>{errors.cvv.message}</p>}
            <label htmlFor="cvv" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CVV</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input type="text" name="holdername" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required {...register('holdername',{
              required : 'Holders Name cannot be blank'
            })}/>
             {errors.holdername && <p className='text-red-600 text-sm mt-2'>{errors.holdername.message}</p>}
            <label htmlFor="holdername" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cardholder Name</label>
          </div>
   
    

        

       
    

            

            
            </section>)}
            { formstep === 3 && (<section>
            <h2 className="font-semibold text-3xl mb-8">Congratulations! Your ride has been booked. Details will be Emailed to you soon.</h2>
            <button onClick = {handlehomeclick} className='mt-6 bg-black hover:bg-gray-600 text-white  rounded-full px-8 py-6 text-sm  disabled:bg-gray-400 disabled:cursor-not-allowed float-left my-3'>
              Home
            </button>
            <button onClick = {handlecontinueclick} className='mt-6 bg-black hover:bg-gray-600 text-white  rounded-full px-8 py-6 text-sm  disabled:bg-gray-400 disabled:cursor-not-allowed float-right my-3'>
              Continue Booking
            </button>
            </section>)}
            {renderButton()}
          </form>
        </div>
      </div>
    </div>
      
        
      
      










      
    </>
  );
};

export default Resform;


//md:mx-10 mb-5 mx-2 mt-10
//md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white






//

// maxLength : {
//   value : 13,
//   message : 'Value cannot be greater than 13'
// },
// minLength:{
//     value : 13,
//     message : 'Value cannot be less than 13'
// }


//