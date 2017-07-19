import React from "react"
import ReactDOM from "react-dom"
import {LoadingIcon} from "../src/index.jsx"


class ExampleApp extends React.Component {

  render(){
    return(
      <div>
        <LoadingIcon/>
      </div>
    )
  }
}

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
