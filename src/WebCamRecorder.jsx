import { useEffect, useRef, useState } from "react";
import React from "react";
import FileUpload2 from "./FileUpload2";
import axios from "axios";
import Webcam from "webcam";

function WebCamRecorder(){ 
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const streamRef = useRef<null | MediaStream>(null);
  const [downloadLink, setDownloadLink] = useState("");
  const streamRecorderRef = useRef<null | MediaRecorder>(null);
  const [audioSource] = useState<string>("");
  const [videoSource, setVideoSource] = useState<string>("");

   [audioSourceOptions, setAudioSourceOptions] = useState<
    Record<string, string>   ([]);
   cons[videoSourceOptions, setVideoSourceOptions] = useState<
    Record<string, string>([]);
  
   [error, setError] = useState<null | Error>(null);
  chunks = useRef([]);

  function startRecording() {
    if (isRecording) {
      return;
    }
    if (!streamRef.current) {
      return;
    }
    streamRecorderRef.current = new MediaRecorder(streamRef.current);
    streamRecorderRef.current.start();
    streamRecorderRef.current.ondataavailable = function (event: BlobEvent) {
      if (chunks.current) {
        chunks.current.push(event.data);
      }
    };
    setIsRecording(true);
  }

  useEffect(
    function () {
      if (isRecording) {
        return;
      }
      if (chunks.current.length === 0) {
        return;
      }
      const blob = new Blob(chunks.current, {
        type: "video/x-matroska;codecs=avc1,opus"
      });
      vblob = blob;
      setDownloadLink(URL.createObjectURL(blob));
      chunks.current = [];
    },
    [isRecording]
  );

  function stopRecording() {
    if (!streamRecorderRef.current) {
      return;
    }
    streamRecorderRef.current.stop();
    setIsRecording(false);
  }

  useEffect(function () {
    async function prepareStream() {
      function gotStream(stream: MediaStream) {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }

      async function getStream() {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
          });
        }
        const constraints = {
          audio: {
            deviceId: audioSource !== "" ? { exact: audioSource } : undefined
          },
          video: {
            deviceId: videoSource !== "" ? { exact: videoSource } : undefined
          }
        };
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          gotStream(stream);
        } catch (error) {
          setError(error);
        }
      }

      function getDevices() {
        return navigator.mediaDevices.enumerateDevices();
      }

      function stopRecording(): void {
        if (!streamRecorderRef.current) {
          return;
        }
        streamRecorderRef.current.stop();
        setIsRecording(false);
      }

      function gotDevices(deviceInfos: MediaDeviceInfo[]) {
        const audioSourceOptions = [];
        const videoSourceOptions = [];
        for (const deviceInfo of deviceInfos) {
          if (deviceInfo.kind === "audioinput") {
            audioSourceOptions.push({
              value: deviceInfo.deviceId,
              label: deviceInfo.label || `Microphone ${deviceInfo.deviceId}`
            });
          } else if (deviceInfo.kind === "videoinput") {
            videoSourceOptions.push({
              value: deviceInfo.deviceId,
              label: deviceInfo.label || `Camera ${deviceInfo.deviceId}`
            });
          }
        }
        setAudioSourceOptions(audioSourceOptions);
        setVideoSourceOptions(videoSourceOptions);
      }

      await getStream();
      const mediaDevices = await getDevices();
      gotDevices(mediaDevices);
    }
    prepareStream();
  }, []);
  return (
    <div>
      <div>
        <select id="videoSource" name="videoSource" value={videoSource}>
          {videoSourceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select id="audioSource" name="audioSource" value={audioSource}>
          {audioSourceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <video ref={videoRef} autoPlay muted playsInline></video>
      </div>
      <div>
        {downloadLink && <video src={downloadLink} controls></video>}
        {downloadLink && (
          <a href={downloadLink} download="file.mp4">
            Download Video
          </a>
        )}
      </div>

      <button onClick={startRecording} enabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} enabled={!isRecording}>
        Stop Recording
      </button>
      <button onClick={fileup} enabled={!isRecording}>
        Upload
      </button>
    </div>
  );
}

function fileup(): void {
  alert("Entering to Launch Pad");
  alert(URL.createObjectURL(vblob));

  const formData = new FormData();

  // Update the formData object
  formData.append("file2upload", vblob);

  // Details of the uploaded file
  console.log(vblob);

  // Request made to the backend api
  // Send formData object
  axios.post("https://balaji.today/upload4.php", formData);

  alert(URL.createObjectURL(vblob) + "uploaded ");
}

export default WebCamRecorder;
