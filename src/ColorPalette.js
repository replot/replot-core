import Color from "./Color.js"

class ColorPalette {

  constructor() {
    this.palette = []
    this.numcolors = 0
  }

  get(i) {
    return this.palette[i]
  }

  copy() {
    let cp = new ColorPalette()
    cp.palette = [].concat(this.palette)
    cp.numcolors = this.numcolors
    return cp
  }

  addColors(listColors) {
    this.palette = this.palette.concat(listColors)
    this.numcolors += listColors.length
  }

  randomize() {
    let curIndex = this.numcolors
    let temp
    let randomIndex

    while (0 !== curIndex) {
      randomIndex = Math.floor(Math.random() * curIndex)
      curIndex -= 1

      temp = this.palette[curIndex]
      this.palette[curIndex] = this.palette[randomIndex]
      this.palette[randomIndex] = temp
    }
  }

  createPalette(color1, color2, numcolors) {
    let dred = color2.red - color1.red
    let dgreen = color2.green - color1.green
    let dblue = color2.blue - color1.blue

    let slopeRed = Math.abs(dred / 255)
    let slopeGreen = Math.abs(dgreen / 255)
    let slopeBlue = Math.abs(dblue / 255)

    let end1 = color1.endpoint(slopeRed, slopeGreen, slopeBlue)
    let end2 = color2.endpoint(slopeRed, slopeGreen, slopeBlue)

    let palette = []
    for (var i=0; i < numcolors; i++) {
      let r = end1.red + i*(end2.red - end1.red)/numcolors
      let g = end1.green + i*(end2.green - end1.green)/numcolors
      let b = end1.blue + i*(end2.blue - end1.blue)/numcolors
      let c = new Color(r,g,b)
      palette.push(c)
    }
    this.numcolors = numcolors
    this.palette = palette
  }

}

export default ColorPalette
