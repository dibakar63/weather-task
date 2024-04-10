import React from 'react'
const Modal = (props) => {
    console.log(props);
    return (
      <div className="!z-10 fixed inset-0 flex items-center justify-center overflow-y-auto">
        <div className="!z-10 fixed inset-0 bg-gray-800 bg-opacity-20 backdrop-blur-sm backdrop-filter"></div>
  
        
          <div className="!z-10 relative w-1/2 rounded bg-white p-8 shadow-md h-fit text-gray-800" >
            <button
              className="absolute right-2 top-2 text-gray-800 hover:text-gray-800"
              onClick={props.loadremaining}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h2 className="mb-4 text-xl font-semibold">Business Listings</h2>
  
            <p className="text-sm text-gray-900">All listings presenting discrepancies in NAP (Name, Address, Phone Number) will be amended utilising the verified business details found in the information section of your website. Kindly ascertain that your business particulars are up-to-date and confirm to commence the process of updating your NAP listing.</p>
  
          </div>
       
      </div>
    )}
    export default Modal