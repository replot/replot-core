import React from "react"

class Tooltip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0
    }
  }

  updateHeight(node) {
    if (node && node.offsetHeight !== this.state.height) {
      this.setState({ height: node.offsetHeight })
    }
  }

  render() {
    if (!this.props.active) {
      return null
    }

    let width = 200
    let leftMax = window.innerWidth - width


    const coloring = {}
    switch(this.props.colorScheme){
      case "light":
        coloring.backgroundColor = "#ffffff"
        coloring.borderColor = "#DCDCDC"
        coloring.fontColor = "#000000"
        break
      case "dark":
        coloring.backgroundColor = "#181818"
        coloring.borderColor = "#585858"
        coloring.fontColor = "#ffffff"
        break
      default:
        coloring.backgroundColor = this.props.backgroundColor
        coloring.borderColor = this.props.borderColor
        coloring.fontColor = this.props.fontColor
        break
    }


    const style = {
      outer: {
        zIndex: "1",
        position: "absolute",
      },
      inner: {
        display: "inline-block",
        position: "absolute",
        width: width,
        textAlign: "center",
        padding: this.props.padding,
        backgroundColor: coloring.backgroundColor,
        border: "1px solid",
        borderColor: coloring.borderColor,
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.25)",
        color: coloring.fontColor,
      },
      svgWrapper: {
        display: "inline-block",
        position: "absolute",
      },
      triangle: {
        fill: coloring.borderColor,
        stroke: coloring.borderColor,
        strokeWidth: "1"
      },
    }


    let svgHeight
    let svgWidth
    let svgStyle
    let transform

    if (this.props.align === "top" || this.props.align === "bottom") {
      style.outer.width = width
      style.outer.height = this.state.height + 5
      style.outer.left = Math.min(leftMax, Math.max(0, this.props.x - width/2))
      style.svgWrapper.width = width
      style.svgWrapper.height = 5
      style.svgWrapper.textAlign = "center"
      svgHeight = 5
      svgWidth = 10
    } else { /* this.props.align === "right" or "left" */
      style.outer.width = width + 5
      style.outer.height = this.state.height
      style.outer.top = this.props.y - this.state.height/2
      style.inner.top = 0
      style.svgWrapper.width = 5
      style.svgWrapper.height = this.state.height
      svgHeight = 10
      svgWidth = 5
      svgStyle = {
        position: "absolute",
        top: this.state.height/2 - 5
      }
    }

    switch(this.props.align) {
      case "top":
        style.outer.bottom = window.innerHeight - this.props.y
        style.inner.top = 0
        style.svgWrapper.bottom = 0
        break
      case "bottom":
        style.outer.top = this.props.y
        style.inner.bottom = 0
        style.svgWrapper.top = 0
        transform = "rotate(180,5,5) translate(0,5)"
        break
      case "right":
        style.outer.left = Math.min(leftMax, Math.max(0, this.props.x))
        style.inner.right = 0
        style.svgWrapper.left = 0
        transform = "rotate(90,5,5) translate(0,5)"
        break
      case "left":
        style.outer.left = Math.min(leftMax, Math.max(0, this.props.x - width))
        style.inner.left = 0
        style.svgWrapper.right = 0
        transform = "rotate(270,5,5)"
        break
      default:
        console.log("invalid align argument")
        return null
    }

    return (
      <div style={style.outer}>
        <div ref={(node) => this.updateHeight(node)} style={style.inner}>
          {this.props.contents}
        </div>
        <div style={style.svgWrapper}>
          <svg height={svgHeight} width={svgWidth} style={svgStyle}>
            <polygon points="0,0 5,5 10,0" style={style.triangle}
              transform={transform}/>
          </svg>
        </div>
      </div>
    )
  }
}

Tooltip.defaultProps = {
  width: 200,
  padding: 10,
  backgroundColor: "#181818",
  fontColor: "#ffffff",
  borderColor: "#585858",
  active: true,
  align: "top"
}

export default Tooltip
