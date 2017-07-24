import React from "react"
import ReactDOM from "react-dom"
import {Legend} from "../src/index.jsx"


class ExampleApp extends React.Component {

  render(){
    return(
      <div>
        <Legend />
      </div>
    )
  }
}

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
