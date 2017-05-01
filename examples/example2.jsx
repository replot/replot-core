import React from "react"
import ReactDOM from "react-dom"
import Tooltip from "../src/index.jsx"

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
      divX: null,
      divY: null,
      divColor: null
    }
  }

  activateTooltip(refName,event) {
    this.setState(
      {
        mouseOver: true,
        divX: this.refs[refName].offsetWidth/2 + this.refs[refName].offsetLeft,
        divY: this.refs[refName].offsetHeight/2 + this.refs[refName].offsetTop,
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

    return(
      <div>
        <Tooltip
          x={this.state.divX} y={this.state.divY} align={this.state.align}
          active={this.state.mouseOver} contents={contents}
        />
        <AlignSwitch updateAlign={this.updateAlign.bind(this)} />
        <div ref="red" style={style.divRed}
          onMouseEnter={this.activateTooltip.bind(this,"red")}
          onMouseLeave={this.deactivateTooltip.bind(this)}>
        </div>
        <div ref="blue" style={style.divBlue}
          onMouseEnter={this.activateTooltip.bind(this,"blue")}
          onMouseLeave={this.deactivateTooltip.bind(this)}>
        </div>
        <div ref="green" style={style.divGreen}
          onMouseEnter={this.activateTooltip.bind(this,"green")}
          onMouseLeave={this.deactivateTooltip.bind(this)}>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
