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
        Antarctica: "#fc6000",
        // test1: "blue",
        // test2: "red",
        // test3: "green",
        // test4: "blue",
        // test5: "red",
        // test6: "green",
        // test7: "blue",
        // test8: "red",
        // test9: "green",
        // test10: "blue",
        // test11: "red",
        // test12: "green"
}
    }
  }

  render(){
    return(
      <div>
        <svg width={600} height={200}>
          <Legend values={this.state.values}/>
        </svg>
        <svg width={200} height={200}>
          <Legend values={this.state.values} mode="stack" />
        </svg>
        <svg width={200} height={200}>
          <Legend values={this.state.values} mode="stack" showBorder={false} backgroundColor="#1b1b1b" fontColor="#ffffff"/>
        </svg>
      </div>
    )
  }
}

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
