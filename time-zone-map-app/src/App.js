import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MapChart from "./core/map/MapChart";
import ReactTooltip from "react-tooltip";

function App() {
  const [content, setContent] = useState("");
  return (
    <div className="App">
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>

    </div>
  );
}

export default App;
