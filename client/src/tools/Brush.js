import Tool from './Tool'

export default class Brush extends Tool {

    mouseUpHandler(e) {
        super.mouseUpHandler({
            type: 'finish',
        })
    }

    mouseDownHandler(e) {
        super.mouseDownHandler()
        this.ctx.moveTo(
            e.pageX - e.target.offsetLeft,
            e.pageY - e.target.offsetTop
        )

        this.socket.send(
            JSON.stringify({
                method: 'draw',
                id: this.id,
                uid: this.uid,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    color: this.toolState.fillColor,
                    strokeColor: this.toolState.strokeColor,
                    lineWidth: this.toolState.lineWidth,
                },
            })
        )
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.socket.send(
                JSON.stringify({
                    method: 'draw',
                    id: this.id,
                    uid: this.uid,
                    figure: {
                        type: 'brush',
                        x: e.pageX - e.target.offsetLeft,
                        y: e.pageY - e.target.offsetTop,
                        color: this.toolState.fillColor,
                        strokeColor: this.toolState.strokeColor,
                        lineWidth: this.toolState.lineWidth,
                    },
                })
            )
        }
    }

    static draw(ctx, figure, toolState) {
        console.log(figure, toolState)
        super.staticDraw(ctx, figure, toolState, f => {
            ctx.lineTo(f.x, f.y)
            ctx.stroke()
        })
    }
}
