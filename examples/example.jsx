import React from "react"
import ReactDOM from "react-dom"
import {Tooltip} from "../index.js"

class XPosInput extends React.Component {

  changeHandler(e) {
    this.props.updateXPos(parseInt(e.target.value))
  }

  render() {
    const style = {
      input: {
        width: "80px",
      }
    }

    return(
      <tr>
        <td>X Position</td>
        <td>
          <input style={style.input}
            type="text" value={parseInt(this.props.position)}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }
}

class YPosInput extends React.Component {

  changeHandler(e) {
    this.props.updateYPos(parseInt(e.target.value))
  }

  render() {
    const style = {
      input: {
        width: "80px",
      }
    }

    return(
      <tr>
        <td>Y Position</td>
        <td>
          <input style={style.input}
            type="text" value={parseInt(this.props.position)}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }
}

class ContentInput extends React.Component {

  changeHandler(e) {
    this.props.updateContent(e.target.value)
  }

  render() {
    const style = {
      input: {
        width: "80px",
      }
    }

    return(
      <tr>
        <td>Content</td>
        <td>
          <input style={style.input}
            type="text" value={this.props.content}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }
}

class AlignSwitch extends React.Component {
  constructor(props) {
    super()
    this.state = {
      selected: "bottom"
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
      <tr>
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
            <input type="radio" value="top"
              checked={this.state.selected==="top"}
              onChange={this.changeHandler.bind(this)} />
            Top
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
    )
  }
}

class ActiveSwitch extends React.Component {
  constructor(props) {
    super()
    this.state = {
      active: true
    }
  }

  changeHandler(e) {
    let isActive = (e.target.value === "true")
    this.setState({
      active: isActive
    })
    this.props.updateActive(isActive)
  }

  render() {
    const style = {
      cell: {
        width: "80px",
      }
    }

    return (
      <tr>
        <td style={style.cell} >
          <label>
            <input type="radio" value="true"
              checked={this.state.active}
              onChange={this.changeHandler.bind(this)}/>
            Show
          </label>
        </td>
        <td style={style.cell} >
          <label>
            <input type="radio" value="false"
              checked={!this.state.active}
              onChange={this.changeHandler.bind(this)} />
            Hide
          </label>
        </td>
      </tr>
    )
  }
}

class Properties extends React.Component {

  render() {
    const style = {
      container: {
        width:"30%",
        display:"inline-block",
        verticalAlign: "top",
        padding: "20px",
        backgroundColor: "white",
      }
    }

    return (
      <div className="container" style={style.container}>
        <table>
          <tbody>
            <XPosInput updateXPos={this.props.updateXPos.bind(this)}
              position={this.props.xPos} />
            <YPosInput updateYPos={this.props.updateYPos.bind(this)}
              position={this.props.yPos} />
            <ContentInput updateContent={this.props.updateContent.bind(this)}
              content={this.props.content} />
          </tbody>
          <tbody>
            <AlignSwitch updateAlign={this.props.updateAlign.bind(this)} />
          </tbody>
          <tbody>
            <ActiveSwitch updateActive={this.props.updateActive.bind(this)} />
          </tbody>
        </table>
      </div>
    )
  }
}

const Grids = () => {
  const style = {
    grids: {
      position: "fixed",
      zIndex: "-1",
    }
  }

  let winWidth = window.innerWidth
  let winHeight = window.innerHeight
  let lines = []

  for (let i = 100; i < winWidth; i += 100) {
    lines.push(
      <line x1={i} y1="0" x2={i} y2={winHeight}
        strokeWidth="1" stroke="blue" key={"x"+i} />
    )
  }

  for (let i = 100; i < winHeight; i+= 100) {
    lines.push(
      <line x1="0" y1={i} x2={winWidth} y2={i}
        strokeWidth="1" stroke="blue" key={"y"+i} />
    )
  }

  return(
    <svg width={winWidth} height={winHeight} style={style.grids}>
      <g>{lines}</g>
    </svg>
  )
}

class ExampleApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      xPos: 800,
      yPos: 200,
      content: "Hello World",
      align: "bottom",
      active: true
    }
  }

  updateXPos(position) {
    this.setState({xPos: position})
  }

  updateYPos(position) {
    this.setState({yPos: position})
  }

  updateAlign(align) {
    this.setState({align: align})
  }

  updateActive(active) {
    this.setState({active: active})
  }

  updateContent(content) {
    this.setState({content: content})
  }

  render() {
    return(
      <div className="container" >
        <Grids />
        <h1 style={{textAlign: "center"}}>Tooltip</h1>
        <Properties  xPos={this.state.xPos} yPos={this.state.yPos}
          content={this.state.content}
          updateXPos={this.updateXPos.bind(this)}
          updateYPos={this.updateYPos.bind(this)}
          updateContent={this.updateContent.bind(this)}
          updateAlign={this.updateAlign.bind(this)}
          updateActive={this.updateActive.bind(this)}
        />
        <Tooltip x={this.state.xPos} y={this.state.yPos}
          active={this.state.active} align={this.state.align}
          contents={this.state.content} />
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
