import React from 'react'

const Account = () => {
  return (
    <>
    <div className='h-[400px] md:h-[200px] bg-gray-700 flex justify-center items-center'>
      <h className="md:text-[30px] text-[19px] text-white no">Home / <span className='text-yellow-500'>Account</span></h>
    </div>
    <div data-aos="fade-up" className='md:mx-10 mx-2 mt-10'>
      <iframe title="Login" src="https://book.mylimobiz.com/v4/hashlimo/widget/login" data-ores-widget="login" data-ores-alias="hashlimo" data-redirect-url="{redirect_url}"></iframe>
      <script type="text/javascript" src="https://book.mylimobiz.com/v4/widgets/widget-loader.js"></script>
    </div>
  </>
  
  )
}

export default Account