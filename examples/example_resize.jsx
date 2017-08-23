import React from "react"
import ReactDOM from "react-dom"
import {Resize} from "../src/index.jsx"


class ExampleApp extends React.Component {

  render(){
    return(
      <div>
        <Resize width="50%">
          <svg>
            <rect x={0} y={0} width={2000} height={100} />
          </svg>
        </Resize>
      </div>
    )
  }
}

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
