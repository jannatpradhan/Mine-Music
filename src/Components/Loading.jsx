import React from 'react';
import { PuffLoader } from 'react-spinners';

const Spinner=(props)=> {
    
    return (
      <div className='sweet-loading'>
        <PuffLoader
          color="white" 
          loading={props.loadValue} 
        />
      </div>
    )
  
}

export default Spinner;