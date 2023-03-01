import React from "react";
import LocallyServedImage from "../LocallyServedImage/LocallyServedImage";
import { imageMap } from "../../assets/map/imageMap";
console.log(imageMap)

const ImageContainer = ({flexDirection}) => {
    console.log('=== flexDirection ImageContainer.js [7] ===', flexDirection);
    return (
        <div style={{flexDirection: 'column'}}>
        {/* <div> */}
            {imageMap.map((image, i) => <LocallyServedImage key={i.toString()} image={image} />)}

        </div>
    )
}

export default ImageContainer;