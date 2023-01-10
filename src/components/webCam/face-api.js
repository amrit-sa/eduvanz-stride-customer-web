import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import * as tf from '@tensorflow/tfjs';
import draw , { checkDetection } from './utilities'

const videoConstraints = {
  width:640,
  height:480,
  facingMode: "user"
};

function WebCam(props) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const blazeface = require('@tensorflow-models/blazeface')
  const [btnEnable, setBtnEnable] = useState(false);
   

  const runFacedetection = async () => {

    const model = await blazeface.load()
   // console.log("FaceDetection Model is Loaded..") 
    setInterval(() => {
      detect(model);
    }, 100);
 
}

const returnTensors = false;

  const detect = async (model) => {
      if(
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null &&
          webcamRef.current.video.readyState === 4
        ){
          // Get video properties
          const video = webcamRef.current.video;
          const videoWidth = webcamRef.current.video.videoWidth;
          const videoHeight = webcamRef.current.video.videoHeight;
     
          //Set video height and width
          webcamRef.current.video.width = videoWidth;
          webcamRef.current.video.height = videoHeight;
     
          //Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

          // Make detections

          const prediction = await model.estimateFaces(video, returnTensors);

          //  console.log(prediction)
          let checkface = checkDetection(prediction);
          if(checkface ===true)
          {
            setBtnEnable(true);
          }

          if(canvasRef.current !==null)
          {
            const ctx = canvasRef.current.getContext("2d");
            draw(prediction, ctx)
          }
        }

      }

      const capture = React.useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
          props.capturePicture(imageSrc);
          props.closeCamera();
          console.log("imageSrc", imageSrc);
        },
        [webcamRef]
      );

      const handleCanceBtn = () =>{
        props.closeCamera();
      }

     runFacedetection();
   return (
    <div className="text-center mn_height_4">
      <div className='display-flex justify-content-center'>
         <Webcam
          ref={webcamRef}
          videoConstraints={videoConstraints}
          style={{
         //   position: "absolute",
            
         }}
          />
 
         <canvas
          ref={canvasRef}
          style={{
           position: "absolute",
           width:640,
           height:480,
        }}
         />
      </div>
      <div className='row justify-content-center' style={{position:'relative'}}>
        {btnEnable && (
          <button style={{cursor:'pointer'}} type="button" onClick={capture} className="btn btn-default btn_c_1">Capture</button>
        )}
          <button style={{cursor:'pointer'}} type="button" onClick={handleCanceBtn} className="btn btn-default btn_c_1">Cancel</button>
      </div>
    </div>
     
   );
 
}

WebCam.propTypes = {
  ...propTypes,
  closeCamera: PropTypes.func.isRequired,
  capturePicture: PropTypes.func.isRequired,
}

export default reduxForm({form: 'web-cam'})(WebCam);