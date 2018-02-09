import React from "react"
import ReactDOM from "react-dom"
import {Legend} from "../index.js"


class ExampleApp extends React.Component {

  constructor(){
    super()
    this.state = {
      values: {
        Global: "#4cab92",
        US: "#ca0004",
        India: "#8e44ad",
        China: "#9dbd5f",
        Russia: "#005c7a",
        Antarctica: "#fc6000",
      },
      gradientValues: {
        Global: ["#4cab92", "#ffffff"],
        US: ["#ca0004", "#ffffff"],
        India: ["#8e44ad", "#ffffff"],
        China: ["#9dbd5f", "#ffffff"],
        Russia: ["#005c7a", "#ffffff"],
        Antarctica: ["#fc6000", "#ffffff"]
      }
    }
  }

  render(){
    return(
      <div>
        <svg width={600} height={200}>
          <Legend values={this.state.values} />
        </svg>
        <svg width={200} height={200}>
          <Legend values={this.state.values} mode="stack" />
        </svg>
        <svg width={200} height={200}>
          <Legend values={this.state.values} mode="stack" showBorder={false} backgroundColor="#1b1b1b" fontColor="#ffffff"/>
        </svg>
        <svg width={200} height={200}>
          <Legend values={this.state.gradientValues} mode="stack" showBorder={false} backgroundColor="#1b1b1b" fontColor="#ffffff" gradient={true}/>
        </svg>
        <svg width={600} height={200}>
          <Legend values={this.state.values} shape="circle" showTitle={true} legendTitle="Countries" />
        </svg>
        <svg width={200} height={200}>
          <Legend values={this.state.values} mode="stack" shape="circle" showTitle={true} legendTitle="Countries" />
        </svg>
        <svg width={200} height={200}>
          <Legend values={this.state.values} mode="stack" shape="circle" showBorder={false} backgroundColor="#1b1b1b" fontColor="#ffffff"/>
        </svg>
      </div>
    )
  }
}

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
