import React from "react"
import ReactDOM from "react-dom"
import {Tooltip} from "../src/index.jsx"

class AlignSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: "top"
    }
  }

  changeHandler(e) {
    this.setState({
      selected: e.target.value
    })
    this.props.updateAlign(e.target.value)
  }

  render() {
    const style = {
      cell: {
        width: "80px"
      }
    }

    return (
      <table>
        <tbody>
          <tr>
            <td style={style.cell} >
              <label>
                <input type="radio" value="top"
                  checked={this.state.selected==="top"}
                  onChange={this.changeHandler.bind(this)} />
                Top
              </label>
            </td>
            <td style={style.cell} >
              <label>
                <input type="radio" value="bottom"
                  checked={this.state.selected==="bottom"}
                  onChange={this.changeHandler.bind(this)}/>
                Bottom
              </label>
            </td>
            <td style={style.cell} >
              <label>
                <input type="radio" value="left"
                  checked={this.state.selected==="left"}
                  onChange={this.changeHandler.bind(this)} />
                Left
              </label>
            </td>
            <td style={style.cell} >
              <label>
                <input type="radio" value="right"
                  checked={this.state.selected==="right"}
                  onChange={this.changeHandler.bind(this)} />
                Right
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

class ExampleApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      align: "top",
      mouseOver: false,
      mouseX: null,
      mouseY: null,
      divColor: null
    }
  }

  activateTooltip(refName) {
    this.setState(
      {
        mouseOver: true,
        divColor: refName
      }
    )
  }

  deactivateTooltip() {
    this.setState(
      {
        mouseOver: false
      }
    )
  }

  updateAlign(align) {
    this.setState({align: align})
  }

  updateMousePos(e) {
    this.setState({ mouseX: e.pageX, mouseY: e.pageY })
  }

  render() {
    const style = {
      divRed: {
        position: "absolute",
        left: 200,
        top: 200,
        width: 100,
        height: 200,
        backgroundColor: "red"
      },
      divBlue: {
        position: "absolute",
        left: 400,
        top: 400,
        width: 200,
        height: 200,
        backgroundColor: "blue"
      },
      divGreen: {
        position: "absolute",
        left: 700,
        top: 200,
        width: 300,
        height: 100,
        backgroundColor: "green"
      }
    }

    let contents = <h1>Hello!<br/>I'm {this.state.divColor}</h1>

    let tooltipX
    let tooltipY

    switch(this.state.align) {
      case "top":
        tooltipX = this.state.mouseX
        tooltipY = this.state.mouseY - 8
        break
      case "bottom":
        tooltipX = this.state.mouseX
        tooltipY = this.state.mouseY + 8
        break
      case "left":
        tooltipX = this.state.mouseX - 8
        tooltipY = this.state.mouseY
        break
      case "right":
        tooltipX = this.state.mouseX + 8
        tooltipY = this.state.mouseY
        break
      default:
        console.log("invalid align argument")
        return null
      }

    return(
      <div onMouseMove={this.updateMousePos.bind(this)}>
        <Tooltip
          x={tooltipX} y={tooltipY} align={this.state.align}
          active={this.state.mouseOver} contents={contents}
        />
        <AlignSwitch updateAlign={this.updateAlign.bind(this)} />
        <div ref="red" style={style.divRed}
          onMouseOver={this.activateTooltip.bind(this,"red")}
          onMouseOut={this.deactivateTooltip.bind(this)}>
        </div>
        <div ref="blue" style={style.divBlue}
          onMouseOver={this.activateTooltip.bind(this,"blue")}
          onMouseOut={this.deactivateTooltip.bind(this)}>
        </div>
        <div ref="green" style={style.divGreen}
          onMouseOver={this.activateTooltip.bind(this,"green")}
          onMouseOut={this.deactivateTooltip.bind(this)}>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
