import React from 'react';
import styles from './Map.module.css';
import map from '../../assets/map.jpg';

function Map(props) {
  return (
    <div className={styles.Map}>
      <img src={map} alt="map" draggable={false} />
    </div>
  );
}

export default Map;
