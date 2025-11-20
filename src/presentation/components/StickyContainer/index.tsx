import React from 'react'

interface typeStickyContainer {
    children: any,
    top?: number
}

const StickyContainer = ({ children, top }: typeStickyContainer) => {
    return (
        <div style={{ position: 'sticky', top: top || 0 }}>
            {children}
        </div>
    )
}

export default StickyContainer
