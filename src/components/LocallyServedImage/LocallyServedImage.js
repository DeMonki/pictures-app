import React, { useEffect, useState } from "react";
import './LocallyServedImage.css'
const LocallyServedImage = ({image, topWidthness, flexDirection}) => {
    // console.log('image', topWidthness)
    const [widthness, setWidthness] = useState(100)
    const reduceWidth = () => {
        setWidthness(widthness => Math.floor(widthness * 0.9))
    }
    const raiseWidth = () => {
        setWidthness(widthness => Math.floor(widthness * 1.2))
    }
    useEffect(() => {
        if(topWidthness !== widthness) {
            setWidthness(topWidthness)
        }
    }, [topWidthness]);
    return <li className='image-li' style={{ width : ''}} >
            {flexDirection === 'column' ? <button 
             className="adjust-buttons"
             onClick={reduceWidth}
             aria-label="increase width on this picture"
            >
                <span className="math-font">-</span>
            </button> : null}
            <img
                className={`App-link`}
                style={widthness ? {width:`${widthness}px`} : ''}
                alt={image.alt}
                src={image.src}
            />
            {flexDirection === 'column' ? 
            <button                        
             className="adjust-buttons"
             aria-label="decrease width on this picture"
             onClick={raiseWidth}
            >
                <span className="math-font">+</span>
            </button>
            : null} 
        </li>
}

export default LocallyServedImage;