import React from "react"
import LoadingIcon from "./LoadingIcon.jsx"


class Resize extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      resizing: false
    }
  }

  parseWidth(width){
    if (typeof(width) === "number" || !width.includes("%")) {
      return {dynamic: false, scale: 1}
    }
    else {
      return {dynamic: true, scale: parseInt(width) / 100}
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this))
  }

  resize() {
    if (this.parseWidth(this.props.width).dynamic){
      this.setState({
        resizing: true
      })
      var updateFunction
      clearTimeout(updateFunction)
      updateFunction = setTimeout(this.updateDimensions.bind(this), 1200)
    }
  }

  updateDimensions() {
    this.setState({
      resizing: false
    })
  }

  render() {
    let width
    if (!this.parseWidth(this.props.width).dynamic) {
      width = parseInt(this.props.width)
    } else {
      width = this.elem.parentNode.clientWidth * this.parseWidth(this.props.width).scale
    }

    if (this.state.resizing) {
      return (
        <div ref={(comp) => {this.elem = comp}}>
          <LoadingIcon width={width}/>
        </div>
      )
    }

    let child = React.cloneElement(this.props.children, {width: width})

    return (
      <div ref={(comp) => {this.elem = comp}} style={{width: `${width}px`}}>
        {child}
      </div>
    )
  }

}

export default Resize
