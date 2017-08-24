import React from "react"
import ReactDOM from "react-dom"
import Axis from "../src/Axis.jsx"


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
        <br></br>
        <svg width={400} height={400}>
          <Axis graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" xStart="origin" labels={["one", "two", "red", "blue", "meme"]}/>
        </svg>
        <br></br>
        <svg width={400} height={400}>
          <Axis graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            minY={10} maxY={100000} yScale="log" xAxisMode="continuous" minX={10} maxX={100000}/>
        </svg>
        <br></br>
        <svg width={400} height={400}>
          <Axis graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            showXAxisLine={false} showYLabels={false}/>
        </svg>
        <br></br>
        <svg width={400} height={400}>
          <Axis graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            axisStyle={style}/>
        </svg>
        <br></br>
        <svg width={600} height={400}>
          <Axis width={600} graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            legendValues={values}/>
        </svg>
        <br></br>
        <svg width={600} height={400}>
          <Axis width={600} graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            legendValues={values} legendMode="stack-outside"/>
        </svg>
        <br></br>
        <svg width={400} height={400}>
          <Axis graphTitle="A title!" yTitle="Y Axis!" xTitle="X Title!" labels={["one fish", "two fish", "red fish", "blue fish"]}
            minY={0.0001} maxY={1.0} yScale="log" xAxisMode="continuous" minX={0.00001} maxX={10}/>
        </svg>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
