import React, { Component } from "react";
import Slider from "react-slick"; // This is used to create the carousel. Can be installed with [npm install react-slick]
import './carousel.css'
import { currencySymbol } from "../functions/currencySymbol";
import { changeColor } from "../functions/changeColor";

export default function Carousel({coinData, mode, currency}) {
  
    // store 11 coinData to be displayed as a carousel.
    let carouselData = []

    for (let i = 0; i <= 10; i++) {
        carouselData.push({
            img: coinData[i].image,
            name: coinData[i].symbol,
            change: coinData[i].price_change_percentage_24h,
            price: coinData[i].current_price,
            id: coinData[i].id})
    }
  
    // mapping through carousel data    
    const carouselmg = carouselData.map(imgItem => (
    <div key={imgItem.id} className='carousel-cell'>
        <img width={'35%'} src={imgItem.img}/>
        <p>
          {imgItem.name.toUpperCase()}
          <span style={changeColor(imgItem.change)}>
            {imgItem.change > 0 ? ` +${imgItem.change.toFixed(2)}%` : ` ${imgItem.change.toFixed(2)}%`}
          </span>
        </p>
        <p >{currencySymbol(currency)}{imgItem.price.toLocaleString('en-US')}</p>
    </div>
    ))
    
    // settings for the slider carousel 
    const settings = {
        infinite: true,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000, 
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: false,
        cssEase: 'linear',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 2000,
                autoplaySpeed: 2000, 
              }
            }
          ]
    };

    return (
        <div className="carousel">
            <Slider {...settings} className={`slider ${mode}`}>
                {carouselmg}
            </Slider>
        </div>
    )
}
