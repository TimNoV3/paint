import { makeAutoObservable } from 'mobx'

class ToolState {
    tool = null
    fillColor = "#000000"
    strokeColor = "#000000"
    lineWidth = "1"

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
    }

    setFillColor(color) {
        this.fillColor = color
    }

    setStrokeColor(color) {
        this.strokeColor = color
    }

    setLineWidth(width) {
        this.lineWidth = width
    }

    setGlobalAlpha(alpha) {
        console.log(alpha, " - ", this.colorWithAlpha(this.fillColor, alpha), " - ", this.strokeColor)

        this.fillColor = this.colorWithAlpha(this.fillColor.slice(0, 7), alpha)
        this.strokeColor = this.colorWithAlpha(this.strokeColor.slice(0, 7), alpha)
    }

    colorWithAlpha(color, opacity) {
        var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    }
}

export default new ToolState()
