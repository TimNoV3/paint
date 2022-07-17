import React from 'react'
import '../styles/bar.scss'
import { TextField } from '@mui/material'
import toolState from '../store/toolState'

const SettingBar = () => {
    const changeColor = e => {
        toolState.setStrokeColor(e.target.value)
    }
    return (
        <div className="bar">
            <div className="tools">
                <TextField
                    label="Толщина линии"
                    type="number"
                    min="1"
                    max="50"
                    defaultValue={1}
                    size="small"
                    onChange={e => toolState.setLineWidth(e.target.value)}
                />
                <TextField
                    label="Цвет обводки"
                    type="color"
                    style={{ width: '100px' }}
                    size="small"
                    onChange={changeColor}
                />
            </div>
        </div>
    )
}

export default SettingBar
