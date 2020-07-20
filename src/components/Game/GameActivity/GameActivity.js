import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './GameActivity.module.css';
import Activity from './Activity/Activity';

function GameActivity({ activities }) {
  const scrollBottomRef = useRef();

  useEffect(() => {
    scrollBottomRef.current.scrollIntoView();
  });

  const renderActivities = () => {
    return activities.map((data, index) => <Activity key={index} text={data.text} />);
  };

  return (
    <div className={styles.gameActivity}>
      {renderActivities()}
      <div ref={scrollBottomRef} />
    </div>
  );
}

const mapStateToProps = state => {
  return { activities: state.game.data.gameStatus.activities };
};

export default connect(mapStateToProps)(GameActivity);
