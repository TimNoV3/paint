import Tool from './Tool'

export default class Circle extends Tool {
    mouseUpHandler() {
        super.mouseUpHandler({
            type: 'circle',
            x: this.startX,
            y: this.startY,
            width: this.width,
        })
    }

    mouseDownHandler(e) {
        super.mouseDownHandler()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft
            this.width = currentX - this.startX
            this.draw(this.startX, this.startY, this.width)
        }
    }

    draw(x, y, w) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, w, 0, 360)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx, figure, toolState) {
        super.staticDraw(ctx, figure, toolState, f => {
            ctx.arc(f.x, f.y, f.width, 0, 360)
            ctx.fill()
            ctx.stroke()
        })
    }
}
