import React from "react"
import PropTypes from "prop-types"


class Legend extends React.Component {

  render() {
    if (Object.keys(this.props.values).length === 0 || !this.props.showLegend) {
      return null
    } else {
      let titles = Object.keys(this.props.values).sort()
      let longest = Object.keys(this.props.values).sort(function(a, b) { return b.length - a.length })[0]
      let items = []
      let size = 16
      let buffer = {x: 5, y: 4}
      if (this.props.mode === "flat") {
        let numColumns = Math.min(titles.length, Math.floor((this.props.width-buffer.x)/((size*2) + (longest.length*size/2))))
        if (!numColumns) {numColumns = 1}
        let numRows = Math.ceil(titles.length/numColumns)

        for (let i = 0; i < titles.length; i++) {
          let title = titles[i]
          if (title) {
            let x = buffer.x + (i%numColumns)*((this.props.width-buffer.x-(size*2+longest.length*size/2))/(numColumns-1 <= 0 ? 1 : numColumns-1))
            let y = buffer.y + ((Math.floor(i/numColumns))*1.5*size)
            items.push(
              <g key={title}>
                 <rect x={x} y={y} width={size} height={size}
                   fill={this.props.values[title]} />
                 <text x={x+1.5*size} y={y+(size/1.7)}
                  alignmentBaseline="middle" fontSize={size}
                  fill={this.props.fontColor} fontFamily={this.props.fontFamily}>
                    {title}
                </text>
              </g>
            )
          }
        }

        return(
          <g>
            <rect x={0} y={0} width={this.props.width <= 0 ? 0 : this.props.width}
              height={(numRows*size*1.5) <= 0 ? 0 : numRows*size*1.5} fill={this.props.backgroundColor}
              stroke={this.props.showBorder ? this.props.borderColor : "none"}
              strokeWidth={2} />
            {items}
          </g>
        )

      } else if (this.props.mode === "stack") {

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
            items.push(
              <g key={title}>
                 <rect x={x} y={y} width={size} height={size}
                   fill={this.props.values[title]} />
                 <text x={x+1.5*size} y={y+(size/1.7)}
                  alignmentBaseline="middle" fontSize={size}
                  fill={this.props.fontColor} fontFamily={this.props.fontFamily}>
                    {title}
                </text>
              </g>
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
  width: 500,
  mode: "flat",
  showLegend: true,
  fontColor: "#000000",
  backgroundColor: "none",
  showBorder: true,
  borderColor: "#000000"
}

Legend.propTypes = {
  values: PropTypes.object.isRequired,
  width: PropTypes.number,
  mode: PropTypes.string,
  showLegend: PropTypes.bool,
  fontColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  showBorder: PropTypes.bool,
  borderColor: PropTypes.string
}

export default Legend
