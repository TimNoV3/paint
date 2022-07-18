import Canvas from './components/Canvas'
import SettingBar from './components/SettingBar'
import Toolbar from './components/Toolbar'
import './styles/app.scss'

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// import {  Redirect } from "react-router";

import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <div className="app">
                    <Routes>
                        <Route
                            path="/:id"
                            element={
                                <>
                                    <Toolbar />
                                    <SettingBar />
                                    <Canvas />
                                </>
                            }
                        ></Route>
                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to={`f${(+new Date()).toString(16)}`}
                                />
                            }
                        ></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
