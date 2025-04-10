import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PredictionCarousel = ({ recentResults = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const itemsPerSlide = 3;

  const visibleResults = recentResults.slice(
    currentIndex,
    currentIndex + itemsPerSlide
  );

  useEffect(() => {
    if (!paused && recentResults.length > itemsPerSlide) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex + itemsPerSlide >= recentResults.length ? 0 : prevIndex + itemsPerSlide
        );
      }, 5000); // Auto-slide every 10 seconds

      return () => clearInterval(interval);
    }
  }, [paused, currentIndex, recentResults.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerSlide < 0
        ? Math.max(recentResults.length - itemsPerSlide, 0)
        : prevIndex - itemsPerSlide
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= recentResults.length ? 0 : prevIndex + itemsPerSlide
    );
  };

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        px: 2,
        position: "relative",
      }}
    >
      {/* Prev Button */}
      {recentResults.length > itemsPerSlide && (
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 10,
            zIndex: 10,
            color: "white",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      )}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          transition: "transform 0.6s ease-in-out",
        }}
      >
        {visibleResults.map((res, index) => (
          <Paper
            key={index}
            elevation={6}
            sx={{
              width: 300,
              minHeight: 360,
              p: 2,
              backgroundColor: "#005898",
              color: "#fff",
              textAlign: "center",
              borderRadius: 2,
              flexShrink: 0,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                backgroundColor: "#004070",
              },
            }}
          >
            <Typography variant="h6">{res.result}</Typography>
            <Divider sx={{ my: 1, backgroundColor: "#ffffff50" }} />
            <Box
              component="img"
              src={res.image}
              alt={`Prediction ${index}`}
              sx={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Confidence: {(res.confidence * 100).toFixed(2)}%
            </Typography>
            <Box
              sx={{
                mt: 1,
                maxHeight: 80,
                overflowY: "auto",
                p: 1,
                backgroundColor: "#003f6b",
                borderRadius: 2,
                fontSize: "0.85rem",
              }}
            >
              {res.ai_insights}
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Next Button */}
      {recentResults.length > itemsPerSlide && (
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 10,
            zIndex: 10,
            color: "white",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default PredictionCarousel;




















// import React, { useState, useEffect } from "react";
// import { Box, Typography, Paper, Divider } from "@mui/material";

// const PredictionCarousel = ({ recentResults }) => {
//   const itemsPerSlide = 3;
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [paused, setPaused] = useState(false);

//   useEffect(() => {
//     if (paused) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) =>
//         (prev + itemsPerSlide) % recentResults.length
//       );
//     }, 10000); // Slide every 10 seconds

//     return () => clearInterval(interval);
//   }, [paused, recentResults.length]);

//   // Slice current group
//   const visibleResults = recentResults.slice(
//     currentIndex,
//     currentIndex + itemsPerSlide
//   );

//   return (
//     <Box
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       sx={{
//         overflow: "hidden",
//         width: "100%",
//         mt: 4,
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           transition: "transform 0.6s ease-in-out",
//           transform: `translateX(-${(currentIndex / itemsPerSlide) * 100}%)`,
//         }}
//       >
//         {recentResults.map((res, index) => (
//           <Box
//             key={index}
//             sx={{
//               flex: `0 0 ${100 / itemsPerSlide}%`, // 3 items per view
//               p: 2,
//             }}
//           >
//             <Paper
//               elevation={6}
//               sx={{
//                 p: 2,
//                 backgroundColor: "#005898",
//                 color: "#fff",
//                 textAlign: "center",
//                 borderRadius: 2,
//                 transition: "transform 0.3s ease",
//                 "&:hover": {
//                   transform: "scale(1.03)",
//                   backgroundColor: "#004070",
//                 },
//               }}
//             >
//               <Typography variant="h6">{res.result}</Typography>
//               <Divider sx={{ my: 1, backgroundColor: "#ffffff60" }} />

//               <Box
//                 component="img"
//                 src={res.image}
//                 alt={`Prediction ${index}`}
//                 sx={{
//                   width: "100%",
//                   maxHeight: "200px",
//                   objectFit: "cover",
//                   borderRadius: 2,
//                   mb: 1,
//                 }}
//               />

//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Confidence: {(res.confidence * 100).toFixed(2)}%
//               </Typography>

//               <Box
//                 sx={{
//                   maxHeight: 120,
//                   overflowY: "auto",
//                   p: 1,
//                   backgroundColor: "#003f6b",
//                   borderRadius: 2,
//                   fontSize: "0.875rem",
//                 }}
//               >
//                 {res.ai_insights}
//               </Box>
//             </Paper>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default PredictionCarousel;
