import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCity } from './context';
import Image from '../assets/weather.jpg'

const HomePage = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
   
    const [city,setCity]=useCity()
    

    const fetchData = async (pageNumber) => {
        setLoading(true);
        const response = await axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?rows=40&disjunctive.cou_name_en=true&q=${value}&start=${pageNumber * 40}&fields=geoname_id,name,cou_name_en,ascii_name,alternate_names,population,dem,timezone,country_code,coordinates&dataset=geonames-all-cities-with-a-population-1000&timezone=Asia%2FKolkata&lang=en`);
        setLoading(false);
       
        return response.data.records;
    };
    

    useEffect(() => {
        fetchData(page).then((newData) => {
            setData((prevData) => [...prevData, ...newData]);
            
            
            
        });
    }, [page, value]);
  //  console.log(data.fields)

    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
                loading
            )
                return;
            setPage((prevPage) => prevPage + 1);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, page]);

    const filterData = () => {
        fetchData(0).then((filteredData) => {
            setData(filteredData);
           
           
        });
        
    };
    
  

    return (
        <div className=" p-8 overflow-auto relative" style={{ overflowX: 'auto' }}>
       <div className='flex flex-col w-full text-center   items-center justify-center bg-lime-500 rounded-md h-[150px] gap-2 py-10' style={{ overflowX: 'auto' }}>
       <div className='flex gap-2'>
       <img src={Image} className='h-12 w-12 bg-transparent animate-bounce'/>
       <h1 className=' text-2xl font-bold text-blue-950 '>
       Discover a comprehensive list of cities worldwide and easily locate yours by using the search function
       </h1>
       </div>
       <div>
       <input className='shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' value={value} onChange={(e) => setValue(e.target.value)} />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' onClick={filterData}>Search</button>
        </div>
        </div>
           <div className='overflow-auto relative mt-5' style={{ overflowX: 'auto' }}>
            <table className="w-full overflow-x  table-auto border-x border-b" >
                <thead >
                    <tr>
                        <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Geoname Id</td>
                        <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Name</td>
                        <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Country Name En</td>
                        <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>ASCII Names</td>
                        <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Alternate names</td>
                        <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Population</td>
                        <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Timezone</td>
                        <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Country Code</td>
                        <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Coordinates</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className='odd:bg-gray-100 hover:!bg-stone-200'>
                            <td className='p-2 border-b border-l text-center'>{item.fields.geoname_id}</td>
                            <td className='p-2 border-b border-l text-center'><Link to='/home' onClick={() => setCity(item.fields)} >{item.fields.name}</Link></td>
                            <td className='p-2 border-b border-l text-center'>{item.fields.cou_name_en}</td>
                            <td className='p-2 border-b border-l text-center'>{item.fields.ascii_name}</td>
                            <td className='p-2 border-b border-l text-center'>{item.fields.alternate_names}</td>
                            <td className='p-2 border-b border-l text-center'>{item.fields.population}</td>
                            <td className='p-2 border-b border-l text-center'>{item.fields.timezone}</td>
                            <td className='p-2 border-b border-l text-center'>{item.fields.country_code}</td>
                            <td className='p-2 border-b border-l text-center'>{item.fields.coordinates}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default HomePage;
