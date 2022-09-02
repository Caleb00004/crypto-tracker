import React, { Component } from "react";
import Slider from "react-slick";
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import './carousel.css'

export default function Carousel() {
    const {coinData, mode} = useContext(coinContext)

    function sign(number) {
      if (number > 0) {
          return {color: 'green'}
      } else if (number < 0){
          return {color: 'red'}
      }
    }

    let imgLinks = []

    for (let i = 0; i <= 10; i++) {
        //console.log(coinData[i])
        imgLinks.push({
            img: coinData[i].image,
            name: coinData[i].symbol,
            change: coinData[i].price_change_percentage_24h,
            price: coinData[i].current_price})
    }
  

    const carouselmg = imgLinks.map(imgItem => (
    <div className='carousel-cell'>
        <img width={'35%'} src={imgItem.img}/>
        <p>
          {imgItem.name.toUpperCase()}
          <span style={sign(imgItem.change)}>
            {imgItem.change > 0 ? ` +${imgItem.change.toFixed(2)}%` : ` ${imgItem.change.toFixed(2)}%`}
          </span>
        </p>
        <p>${imgItem.price.toLocaleString('en-US')}</p>
    </div>
    ))
        
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
