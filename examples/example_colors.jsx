import React from "react"
import ReactDOM from "react-dom"
import {Legend, Color, ColorPalette} from "../index.js"


class ExampleApp extends React.Component {

  constructor(){
    super()
    let p = new ColorPalette()
    let hexList = ["#4cab92", "#ca0004", "#8e44ad", "#9dbd5f", "#005c7a", "#fc6000"]
    let colorList = []
    for (let i=0; i < hexList.length; i++) {
      let c = new Color(0,0,0)
      c.fromHex(hexList[i])
      colorList.push(c)
    }
    p.addColors(colorList)
    let setPalette = p.copy()
    p.randomize()
    let randomPalette = p.copy()
    let custom = new ColorPalette()
    custom.createPalette(new Color(255,255,255), new Color(255,0,0), 6)
    custom.randomize()
    this.state = {
      setValues: {
        Global: setPalette.get(0).rgb(),
        US: setPalette.get(1).rgb(),
        India: setPalette.get(2).rgb(),
        China: setPalette.get(3).rgb(),
        Russia: setPalette.get(4).rgb(),
        Antarctica: setPalette.get(5).rgb()
      },
      randomValues: {
        Global: randomPalette.get(0).rgb(),
        US: randomPalette.get(1).rgb(),
        India: randomPalette.get(2).rgb(),
        China: randomPalette.get(3).rgb(),
        Russia: randomPalette.get(4).rgb(),
        Antarctica: randomPalette.get(5).rgb()
      },
      customValues: {
        Global: custom.get(0).rgb(),
        US: custom.get(1).rgb(),
        India: custom.get(2).rgb(),
        China: custom.get(3).rgb(),
        Russia: custom.get(4).rgb(),
        Antarctica: custom.get(5).rgb()
      }
    }
  }

  render(){
    return(
      <div>
        <svg width={200} height={200}>
          <Legend values={this.state.setValues} mode="stack" showBorder={false} backgroundColor="#1b1b1b" fontColor="#ffffff"/>
        </svg>
        <svg width={200} height={200}>
          <Legend values={this.state.randomValues} mode="stack" showBorder={false} backgroundColor="#1b1b1b" fontColor="#ffffff"/>
        </svg>
        <svg width={200} height={200}>
          <Legend values={this.state.customValues} mode="stack" showBorder={false} backgroundColor="#1b1b1b" fontColor="#ffffff"/>
        </svg>
      </div>
    )
  }
}

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
