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
    if (typeof(width) === "number") {
      return {dynamic: false, scale: 1}
    }
    else if (width.includes("%")){
      return {dynamic: true, scale: parseInt(width) / 100}
    }
    else {
      return {dynamic: false, scale: 1}
    }
  }

  componentDidMount() {
    if (this.parseWidth(this.props.children.props.width).dynamic) {
      this.updateDimensions(this.props.children.props.width, this.elem.parentNode)
      window.addEventListener("resize", this.resize.bind(this, this.elem.parentNode))
    }
  }

  resize(comp) {
    this.setState({
      resizing: true
    })
    var updateFunction
    clearTimeout(updateFunction)
    updateFunction = setTimeout(this.updateDimensions.bind(this, this.props.children.props.width, comp), 1200)
  }

  updateDimensions(width, comp) {
    this.setState({
      resizing: false,
      width: (this.parseWidth(width).dynamic ? comp.clientWidth * this.parseWidth(width).scale : parseInt(width))
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

  componentWillReceiveProps(nextProps){
    if (this.parseWidth(nextProps.children.props.width).dynamic){
      this.updateDimensions(nextProps.children.props.width, this.elem.parentNode)
      window.addEventListener("resize", this.resize.bind(this, this.elem.parentNode))
    } else {
      window.removeEventListener("resize", this.resize.bind(this, this.elem.parentNode)) //This appears to do nothing
      this.setState({width: parseInt(nextProps.children.props.width)})
    }
  }
}

export default Resize
