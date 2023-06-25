import { colorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./scenes/global/TopBar";

function App() {
    // hook
    const [theme, colorMode] = useMode();

  
  return ( 
  <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="context">
            <TopBar />
          </main>
        </div>
    </ThemeProvider>

  </colorModeContext.Provider>
  )
}

export default App;