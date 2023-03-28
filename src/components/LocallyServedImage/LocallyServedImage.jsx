import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import './LocallyServedImage.css';

export const LocallyServedImage = ({
  image,
  topWidthness,
  flexDirection,
  showTitles,
}) => {
  const [widthness, setWidthness] = useState(null || topWidthness.current);
  console.log('=== widthness LocallyServedImage.jsx [12] ===', widthness, topWidthness);
  const [showPlus, setShowPlus] = useState(false);
  const reduceWidth = () => {
    if (widthness < 50) {
      setWidthness(144);
    } else {
      setWidthness((prevWidthness) => Math.floor(prevWidthness * 0.9));
    }
  };
  const raiseWidth = () => {
    if (widthness > 1200) {
      setWidthness(250);
    } else {
      setWidthness((prevWidthness) => Math.floor(prevWidthness * 1.2));
    }
  };

  const setSetShowPlusOn = React.useCallback(() => {
    setShowPlus(true);
  }, [showPlus]);
  const setSetShowPlusOff = React.useCallback(() => {
    setShowPlus(false);
  }, []);

  useEffect(() => {
    console.log('=== topWidthness LocallyServedImage.jsx [28] ===', topWidthness);
    setWidthness(topWidthness.current);
  }, [topWidthness.current]);
  useEffect(() => {
    if (flexDirection === 'row') {
      setWidthness(topWidthness.current);
    }
  }, [flexDirection]);

  return (
    <li className="image-li">
      {flexDirection === 'column'
        ? (
          <button
            type="button"
            className="adjust-buttons"
            onClick={reduceWidth}
            aria-label="increase width on this picture"
          >
            <span className="math-font">-</span>
          </button>
        ) : null}
      <div>
        <img
          className="image-styles"
          style={widthness ? { width: `${widthness}px` } : ''}
          alt={image.alt}
          src={image.src}
          width={widthness}
        />
        { showTitles
          ? <p className="img-title">{image.title}</p>
          : null}
      </div>
      {flexDirection === 'column'
        ? (
          <button
            type="button"
            className="adjust-buttons"
            aria-label="decrease width on this picture"
            onClick={raiseWidth}
            onMouseEnter={setSetShowPlusOn}
            onMouseLeave={setSetShowPlusOff}
          >
            <span className="math-font">+</span>
            {showPlus ? <span role="tooltip" className="show-plus">Click to Enlarge this Image </span> : null}
          </button>
        )
        : null}
    </li>
  );
};

LocallyServedImage.propTypes = {
  image: PropTypes.shape(),
  topWidthness: PropTypes.number,
  flexDirection: PropTypes.string,
  showTitles: PropTypes.bool,

};

export default LocallyServedImage;
