import React from "react"
import PropTypes from "prop-types"
import Humanize from "humanize-plus"
import Legend from "./Legend.jsx"


class Line extends React.Component {

  render() {
    return(
      <g>
        <line
          x1={this.props.x1}
          y1={this.props.y1}
          x2={this.props.x2}
          y2={this.props.y2}
          stroke={this.props.stroke}
          strokeWidth={this.props.strokeWidth}
          opacity={this.props.opacity} />
      </g>
    )
  }

}

Line.defaultProps = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  stroke: "rgb(0,0,0)",
  strokeWidth: 2,
  opacity: 1
}

class YTickLabel extends React.Component {

  render() {
    let printVal
    if (this.props.value < 1 && this.props.value > -1){
      if (this.props.yScale == "lin") {
        printVal = +this.props.value.toFixed(3)
      } else if (this.props.yScale == "log") {
        printVal = +this.props.value.toFixed(5)
      }
    } else if (this.props.value < 1000 && this.props.value > -1000){
      printVal = +this.props.value.toFixed(1)
    } else {
      printVal = Humanize.compactInteger(this.props.value, 1)
    }

    let fontSize = 15

    return (
      <g>
        <text x={this.props.x} y={this.props.y}
          fontSize={fontSize} fill={this.props.color} textAnchor={"end"}>
          {printVal}
        </text>
      </g>
    )
  }

}

class YStep extends React.Component {

  render() {
    let step = []

    step.push(
      <Line key={"tick"+this.props.y}
        x1={this.props.x} y1={this.props.y}
        x2={this.props.x-this.props.length} y2={this.props.y}
        stroke={this.props.tickColor}
        strokeWidth={this.props.tickWidth}
        opacity={this.props.tickOpacity} />
    )
    step.push(
      <YTickLabel key={"label"+this.props.y}
        x={this.props.x-this.props.length-5} y={this.props.y+5} length={this.props.length}
        value={this.props.value} color={this.props.labelColor} />
    )

    return(
      <g>{step}</g>
    )
  }

}

class YAxis extends React.Component {

  render() {
    let yAxis = []

    if (this.props.showYAxisLine) {
      yAxis.push(
        <Line key="yAxisLine" x1={this.props.x} y1={this.props.y}
          x2={this.props.x} y2={this.props.y+this.props.height}
          stroke={this.props.style.axisColor} strokeWidth={this.props.style.lineWidth}
          opacity={this.props.style.lineOpacity}/>
      )
    }

    if (this.props.yTitle) {
      let rotation = "rotate(-90,10,"+String(this.props.y+this.props.height/2)+")"
      yAxis.push(
        <text key="yTitle" x={0} y={this.props.y+this.props.height/2+10}
          fontSize={18} transform={rotation} fill={this.props.style.titleColor}>
          {this.props.yTitle}
        </text>
      )
    }

    let ySpace = this.props.height / (this.props.ySteps - 1)

    for (var i=0; i < this.props.ySteps; i++) {
      let tickPos = this.props.height+this.props.y-i*ySpace

      let yVal = 0
      if (this.props.yScale == "log") {
        if (this.props.minY === 0) {
          let valueRatio = Math.log10(this.props.maxY) / (this.props.ySteps - 1)
          let pow10 = i * valueRatio
          yVal = Math.pow(10, pow10)
        } else {
          let valueRatio = (Math.log10(this.props.maxY) - Math.log10(this.props.minY)) / (this.props.ySteps - 1)
          let pow10 = Math.log10(this.props.minY) + i * valueRatio
          yVal = Math.pow(10, pow10)
        }
      } else {
        yVal = this.props.minY + i*(this.props.maxY-this.props.minY)/(this.props.ySteps-1)
      }
      if (this.props.showYLabels){
        yAxis.push(
          <YStep key={"yStep"+i} x={this.props.x} y={tickPos}
            value={yVal} length={10} labelColor={this.props.style.labelColor}
            tickColor={this.props.style.tickColor}
            tickWidth={this.props.style.tickWidth}
            tickOpacity={this.props.style.tickOpacity}
            showYLabels={this.props.showYLabels}/>
        )
      }

      if (this.props.showGrid) {
        if (i != 0) {
          yAxis.push(
            <Line key={"grid"+i} x1={this.props.x} y1={tickPos}
              x2={this.props.x+this.props.width} y2={tickPos}
              stroke={this.props.style.gridColor}
              strokeWidth={this.props.style.gridWidth}
              opacity={this.props.style.gridOpacity} />
          )
        }
      }
    }

    return(
      <g>{yAxis}</g>
    )
  }

}


YAxis.defaultProps = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  yScale: "lin",
  ySteps: 5,
  showYAxisLine: true,
  showYLabels: true,
  showGrid: true,
  minY: 0,
  maxY: 100,
  style: {
    axisColor: "#000000",
    labelColor: "#000000",
    titleColor: "#000000",
    gridColor: "#DDDDDD",
    gridWidth: 1,
    gridOpacity: 0.5,
    lineWidth: 2,
    lineOpacity: 1,
    tickColor: "#000000",
    tickWidth: 2,
    tickOpacity: 1
  }
}

class XTickLabel extends React.Component {

  render() {
    let printVal
    if (this.props.value < 1 && this.props.value > -1){
      if (this.props.xScale == "lin") {
        printVal = +this.props.value.toFixed(3)
      } else if (this.props.xScale == "log") {
        printVal = +this.props.value.toFixed(5)
      }
    } else if (this.props.value < 1000 && this.props.value > -1000){
      printVal = +this.props.value.toFixed(1)
    } else {
      printVal = Humanize.compactInteger(this.props.value,1)
    }

    let fontSize = 15

    return (
      <g>
        <text x={this.props.x} y={this.props.y+fontSize+5}
          fontSize={fontSize} fill={this.props.color} textAnchor="middle">
          {printVal}
        </text>
      </g>
    )
  }

}

class XStep extends React.Component {

  render() {
    let step = []

    step.push(
      <Line key={"tick"+this.props.x}
        x1={this.props.x} y1={this.props.y}
        x2={this.props.x} y2={this.props.y+this.props.length}
        stroke={this.props.tickColor}
        strokeWidth={this.props.tickWidth}
        opacity={this.props.tickOpacity} />
    )
    step.push(
      <XTickLabel key={"label"+this.props.x}
        x={this.props.x} y={this.props.y+this.props.length}
        value={this.props.value} color={this.props.labelColor} />
    )

    return(
      <g>{step}</g>
    )
  }

}

class XAxisContinuous extends React.Component {

  render() {
    let xAxis = []

    if (this.props.showXAxisLine) {
      xAxis.push(
        <Line key="xAxisLine" x1={this.props.x} y1={this.props.y}
          x2={this.props.x+this.props.width} y2={this.props.y}
          stroke={this.props.style.axisColor} strokeWidth={this.props.style.lineWidth}
          opacity={this.props.style.lineOpacity}/>
      )
    }

    if (this.props.xTitle) {
      xAxis.push(
        <text key="xTitle" textAnchor="middle"
          x={this.props.x + this.props.width/2}
          y={this.props.y + 65}
          fill={this.props.style.titleColor} fontSize={18} >
          {this.props.xTitle}
        </text>
      )
    }

    if (this.props.showXLabels){
      let xSpace = this.props.width / (this.props.xSteps - 1)

      for (let i=0; i < this.props.xSteps; i++) {
        let tickPos = this.props.x + i*xSpace

        let xVal = 0
        if (this.props.xScale == "log") {
          if (this.props.minX === 0) {
            let valueRatio = Math.log10(this.props.maxX) / (this.props.xSteps - 1)
            let pow10 = i * valueRatio
            xVal = Math.pow(10, pow10)
          } else {
            let valueRatio = (Math.log10(this.props.maxX) - Math.log10(this.props.minX)) / (this.props.xSteps - 1)
            let pow10 = Math.log10(this.props.minX) + i * valueRatio
            xVal = Math.pow(10, pow10)
          }
        } else {
          xVal = this.props.minX + i*(this.props.maxX-this.props.minX)/(this.props.xSteps-1)
        }
        xAxis.push(
          <XStep key={"xStep"+i} x={tickPos} y={this.props.y}
            value={xVal} length={10} labelColor={this.props.style.labelColor}
            tickColor={this.props.style.tickColor}
            tickWidth={this.props.style.tickWidth}
            tickOpacity={this.props.style.tickOpacity}
            showXLabels={this.props.showXLabels}/>
        )
      }
    }

    return(
      <g>{xAxis}</g>
    )
  }

}

XAxisContinuous.defaultProps = {
  x: 0,
  y: 0,
  width: 100,
  xScale: "lin",
  xSteps: 5,
  showXAxisLine: true,
  showXLabels: true,
  minX: 0,
  maxX: 100,
  style: {
    axisColor: "#000000",
    labelColor: "#000000",
    titleColor: "#000000",
    gridColor: "#DDDDDD",
    gridWidth: 1,
    gridOpacity: 0.5,
    lineWidth: 2,
    lineOpacity: 1,
    tickColor: "#000000",
    tickWidth: 2,
    tickOpacity: 1
  }
}

class XAxisDiscrete extends React.Component {

  render(){
    let xAxis = []

    if (this.props.showXAxisLine) {
      xAxis.push(
        <Line key={"xAxisLine"} x1={this.props.x} y1={this.props.y}
          x2={this.props.x+this.props.width} y2={this.props.y}
          stroke={this.props.style.axisColor} strokeWidth={this.props.style.lineWidth}
          opacity={this.props.style.lineOpacity}/>
      )
    }

    let size = 16

    if (this.props.showXLabels && this.props.labels){
      let labelWidth = this.props.width/this.props.labels.length
      let tilt = 0
      for (let i = 0; i < this.props.labels.length; i++){
        if (this.props.labels[i].length * 9 > labelWidth) {
          tilt = -30
          size = 12
        }
      }
      let rotation, anchor
      if (tilt != 0) {
        anchor = "end"
      } else {
        anchor = "middle"
      }

      let offset = this.props.x + this.props.width/this.props.labels.length/2
      let deltaX = this.props.width/this.props.labels.length
      if (this.props.xStart === "origin"){
        offset = this.props.x
        deltaX = this.props.width/(this.props.labels.length-1)
      }

      for (let i = 0; i < this.props.labels.length; i ++){
        rotation = "rotate(" + tilt + "," + (offset + i*(this.props.width/this.props.labels.length)-10) + "," + (this.props.y-20) + ")"
        xAxis.push(
          <Line key={"tick"+i}
            x1={offset + i*(deltaX)} y1={this.props.y}
            x2={offset + i*(deltaX)} y2={this.props.y+8}
            stroke={this.props.style.tickColor}
            strokeWidth={this.props.style.tickWidth}
            opacity={this.props.style.tickOpacity} />
        )
        xAxis.push(
          <text key={this.props.labels[i]} fill={this.props.style.labelColor}
            x={offset + i*(deltaX)}
            y={this.props.y+27} textAnchor={anchor} transform={rotation} fontSize={size}>
            {this.props.labels[i]}
          </text>
        )
      }
    }

    if (this.props.xTitle) {
      xAxis.push(
        <text key="xTitle" textAnchor="middle"
          x={this.props.x + this.props.width/2} y={this.props.y+65}
          fill={this.props.style.titleColor} fontSize={size+2} >
          {this.props.xTitle}
        </text>
      )
    }

    return <g>{xAxis}</g>
  }

}

XAxisDiscrete.defaultProps = {
  x: 0,
  y: 0,
  width: 100,
  showXAxisLine: true,
  showXLabels: true,
  style: {
    axisColor: "#000000",
    labelColor: "#000000",
    titleColor: "#000000",
    lineWidth: 2,
    lineOpacity: 1,
    tickColor: "#000000",
    tickWidth: 2,
    tickOpacity: 1
  }
}

class Axis extends React.Component {

  render(){
    this.axes = []
    this.buffer = {top: 0, left: 0, bot: 0, right: 0}
    if (this.props.showYAxis){
      this.buffer.top += 10
      this.buffer.left += 60
      if (this.props.yTitle){
        this.buffer.left += 25
      }
    }
    if (this.props.showXAxis){
      this.buffer.bot += 25
      if (this.props.xTitle){
        this.buffer.bot += 45
      }
      if (this.props.xStart === "origin") {
        this.buffer.right += 25
      }
    }
    if (this.props.graphTitle){
      this.buffer.top += 25
    }
    if (this.props.xAxisMode === "continuous"){
      this.buffer.right += 25
    }
    if (this.props.showLegend && this.props.legendValues){
      if (this.props.legendMode == "flat"){
        this.buffer.bot += 80
      } else if (this.props.legendMode == "stack-outside") {
        this.buffer.right += 125
      }
    }

    let xSteps, ySteps
    if (this.props.ySteps){
      ySteps = this.props.ySteps
    } else {
      ySteps = Math.ceil(this.props.height/100) + 1
    }
    if (this.props.xSteps){
      xSteps = this.props.xSteps
    } else {
      xSteps = Math.ceil(this.props.width/100) + 1
    }

    if (this.props.showYAxis) {
      this.axes.push(
        <YAxis key="YAxis" x={this.buffer.left} y={this.buffer.top} width={this.props.width-(this.buffer.left+this.buffer.right)}
          height={this.props.height-this.buffer.bot-this.buffer.top}
          minY={this.props.minY} maxY={this.props.maxY} yScale={this.props.yScale}
          ySteps={ySteps} yTitle={this.props.yTitle}
          showYAxisLine={this.props.showYAxisLine} showYLabels={this.props.showYLabels}
          showGrid={this.props.showGrid} style={this.props.axisStyle} />
      )
    }
    if (this.props.showXAxis) {
      if (this.props.xAxisMode == "discrete"){
        this.axes.push(
          <XAxisDiscrete key="XAxis" x={this.buffer.left} y={this.props.height-this.buffer.bot}
            width={this.props.width-this.buffer.left-this.buffer.right}
            xTitle={this.props.xTitle} showXAxisLine={this.props.showXAxisLine}
            showXLabels={this.props.showXLabels} labels={this.props.labels}
            xStart={this.props.xStart} style={this.props.axisStyle}/>
        )
      } else if (this.props.xAxisMode == "continuous"){
        this.axes.push(
          <XAxisContinuous key="XAxis" x={this.buffer.left} y={this.props.height-this.buffer.bot}
            width={this.props.width-this.buffer.left-this.buffer.right}
            xTitle={this.props.xTitle} showXAxisLine={this.props.showXAxisLine}
            showXLabels={this.props.showXLabels}
            xScale={this.props.xScale} xSteps={xSteps}
            minX={this.props.minX} maxX={this.props.maxX}
            style={this.props.axisStyle}/>
        )
      }
    }
    if (this.props.graphTitle){
      this.axes.push(
        <text key="graphTitle" textAnchor="middle"
          fontSize={18} fill={this.props.axisStyle.titleColor}
          x={this.buffer.left + (this.props.width-this.buffer.left-this.buffer.right) / 2} y={20}>
          {this.props.graphTitle}
        </text>
      )
    }
    if (this.props.legendValues){
      if (this.props.legendMode === "flat"){
        this.axes.push(
          <g key="Legend" transform={`translate(${this.buffer.left} ${this.props.height-75})`}>
            <Legend values={this.props.legendValues}
              width={this.props.width-this.buffer.left-this.buffer.right}
              showLegend={this.props.showLegend}
              fontColor={this.props.legendStyle.fontColor}
              backgroundColor={this.props.legendStyle.backgroundColor}
              showBorder={this.props.legendStyle.showBorder}
              borderColor={this.props.legendStyle.borderColor}/>
          </g>
        )
      } else if (this.props.legendMode === "stack-inside"){
        this.axes.push(
          <g key="Legend" transform={`translate(${this.props.width-120} ${this.buffer.top})`}>
            <Legend values={this.props.legendValues} mode="stack"
              showLegend={this.props.showLegend}
              fontColor={this.props.legendStyle.fontColor}
              backgroundColor={this.props.legendStyle.backgroundColor}
              showBorder={this.props.legendStyle.showBorder}
              borderColor={this.props.legendStyle.borderColor}/>
          </g>
        )
      } else if (this.props.legendMode === "stack-outside"){
        this.axes.push(
          <g key="Legend" transform={`translate(${this.props.width-120} ${this.buffer.top})`}>
            <Legend values={this.props.legendValues} mode="stack"
              showLegend={this.props.showLegend}
              fontColor={this.props.legendStyle.fontColor}
              backgroundColor={this.props.legendStyle.backgroundColor}
              showBorder={this.props.legendStyle.showBorder}
              borderColor={this.props.legendStyle.borderColor}/>
          </g>
        )
      }
    }

    let child
    if (this.props.children){
      child = React.cloneElement(this.props.children,
        {width: this.props.width-this.buffer.left-this.buffer.right,
          height:this.props.height-this.buffer.top-this.buffer.bot})
    }

    return(
      <g>
        {this.axes}
        <g transform={`translate(${this.buffer.left} ${this.buffer.top})`}>
          {child}
        </g>
      </g>
    )
  }
}

Axis.defaultProps = {
  x: 0,
  y: 0,
  width: 400,
  height: 400,
  xAxisMode: "discrete",
  xScale: "lin",
  yScale: "lin",
  minY: 0,
  maxY: 100,
  minX: 0,
  maxX: 100,
  showXAxis: true,
  showYAxis: true,
  showXAxisLine: true,
  showXLabels: true,
  showYAxisLine: true,
  showYLabels: true,
  showGrid: true,
  axisStyle: {
    axisColor: "#000000",
    labelColor: "#000000",
    titleColor: "#000000",
    gridColor: "#DDDDDD",
    gridWidth: 1,
    gridOpacity: 0.5,
    lineWidth: 2,
    lineOpacity: 1,
    tickColor: "#000000",
    tickWidth: 2,
    tickOpacity: 1
  },
  showLegend: true,
  legendMode: "flat",
  legendStyle: {
    fontColor: "#000000",
    backgroundColor: "none",
    showBorder: true,
    borderColor: "#000000"
  }
}

Axis.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  xAxisMode: PropTypes.string,
  graphHeight: PropTypes.string,
  xTitle: PropTypes.string,
  yTitle: PropTypes.string,
  xScale: PropTypes.string,
  xSteps: PropTypes.number,
  xStart: PropTypes.string,
  yScale: PropTypes.string,
  ySteps: PropTypes.number,
  minY: PropTypes.number,
  maxY: PropTypes.number,
  minX: PropTypes.number,
  maxX: PropTypes.number,
  showXAxisLine: PropTypes.bool,
  showXLabels: PropTypes.bool,
  labels: PropTypes.array,
  showYAxisLine: PropTypes.bool,
  showYLabels: PropTypes.bool,
  showGrid: PropTypes.bool,
  axisStyle: PropTypes.object,
  showLegend: PropTypes.bool,
  legendMode: PropTypes.string,
  legendStyle: PropTypes.object
}


export default Axis
