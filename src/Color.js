function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

class Color {

  constructor(red, green, blue) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  rgb() {
    let str = "rgb("
    str += String(Math.round(this.red)) + ","
    str += String(Math.round(this.green)) + ","
    str += String(Math.round(this.blue)) + ")"
    return str
  }

  fromHex(hex) {
    this.red = hexToR(hex)
    this.green = hexToG(hex)
    this.blue = hexToB(hex)
  }

  endpoint(slopeRed, slopeGreen, slopeBlue) {
    let tredNeg = this.red / slopeRed
    let tredPos = (255 - this.red) / slopeRed
    if (slopeRed == 0) {
      tredNeg = -1
      tredPos = -1
    }

    let tgreenNeg = this.green / slopeGreen
    let tgreenPos = (255 - this.green) / slopeGreen
    if (slopeGreen == 0) {
      tgreenNeg = -1
      tgreenPos = -1
    }

    let tblueNeg = this.blue / slopeBlue
    let tbluePos = (255 - this.blue) / slopeBlue
    if (slopeBlue == 0) {
      tblueNeg = -1
      tbluePos = -1
    }

    let t = [tredNeg, tredPos, tgreenNeg, tgreenPos, tblueNeg, tbluePos]

    let keys = []
    for (var k=0; k < 6; k++) {
      if (t[k] >= 0) {
        keys.push(k)
      }
    }

    if (keys.length == 0) {
      return this
    }

    let tmin = t[keys[0]]
    let tind = keys[0]
    for (var ki=0; ki < keys.length; ki++) {
      if (t[keys[ki]] < tmin) {
        tind = keys[ki]
        tmin = t[tind]
      }
    }

    let sign = 1
    if (tind % 2 == 0) {
      sign = -1
    }
    let red = this.red + tmin * sign * slopeRed
    let green = this.green + tmin * sign * slopeGreen
    let blue = this.blue + tmin * sign * slopeBlue
    let end = new Color(red, green, blue)
    return end
  }

}

export default Color
