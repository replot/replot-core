import React from "react"
import ReactDOM from "react-dom"
import {Axis, YAxis, XAxisDiscrete, XAxisContinuous} from "../src/Axis.jsx"


class ExampleApp extends React.Component {

  render(){
    const style = {
      axisColor: "#f17e33",
      labelColor: "blue",
      titleColor: "rgb(0,255,0)",
      gridColor: "#123456",
      lineWidth: 5,
      lineOpacity: .5
    }
    const values = {
      Global: "#4cab92",
      US: "#ca0004",
      India: "#8e44ad",
      China: "#9dbd5f",
      Russia: "#005c7a",
      Antarctica: "#fc6000"
    }

    return(
      <div>
        <svg width={400} height={400}>
          <Axis/>
        </svg>
        <svg width={400} height={400}>
          <Axis graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}/>
        </svg>
        <svg width={400} height={400}>
          <Axis graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            minY={10} maxY={100000} yScale="log" xAxisMode="continuous" minX={10} maxX={100000}/>
        </svg>
        <svg width={400} height={400}>
          <Axis graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            showXAxisLine={false} showYLabels={false}/>
        </svg>
        <svg width={400} height={400}>
          <Axis graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            axisStyle={style}/>
        </svg>
        <svg width={600} height={400}>
          <Axis width={600} graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            legendValues={values}/>
        </svg>
        <svg width={600} height={400}>
          <Axis width={600} graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            legendValues={values} legendMode="stack-outside"/>
        </svg>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)