import './App.css';
import { useState, useMemo, useEffect } from 'react';
import Image from './components/Image/Image';
import LocallyServedImage from './components/LocallyServedImage/LocallyServedImage';
import { imageMap } from './assets/map/imageMap';
import { RxMinusCircled, RxPlusCircled, RxReload}  from 'react-icons/rx'

function App() {
  const [widthness, setWidthness] = useState(144) 
  const [flexDirection, setFlexDirection] = useState('row') 
  const increaseWidth = () => {
    widthness > 1100 || widthness < 50 ?  setWidthness(144) : setWidthness(widthness => 1.25 * widthness)
   }
  const decreaseWidth = () => {
    widthness < 50 ?  setWidthness(144) : setWidthness(widthness => 0.75 * widthness)
  }
  const resetWidth = () => setWidthness(143);

  const changeFlexDirection = () => {
    flexDirection === 'row' ? setFlexDirection('column') : setFlexDirection('row');
  }
  return (
    <div className="App">
      <header className="App-header">
            <button className='images-direction' onClick={changeFlexDirection} >
              {flexDirection === 'row'? "View Photos as Column" : "Back to Row View"}  </button>
            <button className='reset-button' aria-label='reset all photos to original sizes'  onClick={resetWidth} ><RxReload size={50} /> </button>
          <div className='inc-buttons'  style={{ display: 'flex', flexDirection: 'column'}} >
          <button aria-label='increase picture width'  onClick={increaseWidth} ><RxPlusCircled size={50} />  </button>
          <button aria-label='decrease picture width'  onClick={decreaseWidth} ><RxMinusCircled  size={50} />  </button>
          </div>
      </header>
          <h2>Photos</h2>
        <div className='my-photos' style={{flexDirection:`${flexDirection}`}}  >
        {imageMap ? imageMap.map((image, i) => <LocallyServedImage key={i.toString()} image={image} topWidthness={widthness} flexDirection={flexDirection} />) : null}
        </div>
    </div>
  );
}

export default App;
