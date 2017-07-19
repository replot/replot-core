import React from "react"
import LoadingIcon from "./LoadingIcon.jsx"


class Resize extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      width: parseInt(this.props.children.props.width),
      resizing: false
    }
  }

  parseWidth(width){
    if (typeof(width) == "number" || width.includes("px")){
      return {dynamic: false, scale: 1}
    } else if (width.includes("%")) {
      return {dynamic: true, scale: parseInt(width) / 100}
    }
  }

  componentDidMount() {
    if (this.parseWidth(this.props.children.props.width).dynamic) {
      this.updateDimensions(this.elem.parentNode)
      window.addEventListener("resize", this.resize.bind(this, this.elem.parentNode))
    }
  }

  resize(comp) {
    this.setState({
      resizing: true
    })
    var updateFunction
    clearTimeout(updateFunction)
    updateFunction = setTimeout(this.updateDimensions.bind(this, comp), 1200)
  }

  updateDimensions(comp) {
    this.setState({
      resizing: false,
      width: comp.clientWidth * this.parseWidth(this.props.children.props.width).scale
    })
  }

  render() {
    if (this.state.resizing) {
      return (
        <div>
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
}

export default Resize
