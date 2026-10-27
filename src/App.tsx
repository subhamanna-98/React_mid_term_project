
import { RouterProvider } from 'react-router-dom'
// import './App.css'
import Routes from './routes/Routes'
import { Toaster } from 'sonner';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';
function App() {
 

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Toaster closeButton richColors position="top-right"/>
    <RouterProvider router={Routes}/>
  </ThemeProvider>
    </>
  )
}

export default App
