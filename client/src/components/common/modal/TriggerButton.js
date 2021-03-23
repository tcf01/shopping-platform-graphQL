import React from 'react';
import { ReactComponent as Lock } from '../../../assets/img/lock.svg'

import './triggerButton.scss'

const TriggerButton = ({ triggerText, handleOnClick }) => {

  return (
    <div className='login-button-wrapper' onClick={handleOnClick} >
      <div className="inner-wrapper">
        <div className="text">
          {triggerText}
        </div>
        <div className='trigger-button' >
          <Lock />
        </div >
      </div>
    </div >
  );
};
export default TriggerButton;
