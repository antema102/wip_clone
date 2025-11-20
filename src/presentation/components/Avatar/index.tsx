import React from 'react';
import './styles.scss';

interface AvatarProps {
    data: { image: string }[];
    text: string;
}

const Avatar: React.FC<AvatarProps> = ({ data, text }) => {
    return (
        <div className='avatar'>
            <div className='avatar__img'>
                {data.map((item, index) => (
                    <img key={index} src={item.image} height={25} width={25} />
                ))}
            </div>
            <span className='avatar__text'>{text}</span>
        </div>
    );
};

export default Avatar;