import Canvas from './components/Canvas'
import SettingBar from './components/SettingBar'
import Toolbar from './components/Toolbar'
import './styles/app.scss'

import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <div className="app">
                <Toolbar />
                <SettingBar />
                <Canvas />
            </div>
        </ThemeProvider>
    )
}

export default App
