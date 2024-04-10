import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useCity } from './context';
import Modal from './Modal';
import Image1 from '../assets/weather_dribbble_size.gif.gif'
import cloud from '../assets/cloud.jpg'
import image2 from '../assets/weather-forecast-symbol-v7o.png'
import clear from '../assets/clear.jpeg'
import snow from '../assets/snow.png'


const Home = () => {
    const [data,setData]=useState([]);
    const [city,setCity]=useCity();
    const [toggle,setToggle]=useState(false)
   
    
    
    
    let lat=city.coordinates[0];
    let lon=city.coordinates[1];
    
    const name=city.name;
   
    const loadremaining=()=>{
      setToggle(!toggle)
    }
    
  
    const fetchData=async()=>{
     return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d6c79015091038761ddb8066501830f9`)
     .then((res)=>res);
  
    }
    useEffect(()=>{
      fetchData().then((data)=>setData(data.data.list))
      setCity(city)
      
      
    },[data])
    console.log(city)
    return (
      <div className="p-8 overflow-auto relative">
       <div className='flex w-full text-center overflow-x  items-center justify-center bg-lime-500 rounded-md h-[100px] gap-1 p-2' style={{ overflowX: 'auto' }}>
       <img src={Image1} className='h-12 w-15 bg-transparent border-rounded-md animate-bounce ml-2' />
        <h1 className=' text-xl font-bold text-violet-900  '>Retrieve the 5-day weather forecast for <strong className='text-cyan-960'>{name}</strong> with updates available every 3 hours, providing detailed weather information such as temperature, humidity.</h1>
        
        </div>  
       <div className='overflow-auto relative mt-5' style={{ overflowX: 'auto' }}> 
      <table className='w-full mt-2 overflow-x table-auto border-x border-b'  >
      <thead >
        <tr>
          <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>
            Weather
          </td>
          <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Description</td>
          <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Temparature</td>
          <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Feels Like</td>
          <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Humidity</td>
          <td className='font-bold p-2 border-b border-l border-indigo-700 text-center bg-indigo-700 text-white'>Time</td>
  
          
        </tr>
      </thead>
      <tbody className='border'>
       {data?.map((item,index)=>(
           
            <tr key={index} className='odd:bg-gray-100 hover:!bg-stone-200' >
            
              <td className='flex item-center justify-center p-2 border-b border-l text-center ' >{item.weather[0].main == "Clouds" ? <img src={cloud} className='h-8 w-10'/>:
              item.weather[0].main.toLowerCase() == "rain" ? <img src={image2} className='h-8 w-10'/> : item.weather[0].main.toLowerCase() == "clear" ? <img src={clear} className='h-12 w-15'/>:
              item.weather[0].main.toLowerCase() == "snow" ? <img src={snow} className='h-12 w-15'/>: item.weather[0].main}</td>
                 
              <td className='p-2 border-b border-l text-center'>{item.weather[0].description}</td>
              <td className='p-2 border-b border-l text-center'>{(item.main.temp-272.15).toFixed(2)}</td>
              <td className='p-2 border-b border-l text-center'>{(item.main.feels_like-272.15).toFixed(2)}</td>
              <td className='p-2 border-b border-l text-center'>{item.main.humidity}</td>
              <td className='p-2 border-b border-l text-center'>{item.dt_txt}</td>
            </tr>
          
       ))}
       </tbody>
       </table>
       </div>
       </div>
       )

}


export default Home
