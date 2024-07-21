'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


interface ImageProp{
    postImg:string[],
    author:string
}

const ImageCarousel:React.FC<ImageProp> = ({postImg,author}) => {
  return (
    <div>
        <Carousel className='overflow-hidden '>
              {postImg.map(image => (
                     <img width={600} className='object-cover w-full h-full  '
                         alt={author} height={600} 
                         src={`${process.env.NEXT_PUBLIC_IMAGEHOST}/post/${author}/${image}`}/>
              ))}
        </Carousel>
    </div>
  )
}

export default ImageCarousel;
