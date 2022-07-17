import React from 'react'
import '../styles/bar.scss'
import BrushIcon from '@mui/icons-material/Brush'
import { IconButton } from '@mui/material'
import Input from '@mui/material/Input';
import Brush from '../tools/Brush';

import toolState from '../store/toolState';
import canvasState from '../store/canvasState';

const toolStyles = { color: 'white' }

const Toolbar = () => {
    return (
        <div className="bar">
            <div className="tools">
                <IconButton style={toolStyles} onClick={() => toolState.setTool(new Brush(canvasState.canvas))}>
                    <BrushIcon />
                </IconButton>
                <IconButton style={toolStyles}>
                    <BrushIcon />
                </IconButton>
                <IconButton style={toolStyles}>
                    <BrushIcon />
                </IconButton>
                <IconButton style={toolStyles}>
                    <BrushIcon />
                </IconButton>
                <IconButton style={toolStyles}>
                    <BrushIcon />
                </IconButton>
                <Input type='color' style={{ width: "30px"}} />
            </div>
            <div className="tools">
                <IconButton style={toolStyles}>
                    <BrushIcon />
                </IconButton>
                <IconButton style={toolStyles}>
                    <BrushIcon />
                </IconButton>
                <IconButton style={toolStyles}>
                    <BrushIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Toolbar
