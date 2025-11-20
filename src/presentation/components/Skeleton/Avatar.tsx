import React from 'react'
import './styles.css'

interface typeAvatar {
    style_?: React.CSSProperties;
}

const Avatar = ({ style_ }: typeAvatar) => {
    return (
        <>
            <div className="skeleton avatarSkeleton" style={style_}></div>
        </>
    );
}

export default Avatar
