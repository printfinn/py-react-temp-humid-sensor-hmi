import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [temperature, setTemperature] = useState("00")
  const [humidity, setHumidity] = useState("00")

  useEffect(() => {
    const queryInterval = setInterval(() => {
      fetch("http://127.0.0.1:5000", {mode: "cors"})
      .then((response) => response.json())
      .then((result) => {
        setTemperature(Math.round(result["temperature"]))
        setHumidity(Math.round(result["humidity"]))
      })
      .catch((error) => {
        setTemperature("00")
        setHumidity("00")
      })
    }, 3000);

    return () => clearInterval(queryInterval);
  }, []);
  
  return (
    <>
      <Humidity humidity={humidity} />
      <Midbar humidity={humidity} />
      <Temperature temperature={temperature} />
    </>
  )
}

function Humidity( {humidity} ) {
  return(
    <>
      <div className="h-100">
        <div className="range">
          <div className="range-elem">
            <div>high</div>
            <div className="range-value">65</div>
            <div>24 hrs</div>
          </div>
          <div className="range-elem">
            <div className="range-value">61</div>
            <div>low</div>
          </div>
        </div>
        <div className="sensor-num">
          {humidity}
        </div>
        <div className="trend">
          <div className="trend-mark">%</div>
          <div className="trend-label">→</div>
          <div className="trend-text">trend</div>
        </div>
      </div>
    </>
  )
}

function Midbar( {humidity} ) {
  return(
    <>
      <div className="mid-bar">
        <div className="bar-cursor" 
             style={{left: `calc(${humidity}% - 24px)`}}>
        </div>
        <div className="low"></div>
        <div className="mid"></div>
        <div className="high"></div>
      </div>
      <div className="mid-bar-text">
        <span>LOW</span>
        <div className="mid-bar-center">
          <span>30%</span>
          <span className="mid-bar-text-large">OK</span>
          <span>50%</span>
        </div>  
        <span>HIGH</span>
      </div>
    </>
  )
}

function Temperature( {temperature} ) {
  return(
    <>
      <div className="h-100">
        <div className="range">
          <div className="range-elem">
            <div>high</div>
            <div className="range-value">5</div>
          </div>
          <div className="range-elem">
            <div className="range-value">61</div>
            <div>low</div>
          </div>
        </div>
        <div className="sensor-num">
          {temperature}
        </div>
        <div className="trend">
          <div className="trend-mark">°C</div>
          <div className="trend-label">→</div>
          <div className="trend-text">trend</div>
        </div>
      </div>
    </>
  )
}
export default App
