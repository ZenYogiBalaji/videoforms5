/* eslint-disable no-unused-vars */
import React from "react";
import Webcam from "react-webcam";
import axios from "axios";



    const WebcamStreamCapture = () => 
    {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

      var mediablob = new Blob();
  

    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
     
     
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });

      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);


    // DOWNLOAD
  
    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
         const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });

     
        mediablob = blob;

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "react-webcam-stream-capture.webm";
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);

    //Upload 
    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
           const mediablob = new Blob(recordedChunks, {
            type: "video/webm"
          });
         
          const url = URL.createObjectURL(mediablob);
          const formData = new FormData();
  
          // Update the formData object
          formData.append("file2upload", mediablob);
        
          // Details of the uploaded file
          console.log(mediablob);
        
           window.URL.creaeObjectURL(url) ;
          // Request made to the backend api
          // Send formData object
          axios.post("https://balaji.today/upload4.php", formData);
      
        
          alert(URL.createObjectURL(mediablob) + "-------------------------Uploaded------------ ");
          alert(mediablob.size);
          alert(mediablob.type);
  
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
           a.click();
          window.URL.revokeObjectURL(url);
          setRecordedChunks([]);
        }
      }, [recordedChunks]);
  
    return (
      <>
        <Webcam audio={false} ref={webcamRef} />
        
        {capturing ? 
        (
          <button onClick={handleStopCaptureClick}>Stop Recording</button>
        
        ) :
         (
          <button onClick={handleStartCaptureClick}>Start Recording</button>
        )}

    If capturing false
    {
        (<button onClick={fileup}>Upload </button>)
    }

        {recordedChunks.length > 0 && (
          <button onClick={handleDownload}>Download</button>
        )}
      </>
    );


  
  function fileup(): void {
    alert("Entering to Upload ");

    if  (recordedChunks.length !==0)
    {
       
            alert(URL.createObjectURL(mediablob));
       
     }

    
  
    const formData = new FormData();
  
    // Update the formData object
    formData.append("file2upload", mediablob);
  
    // Details of the uploaded file
    console.log(mediablob);
  
     window.URL.creaeObjectURL(url) ;
    // Request made to the backend api
    // Send formData object
    axios.post("https://balaji.today/upload4.php", formData);

  
    alert(URL.createObjectURL(mediablob) + "-------------------------Uploaded------------ ");
    alert(mediablob.size);
    alert(mediablob.type);

  }
  
};
  
export default WebcamStreamCapture;