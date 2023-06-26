import toolState from '../store/toolState'
import Tool from './Tool'

export default class Line extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id)
        this.listen()
        this.initialSettings(toolState)
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler() {
        this.mouseDown = false
        this.socket.send(
            JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'line',
                    x: this.startX,
                    y: this.startY,
                    x1: this.endX,
                    y1: this.endY,
                    color: this.ctx.fillStyle,
                },
            })
        )
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.endX = e.pageX - e.target.offsetLeft
            this.endY = e.pageY - e.target.offsetTop

            this.draw(this.startX, this.startY, this.endX, this.endY)
        }
    }

    draw(x, y, x1, y1) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(x, y)
            this.ctx.lineTo(x1, y1)
            this.ctx.fill()
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }

    static staticDraw(ctx, x, y, x1, y1, color) {
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x1, y1)
        ctx.fill()
        ctx.stroke()
        ctx.beginPath()
    }
}
