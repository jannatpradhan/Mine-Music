import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Spinner=(props)=> {
    
    return (
      <div className='sweet-loading'>
        <PacmanLoader
          color="#7836d6" 
          loading={props.loadValue} 
        />
      </div>
    )
  
}

export default Spinner;