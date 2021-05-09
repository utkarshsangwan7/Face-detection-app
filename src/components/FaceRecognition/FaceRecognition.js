import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({ImageUrl,Box}) => {
    return(
      <div className='center ma'>
          <div className='absolute mt2'>
            <img id='inputImage' alt='' src={ImageUrl} width='500px' heigh='auto'/>
            <div className='bounding-box' style={{top:Box.top_row,right:Box.right_col,bottom:Box.bottom_row,left:Box.left_col}}></div>
          </div>
      </div>
    );
}

export default FaceRecognition;