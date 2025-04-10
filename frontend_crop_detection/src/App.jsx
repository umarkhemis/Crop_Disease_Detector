import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ForumPage from "./Pages/ForumPage";
import HistoryPage from "./Pages/HistoryPage";
import HelpPage from "./Pages/HelpPage";
import logo from './assets/logo.png'
import Footer from "./Components/Footer";
// import { CssBaseline } from "@mui/material";
// import {createTheme} from "@mui/material";
// import { ThemeContext } from "@emotion/react";
// import { ThemeProvider } from "@mui/material";
import {
  CssBaseline,
  ThemeProvider,
  createTheme
} from "@mui/material";


// export const ThemContext = createContext()

export const ThemContext = createContext();

const App = () => {
  // const [selectedHistory, setSelectedHistory] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [recentResults, setRecentResults] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true); // Track sidebar state
  // const [darkMode, setDarkMode] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#00695f",
      },
      background: {
        default: darkMode ? "#121212" : "#fafafa",
        paper: darkMode ? "#1e1e1e" : "#fff"
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  });
  



  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark-mode");
  //   } else {
  //     document.documentElement.classList.remove("dark-mode");
  //   }
  //   localStorage.setItem("darkMode", darkMode);
  // }, [darkMode]);


  
  // const theme = createTheme({
  //   palette: {
  //     mode: darkMode ? "dark" : "light",
  //     primary: { main: "#005898" },
  //   },
  // });

  // const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <>
       <ThemeProvider theme={theme}>
      {/* <ThemeProvider value={{ darkMode, setDarkMode }}> */}
      <CssBaseline />
      <ThemContext.Provider value={{ darkMode, setDarkMode }}>
      <AuthProvider>
        
        <Navbar setSelectedHistory={setSelectedHistory} selectedHistory={selectedHistory} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Routes>
          <Route path="/" element={<HomePage 
            recentResults={recentResults}
            selectedHistory={selectedHistory}
            onClearHistory={() => setSelectedHistory(null)}
          />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<ProtectedRoutes><HistoryPage /></ProtectedRoutes>} />
          <Route path="/forum" element={<ProtectedRoutes><ForumPage /></ProtectedRoutes>} />
          <Route path="/help" element={<ProtectedRoutes><HelpPage /></ProtectedRoutes>} />
        </Routes>
        <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
      </AuthProvider>      
      {/* <Footer /> */}
      {/* <Footer toggleTheme={toggleTheme} darkMode={darkMode} /> */}
      </ThemContext.Provider>
      </ThemeProvider>
      {/* <hr />
      <footer className="footer">
        <p style={{textAlign: "center"}}>Copyright © {new Date().getFullYear()} <img src={logo} alt="Logo" style={{width: 40, height: 40, alignContent: "center", borderRadius: '50px' }} /> All rights reserved.</p>
      </footer> */}
    </>
  );
};

export default App;







// import { useState } from 'react'
// import './App.css'

// function App() {
  

//   return (
//     <>
      
//     </>
//   )
// }

// export default App


