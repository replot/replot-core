import React from "react"
import {StaggeredMotion, spring} from "react-motion"


class LoadingIcon extends React.Component {

  render() {
    const style = {
      color: this.props.color,
      x1: 1.8 * (this.props.width / 15),
      x2: 7.5 * (this.props.width / 15),
      x3: 13.2 * (this.props.width / 15),
      y: 1.8 * (this.props.width / 15),
      r: this.props.width / 30
    }

    return (
      <StaggeredMotion
        defaultStyles={[{r: style.r}, {r: style.r}, {r: style.r}]}
        styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
          return i === 0
            ? {r: spring(0, {stiffness: 15, damping: 0, precision: 0.5})}
            : {r: spring(prevInterpolatedStyles[i-1].r)}
        })}>
        {interpolatingStyles =>
          <div>
            <svg width={this.props.width} height={this.props.width / (15 / 3.6)}>
              {interpolatingStyles.map((newStyle,i) =>
                <circle key={i} cx={style["x" + (i + 1)]} cy={style.y} r={newStyle.r > 0 ? newStyle.r : 0} fill={style.color}/>)
              }
            </svg>
          </div>
        }
      </StaggeredMotion>
    )
  }
}

LoadingIcon.defaultProps = {
  width: 100,
  color: "#000000"
}

export default LoadingIcon
