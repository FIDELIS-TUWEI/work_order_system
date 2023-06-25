import { Routes, Route } from "react-router-dom";
import { colorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./scenes/global/TopBar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
//import Users from "./scenes/users";
//import Tasks from "./scenes/tasks";
//import Reports from "./scenes/reports";
//import Bar from "./scenes/bar"
//import Register from "./scenes/register"
//import Login from "./scenes/login"
//import Line from "./scenes/line";
//import Pie from "./scenes/pie";
//import Calendar from "./scenes/calendar"

function App() {
    // hook
    const [theme, colorMode] = useMode();

  
  return ( 
  <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="context">
            <TopBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/*<Route path="/users" element={<Users />} /> */}
              {/*<Route path="/tasks" element={<Tasks />} /> */}
              {/*<Route path="/reports" element={<Reports />} /> */}
              {/*<Route path="/register" element={<Register />} /> */}
              {/*<Route path="/login" element={<Login />} /> */}
              {/*<Route path="/bar" element={<Bar />} /> */}
              {/*<Route path="/pie" element={<Pie />} /> */}
              {/*<Route path="/line" element={<Line />} /> */}
              {/*<Route path="/calendar" element={<Calendar />} /> */}
            </Routes>
          </main>
        </div>
    </ThemeProvider>

  </colorModeContext.Provider>
  )
}

export default App;