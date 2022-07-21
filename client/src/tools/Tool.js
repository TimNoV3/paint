import toolState from '../store/toolState'

const setContextSettings = (ctx, settings) => {
    const { fillColor, strokeColor, lineWidth } = settings

    ctx.fillStyle = fillColor
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = lineWidth
}
export default class Tool {
    constructor(canvas, socket, id, uid, toolState) {
        this.toolState = toolState
        this.canvas = canvas
        this.socket = socket
        this.id = id
        this.uid = uid
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseDownHandler() {
        this.initialSettings(toolState)
        this.mouseDown = true
        this.ctx.beginPath()
    }

    mouseUpHandler(figure) {
        this.mouseDown = false
        this.socket.send(
            JSON.stringify({
                method: 'draw',
                id: this.id,
                uid: this.uid,
                figure: {
                    ...figure,
                    color: this.toolState.fillColor,
                    strokeColor: this.toolState.strokeColor,
                    lineWidth: this.toolState.lineWidth,
                },
            })
        )
    }

    mouseMoveHandler() {}

    set fillColor(color) {
        this.ctx.fillStyle = color
    }

    set strokeColor(color) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width
    }

    set globalAlpha(alpha) {
        this.ctx.globalAlpha = alpha
    }

    initialSettings(toolState) {
        this.ctx.fillStyle = toolState.fillColor
        this.ctx.strokeStyle = toolState.strokeColor
        this.ctx.lineWidth = toolState.lineWidth
    }

    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }



    static staticDraw(ctx, figure, toolState, drawFunction) {
        const { color, strokeColor, lineWidth } = figure

        setContextSettings(ctx, {
            fillColor: color,
            strokeColor,
            lineWidth,
        })

        ctx.beginPath()

        drawFunction(figure)

        ctx.beginPath()

        setContextSettings(ctx, toolState)
    }
}
