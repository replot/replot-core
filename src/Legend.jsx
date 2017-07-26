import React from "react"
import PropTypes from "prop-types"


class Legend extends React.Component {

  render() {
    if (!this.props.values || this.props.display === "off") {
      return null
    } else {
      let titles = Object.keys(this.props.values).sort()
      let longest = Object.keys(this.props.values).sort(function(a, b) { return b.length - a.length })[0]
      let items = []
      let size = 16
      if (this.props.mode === "flat") {
        let numColumns = Math.min(titles.length, Math.floor(this.props.width / (longest.length * (size/1.6))))
        let numRows = Math.ceil(titles.length/numColumns)

        for (let i = 0; i < titles.length; i++) {
          let title = titles[i]
          if (title) {
            let x = 5 + (this.props.width/numColumns * (i%numColumns))
            let y = 4 + ((Math.floor(i/numColumns) * 1.5) * size)
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
          <svg width={this.props.width} height={numRows*size*1.5}>
            {this.props.border == "on" &&
              <rect x={0} y={0} width={this.props.width}
                height={numRows*size*1.5} fill={this.props.backgroundColor}
                stroke={this.props.borderColor} strokeWidth={2} />
            }
            {items}
          </svg>
        )

      } else if (this.props.mode === "stack") {

        for (let i = 0; i < titles.length; i++) {
          let title = titles[i]
          if (title) {
            let x = 5
            let y
            if (this.props.height) {
              y = 4 + (i * this.props.height / titles.length)
            } else {
              y = 4 + (i * size * 1.5)
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
          <svg width={5+longest.length*size}
            height={this.props.height ? this.props.height : titles.length*size*1.5}>
            {this.props.border == "on" &&
              <rect x={0} y={0} width={longest.length*size}
                height={this.props.height ? this.props.height : titles.length*size*1.5}
                fill={this.props.backgroundColor} stroke={this.props.borderColor}
                strokeWidth={2} />
            }
            {items}
          </svg>
        )
      }
    }
  }
}

Legend.defaultProps = {
  width: 500,
  mode: "flat",
  display: "on",
  fontColor: "#000000",
  backgroundColor: "none",
  border: "off",
  borderColor: "#000000"
}

Legend.propTypes = {
  values: PropTypes.object.isRequired,
  width: PropTypes.number,
  mode: PropTypes.string,
  display: PropTypes.string,
  fontColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  borderColor: PropTypes.string
}

export default Legend
