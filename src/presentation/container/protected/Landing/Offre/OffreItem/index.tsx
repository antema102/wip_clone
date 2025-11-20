import React from 'react';
import './index.scss';
const OffreContent = (props: any) => {
    return (
        <div className='offre__content'>
            {props.data.map((offre: any, index: number) => (
                <div className='item' key={index}>
                    <div className='image'>
                        <img src={offre.imageUrl} alt={offre.title} loading='lazy' />
                    </div>
                    <div className='text'>
                        <p>{offre.title}</p>
                        <div>{offre.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OffreContent;