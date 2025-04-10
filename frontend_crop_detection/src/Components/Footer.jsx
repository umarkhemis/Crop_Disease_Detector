

import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Switch,
} from "@mui/material";

import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  KeyboardArrowUp,
  Nightlight,
  WbSunny
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import { ThemContext } from "../App";



// const Footer = ({ toggleTheme, darkMode }) => {
const Footer = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  // const { darkMode, setDarkMode } = useContext(ThemContext);
  



  // useEffect(() => {
  //   document.body.style.backgroundColor = darkMode ? "#000" : "#fff";
  //   document.body.style.color = darkMode ? "#fff" : "#000";
  //   localStorage.setItem("darkMode", darkMode); // Save preference
  // }, [darkMode]);


  // const toggleDarkMode = () => {
  //   setDarkMode((prevMode) => !prevMode);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your Mailchimp form action
    const mailchimpURL =
      "https://yourusername.usX.list-manage.com/subscribe/post?u=XXXXXXX&id=XXXXXXX";

    const form = document.createElement("form");
    form.action = mailchimpURL;
    form.method = "POST";
    form.target = "_blank";

    const input = document.createElement("input");
    input.name = "EMAIL";
    input.value = email;
    input.type = "hidden";
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    setEmail(""); // Clear input
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#f5f5f5",
        color: theme.palette.text.primary,
        p: 4,
        mt: 6,
        borderTop: "1px solid #ccc",
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography>Email: agritech@gmail.com</Typography>
          <Typography>Phone: +256-700-000000</Typography>
          <Typography>Location: Kabale, Uganda</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Useful Links</Typography>
          <Link to="/help">Help</Link><br />
          <Link to="/terms">Terms & Conditions</Link><br />
          <Link to="/privacy">Privacy Policy</Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Follow Us</Typography>
          <IconButton><Facebook /></IconButton>
          <IconButton><Twitter /></IconButton>
          <IconButton><Instagram /></IconButton>
          <IconButton><LinkedIn /></IconButton>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Newsletter</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={!email}
            >
              Subscribe
            </Button>
          </form>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          pt: 2,
          borderTop: "1px solid #ccc",
        }}
      >
        <Typography variant="body2">
          {/* &copy; {new Date().getFullYear()} CropGuard. All rights reserved. */}
          <p style={{textAlign: "center"}}>Copyright © {new Date().getFullYear()} <img src={logo} alt="Logo" style={{width: 40, height: 40, alignContent: "center", borderRadius: '50px' }} /> All rights reserved.</p>
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          {/* <Typography variant="body2">Dark Mode</Typography> */}
          {/* <Switch checked={darkMode} onChange={toggleTheme} /> */}
          {/* <Switch checked={darkMode} onChange={toggleDarkMode} /> */}

          <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <WbSunny /> : <Nightlight />}
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Typography>

          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <KeyboardArrowUp />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;



















// // components/Footer.js

// import React from "react";
// import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
// import { Facebook, Twitter, LinkedIn, Instagram, Email, Phone, LocationOn } from "@mui/icons-material";
// import logo from '../assets/logo.png'


// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "#003f6b",
//         color: "#fff",
//         mt: 8,
//         px: { xs: 4, sm: 8 },
//         py: 6,
//       }}
//     >
//       <Grid container spacing={4} justifyContent="space-between">
//         {/* Company Info */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="h6" gutterBottom>
//             Crop Guard
//           </Typography>
//           <Typography variant="body2">
//             Empowering farmers with AI-powered crop disease detection and insights.
//           </Typography>
//         </Grid>

//         {/* Contact Info */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="h6" gutterBottom>
//             Contact Us
//           </Typography>
//           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//             <Email sx={{ mr: 1 }} fontSize="small" />
//             <Typography variant="body2">support@cropguard.com</Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//             <Phone sx={{ mr: 1 }} fontSize="small" />
//             <Typography variant="body2">+256 123 456 789</Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <LocationOn sx={{ mr: 1 }} fontSize="small" />
//             <Typography variant="body2">Kampala, Uganda</Typography>
//           </Box>
//         </Grid>

//         {/* Useful Links */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="h6" gutterBottom>
//             Useful Links
//           </Typography>
//           <Link href="/about" color="inherit" underline="hover" display="block">About Us</Link>
//           <Link href="/help" color="inherit" underline="hover" display="block">Help & Support</Link>
//           <Link href="/privacy" color="inherit" underline="hover" display="block">Privacy Policy</Link>
//         </Grid>

//         {/* Social Media */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="h6" gutterBottom>
//             Follow Us
//           </Typography>
//           <Box>
//             <IconButton href="#" sx={{ color: "#fff" }}>
//               <Facebook />
//             </IconButton>
//             <IconButton href="#" sx={{ color: "#fff" }}>
//               <Twitter />
//             </IconButton>
//             <IconButton href="#" sx={{ color: "#fff" }}>
//               <Instagram />
//             </IconButton>
//             <IconButton href="#" sx={{ color: "#fff" }}>
//               <LinkedIn />
//             </IconButton>
//           </Box>
//         </Grid>
//       </Grid>

//       <Box mt={4} textAlign="center" borderTop="1px solid #ffffff33" pt={2}>
//         <Typography variant="body2">
//           &copy; {new Date().getFullYear()} Crop Guard. All rights reserved.
//         {/* <p style={{textAlign: "center"}}>Copyright © {new Date().getFullYear()} <img src={logo} alt="Logo" style={{width: 40, height: 40, alignContent: "center", borderRadius: '50px' }} /> All rights reserved.</p> */}
        
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default Footer;
