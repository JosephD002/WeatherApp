import React, { useEffect, useRef, useState } from 'react'
import './Principal.css'
import Search from '../assets/Search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Principal = () => {
     
    const inputRef= useRef()
    const [climaData,setClimaData]= useState({})
     
    const todosIconos ={
        "01d" : clear,
        "01n" :clear,
        "02d" :cloud,
        "02n" :cloud,
        "03d" : cloud,
        "03n" :cloud,
        "04d" :drizzle,
        "04n" :drizzle,
        "09d" :rain,
        "09n" :rain,
        "10d" :rain,
        "10n" :rain,
        "13d" :snow,
        "13n" :snow,
    }
    const resultado= async  (ciudad) =>{

        try {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${import.meta.env.VITE_API_ID}`

            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
             const iconos= todosIconos[data.weather[0].icon] || clear
             setClimaData({
                humedad:data.main.humidity,
                velocidadViento:data.wind.speed,
                temperatura:Math.floor(data.main.temp),
                localizacion:data.name ,  
                icono: iconos

            })
        }catch {
            console.log("error")
        }
    }
    useEffect(() => {
        resultado("Toronto")
    },[])
  return (
<div className='tarjeta-clima'>
    <div className='Barra-busqueda'>
      <input ref={inputRef}  className='Busqueda' type='text' placeholder='Buscar' />
      <img src={Search}alt='' onClick={()=>resultado(inputRef.current.value)}/>
    </div>
    <img  className='Icono-clima'src={climaData.icono} alt=''/>
    <p className='Temperatura'>{climaData.temperatura}°</p>
    <p className='Ciudad'>{climaData.localizacion}</p>
    <div className="Clima-ciudad">
        <div className="col">
            <img src={humidity} alt="" />
            <div>
                <p>{climaData.humedad}%</p>
                <span>Humedad</span>
            </div>
        </div>
        <div className="col">
            <img src={wind} alt="" />
            <div>
                <p>{climaData.velocidadViento}km/h</p>
                <span>Velocidad del viento</span>
            </div>
        </div>
    </div>
 </div>
    
  )
}

export default Principal
