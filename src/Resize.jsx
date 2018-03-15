import React from "react"
import LoadingIcon from "./LoadingIcon.jsx"


class Resize extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      width: parseInt(this.props.width),
      resizing: false
    }
  }

  parseWidth(width) {
    if (typeof(width) === "number" || !width.includes("%")) {
      return {dynamic: false, scale: 1}
    } else {
      return {
        dynamic: true,
        scale: parseInt(width) / 100
      }
    }
  }

  resize() {
    if (this.parseWidth(this.props.width).dynamic) {
      let newWidth = this.elem.parentNode.clientWidth * parseInt(this.props.width) / 100
      if (this.state.width === newWidth) {
        return
      }
      this.setState({
        resizing: true,
        width: newWidth
      })
      var updateFunction
      clearTimeout(updateFunction)
      updateFunction = setTimeout(this.updateDimensions.bind(this), 1200)
    }
  }

  updateDimensions() {
    this.setState({
      resizing: false,
      width: this.elem.parentNode.clientWidth * parseInt(this.props.width) / 100
    })
  }

  render() {
    if (this.state.resizing) {
      return (
        <div ref={(comp) => {this.elem = comp}}>
          <LoadingIcon width={this.state.width}/>
        </div>
      )
    }

    let child = React.cloneElement(this.props.children, {width: this.state.width})

    return (
      <div ref={(comp) => {this.elem = comp}} style={{width: `${this.state.width}px`}}>
        {child}
      </div>
    )
  }

  componentDidMount() {
    if (this.parseWidth(this.props.width).dynamic) {
      this.setState({
        width: this.elem.parentNode.clientWidth * parseInt(this.props.width) / 100
      })
    }
    this.listener = this.resize.bind(this)
    window.addEventListener("resize", this.listener)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      if (this.parseWidth(nextProps.width).dynamic) {
        this.setState({
          width: ((this.elem.parentNode.clientWidth * parseInt(nextProps.width) / 100) > 0
            ? this.elem.parentNode.clientWidth * parseInt(nextProps.width) / 100
            : 1)
        })
      } else {
        this.setState({width: parseInt(nextProps.width)})
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.listener)
  }

}

export default Resize
