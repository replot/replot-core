import React from "react"
import ReactDOM from "react-dom"
import {Legend} from "../src/index.jsx"


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
        Antarctica: "#fc6000"}
    }
  }

  render(){
    return(
      <div>
        <Legend values={this.state.values} width={700}/>
      </div>
    )
  }
}

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
