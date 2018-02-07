import React from "react"


class GradientsContainer extends React.Component {

  render() {
    let gradients = []
    let titles = Object.keys(this.props.colors).sort()
    for (let i=0; i < titles.length; i++) {
      gradients.push(
        <linearGradient id={"gradient-" + titles[i]}
          key={"gradient-" + titles[i]}
          x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={this.props.colors[titles[i]][0]} />
          <stop offset="100%" stopColor={this.props.colors[titles[i]][1]} />
        </linearGradient>
      )
    }

    return (
      <g>{gradients}</g>
    )
  }
}

GradientsContainer.defaultProps = {
  colors: {
    Category1: ["#4cab92", "#ca0004"],
    Category2: ["#8e44ad", "#eccc00"],
    Category3: ["#9dbd5f", "#0097bf"],
    Category4: ["#005c7a", "#fc6000"]
  }
}

export default GradientsContainer
