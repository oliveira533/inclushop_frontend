import React from 'react';
import ReactDOM from 'react-dom/client';
import { FaStar } from "react-icons/fa";


import "./home.css"

function Home(){
    return(
        <div className='home'>
            <div className='home-card'>
                <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/2a/a5/87/com-um-projeto-moderno.jpg?w=1200&h=-1&s=1" className='home-card-image'/>
                <p className='home-card-name'>Cantareira norte shopping</p>
                <div className='home-card-rate'>
                    <FaStar className='home-card-rate-star-positive' />
                    <FaStar className='home-card-rate-star-positive' />
                    <FaStar className='home-card-rate-star-positive' />
                    <FaStar className='home-card-rate-star-positive' />
                    <FaStar className='home-card-rate-star-positive' />
                </div>
                <p className='home-card-address'>Av. Raimundo Pereira de Magalhães, 11001 - Jardim Pirituba, São Paulo - SP, 02984-035</p>
            </div>
        </div>
    )
}

export default Home