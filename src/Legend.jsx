import React from "react"
import PropTypes from "prop-types"
import GradientsContainer from "./GradientsContainer.jsx"


class LegendShape extends React.Component {

  render() {
    if (this.props.shape == "square") {
      return(
        <g>
           <rect x={this.props.x} y={this.props.y} fill={this.props.value}
             width={this.props.size} height={this.props.size} />
           <text x={this.props.x+1.5*this.props.size} y={this.props.y+(this.props.size/1.7)}
            alignmentBaseline="middle" fontSize={this.props.size}
            fill={this.props.fontColor} fontFamily={this.props.fontFamily}>
              {this.props.title}
          </text>
        </g>
      )
    }
    else if (this.props.shape == "circle") {
      return(
        <g>
           <circle cx={this.props.x+this.props.size/2} cy={this.props.y+this.props.size/2}
           fill={this.props.value} r={this.props.size/2} stroke={this.props.value} />
           <text x={this.props.x+1.5*this.props.size} y={this.props.y+(this.props.size/1.7)}
            alignmentBaseline="middle" fontSize={this.props.size}
            fill={this.props.fontColor} fontFamily={this.props.fontFamily}>
              {this.props.title}
          </text>
        </g>
      )
    }
  }

}


class Legend extends React.Component {

  render() {
    if (Object.keys(this.props.values).length === 0 || !this.props.showLegend) {
      return null
    } else {
      let titles = Object.keys(this.props.values).sort()
      let longest = Object.keys(this.props.values).sort(function(a, b) { return b.length - a.length })[0]
      let items = []
      let size = 16
      if (titles.length > 12) {
        size = 12
      }
      if (titles.length > 15) {
        size = 10
      }
      if (this.props.fontSize) {
        size = this.props.fontSize
      }
      let buffer = {x: 5, y: 4}
      let xTitle
      if (this.props.showTitle) {
        if (this.props.mode === "flat") {
          xTitle = this.props.width/2
        } else if (this.props.mode === "stack") {
          xTitle = (size*2 + longest.length*size/2)/2
        }
        items.push(
          <text x={xTitle} y={buffer.y+(size/1.7)}
           key={xTitle + '.' + buffer.y}
           alignmentBaseline="middle" textAnchor="middle"
           fontSize={size} textDecoration="underline"
           fill={this.props.fontColor} fontFamily={this.props.fontFamily}>
             {this.props.legendTitle}
         </text>
        )
        buffer.y += size + buffer.y
      }

      if (this.props.gradient) {
        items.push(
          <GradientsContainer key="gradient-container" colors={this.props.values} />
        )
      }

      if (this.props.mode === "flat") {
        let numColumns = Math.min(titles.length, Math.floor((this.props.width-buffer.x)/((size*2) + (longest.length*size/2))))
        if (!numColumns) {numColumns = 1}
        let numRows = Math.ceil(titles.length/numColumns)

        if (this.props.showTitle) { numRows += 1 }

        for (let i = 0; i < titles.length; i++) {
          let title = titles[i]
          if (title) {
            let x = buffer.x + (i%numColumns)*((this.props.width-buffer.x-(size*2+longest.length*size/2))/(numColumns-1 <= 0 ? 1 : numColumns-1))
            let y = buffer.y + ((Math.floor(i/numColumns))*1.5*size)
            let color = this.props.values[title]
            if (this.props.gradient) {
              color = "url(#gradient-" + title
            }
            items.push(
              <LegendShape shape={this.props.shape} x={x} y={y} size={size}
                key={title + '.' + x + '.' + y} title={title} value={color}
                fontColor={this.props.fontColor} fontFamily={this.props.fontFamily} />
            )
          }
        }

        return(
          <g>
            <rect x={0} y={0} width={this.props.width <= 0 ? 0 : this.props.width}
              height={(numRows*size*1.4) + 5 <= 0 ? 0 : (numRows*size*1.4) + 5} fill={this.props.backgroundColor}
              stroke={this.props.showBorder ? this.props.borderColor : "none"}
              strokeWidth={2} />
            {items}
          </g>
        )

      } else if (this.props.mode === "stack") {

        if (this.props.showTitle) { titles.length += 1 }

        for (let i = 0; i < titles.length; i++) {
          let title = titles[i]
          if (title) {
            let x = buffer.x
            let y
            if (this.props.height) {
              y = buffer.y + (i * ((this.props.height-size*1.5) / (titles.length-1)))
            } else {
              y = buffer.y + (i*size*1.5)
            }
            let color = this.props.values[title]
            if (this.props.gradient) {
              color = "url(#gradient-" + title
            }
            items.push(
              <LegendShape shape={this.props.shape} x={x} y={y} size={size}
                key={title + '.' + x + '.' + y} title={title} value={color}
                fontColor={this.props.fontColor} fontFamily={this.props.fontFamily} />
            )
          }
        }
        return(
          <g>
            <rect x={0} y={0} width={((size*2) + (longest.length*size/2)) <= 0 ? 0 : (size*2) + (longest.length*size/2)}
              height={this.props.height ? this.props.height : titles.length*size*1.5}
              fill={this.props.backgroundColor} strokeWidth={2}
              stroke={this.props.showBorder ? this.props.borderColor : "none"}/>
            {items}
          </g>
        )
      }
    }
  }
}

Legend.defaultProps = {
  gradient: false,
  width: 500,
  mode: "flat",
  shape: "square",
  showLegend: true,
  fontColor: "#000000",
  backgroundColor: "none",
  showBorder: true,
  borderColor: "#000000",
  showTitle: false,
  legendTitle: "Legend"
}

Legend.propTypes = {
  values: PropTypes.object.isRequired,
  gradient: PropTypes.bool,
  width: PropTypes.number,
  mode: PropTypes.string,
  shape: PropTypes.string,
  showLegend: PropTypes.bool,
  fontColor: PropTypes.string,
  fontSize: PropTypes.number,
  fontFamily: PropTypes.string,
  backgroundColor: PropTypes.string,
  showBorder: PropTypes.bool,
  borderColor: PropTypes.string,
  showTitle: PropTypes.bool,
  legendTitle: PropTypes.string
}

export default Legend
