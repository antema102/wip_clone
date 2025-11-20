import React, { useRef, useState, useEffect } from 'react'
import { Carousel } from 'primereact/carousel';
import { images } from '../../../resources/constants';
import './styles.scss';
import Avatar from '../Avatar';

type ImageData = {
    image: string,
}

const CarouselContent = (props: { text: string }) => {
    const [text, setText] = useState<string>(props.text || "");

    const DataAvatar: ImageData[] = [
        {
            image: images.user
        },
        {
            image: images.user_2
        },
        {
            image: images.user_3
        },
        {
            image: images.user_4
        },
        {
            image: images.user_5
        },
        {
            image: images.user_6
        },
        {
            image: images.user_7
        }
    ]

    return (
        <div className='carousel'>
            <img loading='lazy' src={images.close_up} alt='image' />
            <div className='carousel_text'>
                <p>{text}</p>
                <Avatar data={DataAvatar} text="Plus de 10 000 candidats inscrits" />
            </div>
        </div>
    )
}

export default CarouselContent;

