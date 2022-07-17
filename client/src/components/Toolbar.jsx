import React from 'react'
import '../styles/bar.scss'

import BrushIcon from '@mui/icons-material/Brush'
import Crop169Icon from '@mui/icons-material/Crop169'
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal'
import RedoIcon from '@mui/icons-material/Redo'
import UndoIcon from '@mui/icons-material/Undo'

import { IconButton, TextField } from '@mui/material'

import Brush from '../tools/Brush'
import Rect from '../tools/Rect'

import toolState from '../store/toolState'
import canvasState from '../store/canvasState'
import Eraser from '../tools/Eraser'

const Toolbar = () => {
    const changeColor = e => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }

    return (
        <div className="bar">
            <div className="tools">
                <IconButton
                    onClick={() =>
                        toolState.setTool(new Brush(canvasState.canvas))
                    }
                >
                    <BrushIcon />
                </IconButton>
                <IconButton
                    onClick={() =>
                        toolState.setTool(new Rect(canvasState.canvas))
                    }
                >
                    <Crop169Icon />
                </IconButton>
                <IconButton
                    onClick={() =>
                        toolState.setTool(new Eraser(canvasState.canvas))
                    }
                >
                    <AutoFixNormalIcon />
                </IconButton>
                <IconButton>
                    <BrushIcon />
                </IconButton>
                <IconButton>
                    <BrushIcon />
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
                <IconButton>
                    <BrushIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Toolbar
