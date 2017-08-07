import React from "react"
import ReactDOM from "react-dom"
import {LoadingIcon} from "../src/index.jsx"


class ExampleApp extends React.Component {

  render(){
    return(
      <div>
        <LoadingIcon/>
        <LoadingIcon width={500}/>
        <LoadingIcon width={500} color="#f17e33"/>
      </div>
    )
  }
}

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
