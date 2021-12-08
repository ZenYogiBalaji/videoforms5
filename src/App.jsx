import "./App.css";
import WebCamRecorder from "./WebCamRecorder";
import FileUploader from "./Upload2Sever";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebCamRecorder />
      </header>
    </div>
  );
}

export function Appup() {
  return (
    <div className="App">
      <header className="App-header">
        <FileUploader />
      </header>
    </div>
  );
}

export default App;
