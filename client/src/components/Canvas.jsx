import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'

import canvasState from '../store/canvasState'
import toolState from '../store/toolState'

import Modal from '@mui/material/Modal'

import '../styles/canvas.scss'
import Brush from '../tools/Brush'
import { Box } from '@mui/system'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import Rect from '../tools/Rect'

import axios from 'axios'

const Canvas = observer(() => {
    const canvasRef = useRef()
    const usernameRef = useRef()

    const { id } = useParams()

    const [canvasSettings, setCanvasSettings] = useState({
        width: 1500,
        height: 700,
    })

    const [open, setOpen] = useState(true)

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        axios.get(`http://localhost:5000/image?id=${id}`)
            .then(res => {
                const ctx = canvasRef.current.getContext('2d')
                const img = new Image()
                img.src = res.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`)
            canvasState.setSocket(socket)
            canvasState.setSessionId(id)
            toolState.setTool(new Brush(canvasRef.current, socket, id))
            socket.onopen = () => {
                socket.send(
                    JSON.stringify({
                        id,
                        username: canvasState.username,
                        method: 'connection',
                    })
                )
            }
            socket.onmessage = event => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`Пользователь ${msg.username} присоединился`)
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height)
                break
            case "finish":
                ctx.beginPath()
                break
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    const mouseUpHandler = () => {
        axios.post(`http://localhost:5000/image?id=${id}`, {img: canvasRef.current.toDataURL()})
            .then(response => console.log(response.data))
    }

    const handleClose = () => setOpen(false)

    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        handleClose()
    }

    return (
        <div className="canvas">
            <canvas
                ref={canvasRef}
                width={canvasSettings.width}
                height={canvasSettings.height}
                onMouseDown={() => mouseDownHandler()}
                onMouseUp={() => mouseUpHandler()}
            ></canvas>
            <Modal open={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        height: 300,
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Paper>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Введите ваше имя:
                        </Typography>
                        <TextField inputRef={usernameRef} />
                        <Button onClick={() => connectionHandler()}>
                            Войти
                        </Button>
                    </Paper>
                </Box>
            </Modal>
        </div>
    )
})

export default Canvas
