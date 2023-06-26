import React from 'react'
import '../styles/bar.scss'

import BrushIcon from '@mui/icons-material/Brush'
import Crop169Icon from '@mui/icons-material/Crop169'
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal'
import RedoIcon from '@mui/icons-material/Redo'
import UndoIcon from '@mui/icons-material/Undo'
import SaveIcon from '@mui/icons-material/Save'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import DeleteIcon from '@mui/icons-material/Delete';

import { IconButton, TextField } from '@mui/material'

import Brush from '../tools/Brush'
import Rect from '../tools/Rect'

import toolState from '../store/toolState'
import canvasState from '../store/canvasState'
import Eraser from '../tools/Eraser'
import Circle from '../tools/Circle'
import Line from '../tools/Line'

const Toolbar = () => {
    const changeColor = e => {
        toolState.setFillColor(e.target.value)
    }

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = canvasState.sessionid + '.jpg'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const clearCanvas = () => {
        const ctx = canvasState.canvas.getContext('2d')
        ctx.clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height)
    }

    return (
        <div className="bar">
            <div className="tools">
                <IconButton
                    onClick={() =>
                        toolState.setTool(
                            new Brush(
                                canvasState.canvas,
                                canvasState.socket,
                                canvasState.sessionid,
                                canvasState.uid,
                                toolState
                            )
                        )
                    }
                >
                    <BrushIcon />
                </IconButton>
                <IconButton
                    onClick={() =>
                        toolState.setTool(
                            new Rect(
                                canvasState.canvas,
                                canvasState.socket,
                                canvasState.sessionid,
                                canvasState.uid,
                                toolState
                            )
                        )
                    }
                >
                    <Crop169Icon />
                </IconButton>
                <IconButton
                    onClick={() =>
                        toolState.setTool(
                            new Eraser(
                                canvasState.canvas,
                                canvasState.socket,
                                canvasState.sessionid,
                                canvasState.uid,
                                toolState
                            )
                        )
                    }
                >
                    <AutoFixNormalIcon />
                </IconButton>
                <IconButton
                    onClick={() =>
                        toolState.setTool(
                            new Circle(
                                canvasState.canvas,
                                canvasState.socket,
                                canvasState.sessionid,
                                canvasState.uid,
                                toolState
                            )
                        )
                    }
                >
                    <CircleOutlinedIcon />
                </IconButton>
                <IconButton
                    onClick={() =>
                        toolState.setTool(
                            new Line(
                                canvasState.canvas,
                                canvasState.socket,
                                canvasState.sessionid,
                                canvasState.uid,
                                toolState
                            )
                        )
                    }
                >
                    <ShowChartIcon />
                </IconButton>
                <TextField
                    label="Цвет"
                    type="color"
                    style={{ width: '100px' }}
                    size="small"
                    onChange={changeColor}
                />
            </div>
            <div className="tools">
                <IconButton onClick={() => canvasState.undo()}>
                    <UndoIcon />
                </IconButton>
                <IconButton onClick={() => canvasState.redo()}>
                    <RedoIcon />
                </IconButton>
                <IconButton onClick={() => download()}>
                    <SaveIcon />
                </IconButton>
                <IconButton onClick={() => clearCanvas()}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Toolbar
