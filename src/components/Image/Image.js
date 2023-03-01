import { useState, useMemo } from "react";

const Image = (widthness = 150) => {
  
    const [liwor, setLiwor] = useState(-1) // local Image Width Over Ride
  const urlString =  useMemo(() => {
      const kitty = Math.floor(Math.random() * 100);
  const kitty1 = Math.floor(Math.random() * 100);
  const kitty2 = Math.floor(Math.random() * 100);
  const urlString = 200 +  Math.floor((kitty + kitty1 + kitty2)/ 3);
  return urlString;
    }, [])
  const upWidth = () => {
    liwor < 0 ? setLiwor(80) : setLiwor(liwor => Math.floor(liwor * 1.1))
  }
  const downWidth = () => {
    liwor < 50 ? setLiwor(200) : setLiwor(liwor => Math.floor(liwor * 0.9))
  }
    console.log('useMemo RAN urlString App.js [13] ===', urlString);
  
    return (
      <li style={{ listStyle: 'none'}} className='image-li' >
        <button aria-label='decrease image width' onClick={downWidth} role={'button'} >-</button>
      <img
      style={liwor > 0 ? {width : liwor + 'px'} : null}
            className={`App-link width-${widthness}` }
            src={`http://placekitten.com/200/${urlString}`}
            alt="noopener noreferrer"
          />
        <button aria-label='decrease image width' onClick={upWidth} role={'button'} >+</button>
          </li>
    )
  }

  export default Image;