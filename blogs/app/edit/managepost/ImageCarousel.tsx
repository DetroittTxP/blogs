'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
interface CarouselProp{
    images:string[]
}

export const ImageCarousel:React.FC<CarouselProp> =({images}) => {
  return (

    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={3000}
      showIndicators={false}
      width={250}
    >
      {images.map((image, index) => (
        <div key={index} >
          <img
            className=" w-32  object-cover rounded-lg shadow-lg"
            src={image}
            alt={`Slide ${index}`}
          />
        </div>
      ))}
    </Carousel>
  )
}
