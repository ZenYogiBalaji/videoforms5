import "./App.css";
import FileUploader from "./Upload2Sever";
import { useState } from "react";
import WebcamStreamCapture from   "./Recorder";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebcamStreamCapture />
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
