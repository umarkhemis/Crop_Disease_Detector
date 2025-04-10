import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from "@mui/material";
import CropUpload from './CropUpload';
import PredictionCarousel from './PredictionCarousel';
import HistoryPage from './HistoryPage'
import API from '../api';


const HomePage = ({  selectedHistory, onClearHistory }) => {
  const [selectedResult, setSelectedResult] = useState(null);
  const [recentResults, setRecentResults] = useState([]);


  useEffect(() => {
  const fetchPredictions = async () => {
    try {
      const response = await API.get('/home/'); // Adjust endpoint if needed
      setRecentResults(response.data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  fetchPredictions();
}, []);


  const handleHistoryClick = (result) => {
    setSelectedResult(result);
  };

  const handleCloseHistory = () => {
    setSelectedResult(null);
    if (onClearHistory) onClearHistory();  // optional callback to clear selected history from sidebar
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
      {selectedHistory ? (
        <Box textAlign="center">
          <Typography variant="h4" mb={2}>
            Prediction Details
          </Typography>
          <HistoryPage result={selectedHistory} />

          <Button variant="outlined" onClick={handleCloseHistory} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>
            Recent Predictions
          </Typography>

          <PredictionCarousel recentResults={recentResults} />
          
          <hr />

          <Box sx={{ padding: "2rem", textAlign: "center" }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Get AI Insights about Your Crop Diseases
            </Typography>
            <CropUpload />
          </Box>
        </>
      )}
    </Box>
  );
};

export default HomePage;



















// import React, { useState, useEffect } from "react";
// import { Box, Typography } from "@mui/material";
// import CropUpload from "./CropUpload";
// import PredictionCarousel from "./PredictionCarousel";
// // import {useTheme} from "@mui/material/styles/useTheme";
// import {useTheme} from "@mui/material";
// import API from "../api";

// const HomePage = () => {
//   const theme = useTheme();

//   // Simulated sidebar state (you can link this with your real layout if needed)
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Load recent results from localStorage or backend (as an example)
//   const [recentResults, setRecentResults] = useState([]);

//   // useEffect(() => {
//   //   const storedResults = localStorage.getItem("recentResults");
//   //   if (storedResults) {
//   //     setRecentResults(JSON.parse(storedResults));
//   //   }
//   // }, []);



//   useEffect(() => {
//     const fetchPredictions = async () => {
//       try {
//         const response = await API.get('/home/'); // Adjust endpoint if needed
//         setRecentResults(response.data);
//       } catch (error) {
//         console.error('Error fetching predictions:', error);
//       }
//     };

//     fetchPredictions();
//   }, []);



//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         p: 3,
//         mt: "64px", // adjust depending on your AppBar height
//         ml: isSidebarOpen ? "280px" : "0px",
//         transition: "margin-left 0.3s ease-in-out",
//         [theme.breakpoints.down("sm")]: {
//           ml: 0,
//           p: 1,
//         },
//       }}
//     >
//       {/* Upload Section */}
//       <Box sx={{ padding: "2rem", textAlign: "center" }}>
//         <Typography variant="h4" sx={{ mb: 2 }}>
//           Get AI Insights about Your Crop Diseases
//         </Typography>
//         <CropUpload setRecentResults={setRecentResults} />
//       </Box>

//       {/* Title */}
//       <Typography variant="h5" sx={{ mt: 6, textAlign: "center" }}>
//         Recent Predictions
//       </Typography>

//       {/* Carousel */}
//       <Box sx={{ mt: 3 }}>
//         <PredictionCarousel recentResults={recentResults} />
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;

















// import React, { useState } from 'react';
// import { Box, Typography, useTheme } from '@mui/material';
// import CropUpload from './CropUpload';
// import PredictionCarousel from './PredictionCarousel';

// const HomePage = () => {
//   const theme = useTheme();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // You can control this from a parent or context
//   const [recentResults, setRecentResults] = useState([]); // Pass this to Carousel

//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         p: 3,
//         mt: "64px",
//         transition: theme.transitions.create("margin", {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.standard,
//         }),
//         marginLeft: isSidebarOpen ? "240px" : "0px", // Adjust this as per your actual sidebar width
//       }}
//     >
//       {/* Carousel Section */}
//       <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
//         Recent Predictions
//       </Typography>  

//       <PredictionCarousel recentResults={recentResults} />

//       <hr />
      
//       {/* Upload Section */}
//       <Box sx={{ padding: "2rem", textAlign: "center" }}>
//         <Typography variant="h4" sx={{ mb: 2 }}>
//           Get AI Insights about Your Crop Diseases
//         </Typography>
//         <CropUpload setRecentResults={setRecentResults} />
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;










// import React, { useState } from 'react'
// import { Box, Typography, Paper, Divider } from "@mui/material";
// import CropUpload from './CropUpload';
// import PredictionCarousel from './PredictionCarousel';

// const HomePage = () => {
    
//   return (
//         <div>
        
//             <Box
//                 sx={{
//                 flexGrow: 1,
//                 p: 3,
//                 mt: "64px",
//                 marginLeft: isSidebarOpen ? "980px" : "0px",
//                 transition: "margin-left 0.3s ease-in-out",
//                 ...(isSidebarOpen && {
//                     transition: theme.transitions.create("margin", {
//                     easing: theme.transitions.easing.easeOut,
//                     duration: theme.transitions.duration.enteringScreen,
//                     }),
//                     marginLeft: 0,
//                 }),
//                 }}
//             >
//                 {/* Title */}
//                 <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>
//                 Recent Predictions
//                 </Typography>

//                 {/* Carousel of Recent Predictions */}
//                 <PredictionCarousel recentResults={recentResults} />

//                 {/* Upload Section */}
//                 <Box sx={{ padding: "2rem", textAlign: "center" }}>
//                 <Typography variant="h4" sx={{ mb: 2 }}>
//                     Get AI Insights about Your Crop Diseases
//                 </Typography>
//                 <CropUpload />
//                 </Box>
//             </Box>
//         </div>
//     );

  
// }

// export default HomePage

