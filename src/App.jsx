import './App.css';
import React, { useState } from 'react';
import {
  RxMinusCircled, RxPlusCircled, RxReload, RxDragHandleHorizontal, RxDragHandleVertical,
} from 'react-icons/rx';
import { LocallyServedImage } from './components/LocallyServedImage/LocallyServedImage';
import imageMap from './assets/map/imageMap';

const App = () => {
  const [filterVal, setFilterVal] = useState('');
  const [firstReset, setFirstReset] = useState(false);
  const [flexDirection, setFlexDirection] = useState('row');
  const [showTitles, setShowTitles] = useState(false);
  const [widthness, setWidthness] = useState(144);
  const [dateComparison, setDateComparison] = useState(0);
  const widthRef = React.useRef(widthness);

  const title = 'photos app';
  const tooBigOrTooSmall = (widthness > 1100 || widthness < 50);

  const increaseWidth = () => {
    if (tooBigOrTooSmall) {
      setWidthness(144);
      widthRef.current = 144;
    } else {
      setWidthness((prevWidthness) => 1.25 * prevWidthness);
      widthRef.current = 1.25 * widthness;
    }
  };
  const decreaseWidth = () => {
    if (widthness < 50) {
      setWidthness(144);
      widthRef.current = 144;
    } else {
      setWidthness((prevWidthness) => 0.75 * prevWidthness);
      widthRef.current = 0.75 * widthness;
    }
  };

  const changeFlexDirection = () => {
    if (flexDirection === 'row') {
      setFlexDirection('column');
    } else {
      setFlexDirection('row');
    }
  };
  const setFilterString = (e) => {
    const val = e.target.value;
    setFilterVal(val.toLowerCase());
  };
  const setShowImageTitle = () => {
    setShowTitles(!showTitles);
  };

  const resetWidth = () => {
    setWidthness((prevWidthness) => (prevWidthness * 0) + 143);
    widthRef.current = 143;
    setFilterVal('');
    if (!firstReset) {
      setFirstReset(true);
      const d = Date.now();
      setDateComparison(d);
    }
    if (firstReset) {
      const dd = Date.now();
      if (dd - dateComparison < 5000) {
        if (flexDirection === 'column') {
          setFlexDirection('row');
        }
        setShowTitles(false);
      }
      setFirstReset(false);
    }
  };

  const filterInputId = 'filterInput';

  return (
    <div className="App">
      <div className="photo-controls">
        <button type="button" className="images-direction" onClick={changeFlexDirection}>
          <span className="btn-span">
            {flexDirection === 'row' ? 'View Photos as Column' : 'Back to Row View'}
          </span>
          {flexDirection === 'row' ? <RxDragHandleVertical size={30} /> : <RxDragHandleHorizontal size={30} />}
        </button>
        <button type="button" className="reset-button" aria-label="reset all photos to original sizes" onClick={resetWidth}>
          <span className="btn-span"> RESET </span>
          <RxReload strokeWidth={1} size={30} />
        </button>
        <div className="inc-buttons" style={{ display: 'flex', flexDirection: 'column' }}>
          <button type="button" aria-label="increase picture width" onClick={increaseWidth}>
            <RxPlusCircled size={50} />
          </button>
          <button type="button" aria-label="decrease picture width" onClick={decreaseWidth}>
            <RxMinusCircled size={50} />
          </button>
        </div>
      </div>

      <h2>{title}</h2>
      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
      <label htmlFor={filterInputId}>
        Filter photos by title:
      </label>
      <input className="label-input" value={filterVal} onFocus={() => setFilterVal('')} onChange={setFilterString} type="text" id={filterInputId} />
      <button type="button" className="show-titles-btn" onClick={setShowImageTitle}>
        {showTitles ? 'Hide Image Titles' : 'Show Image Titles'}
      </button>
      <div className="photos-div" style={{ flexDirection: `${flexDirection}` }}>
        {imageMap ? imageMap.filter((img) => img.title.toLowerCase()
          .includes(filterVal)).map((image) => {
          const keyVal = `${image.alt}${widthness}`;
          return (
            <LocallyServedImage
              key={keyVal}
              image={image}
              showTitles={showTitles}
              topWidthness={widthRef}
              flexDirection={flexDirection}
            />
          );
        })
          : null}
      </div>
    </div>
  );
};

export default App;
