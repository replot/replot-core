import React from "react"


class Resize extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      dynamic: false,
      resizing: false,
      width: 400,
      scale: 1
    }
    if (typeof(this.props.children.props.width) == "number" || this.props.children.props.width.includes("px")){
      this.state.width = parseInt(this.props.children.props.width)
    } else if (this.props.children.props.width.includes("%")) {
      this.state.dynamic = true
      this.state.scale = parseInt(this.props.children.props.width) / 100
    }
  }

  componentDidMount() {
    if (this.state.dynamic) {
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
      width: comp.clientWidth * this.state.scale
    })
  }

  render() {
    if (this.state.resizing) {
      return (
        <div>
          <p style={{fontSize: "50px", verticalAlign: "middle", display: "inline-block"}}>Resizing</p>
        </div>
      )
    }

    let newChild = React.cloneElement(this.props.children, {width: this.state.width})

    return (
      <div ref={(comp) => {this.elem = comp}} style={{width: `${this.state.width}px`}}>
        {newChild}
      </div>
    )
  }
}

export default Resize
