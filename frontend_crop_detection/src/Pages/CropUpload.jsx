// import React, { useState, useRef, useCallback } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Stack,
//   CircularProgress,
//   Box,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
// import CloseIcon from "@mui/icons-material/Close";
// import Webcam from "react-webcam";
// import API from "../api";
// import { keyframes } from '@emotion/react';

// const CropUpload = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [useCamera, setUseCamera] = useState(false);
//   const [showUploadInput, setShowUploadInput] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [facingMode, setFacingMode] = useState("user");
//   const webcamRef = useRef(null);

//   const videoConstraints = {
//     width: isMobile ? 300 : 500,
//     facingMode: facingMode,
//   };


//   const blinker = keyframes`
//     50% { opacity: 0.5; }
//     `;

//   const handleFileChange = (event) => {
//     setImageFile(event.target.files[0]);
//     setCapturedImage(null);
//     setPrediction(null);
//   };

//   const handleCapture = useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);
//     setUseCamera(false); // Stop camera preview
//   }, []);

//   const handleRetake = () => {
//     setCapturedImage(null);
//     setPrediction(null);
//     setUseCamera(true);
//   };

//   const handleFlipCamera = () => {
//     setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
//   };
// {
 


//   const handleUpload = async () => {
//     const formData = new FormData();

//     if (capturedImage) {
//       const blob = await fetch(capturedImage).then((res) => res.blob());
//       formData.append("image", blob, "captured.jpg");
//     } else if (imageFile) {
//       formData.append("image", imageFile);
//     } else return;

//     setLoading(true);
//     setShowAISuggestion(true); // Show GenAI is thinking...

//     try {
//       const response = await API.post("/upload/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const { result, confidence, ai_insights } = response.data;
//       setPrediction({ result, confidence, ai_insights });
//     } catch (error) {
//       console.error("Upload error:", error);
//       setPrediction({ result: "Error", confidence: 0, ai_insights: "Something went wrong." });
//     }

//     setLoading(false);
//     setShowAISuggestion(false); // Hide GenAI thinking

//     setLoading(true);
//     try {
//       const response = await API.post("/upload/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const { result, confidence, ai_insights } = response.data;
//       setPrediction({ result, confidence, ai_insights });
//     } catch (error) {
//       console.error("Upload error:", error);
//       setPrediction({ result: "Error", confidence: 0 });
//     }
//     setLoading(false);
//   };

//   };

//   //   setLoading(true);
//   //   try {
//   //     const response = await API.post("/upload/", formData, {
//   //       headers: { "Content-Type": "multipart/form-data" },
//   //     });

//   //     const { result, confidence, ai_insights } = response.data;
//   //     setPrediction({ result, confidence, ai_insights });
//   //   } catch (error) {
//   //     console.error("Upload error:", error);
//   //     setPrediction({ result: "Error", confidence: 0 });
//   //   }
//   //   setLoading(false);
//   // };

//   const handleClear = () => {
//     setImageFile(null);
//     setCapturedImage(null);
//     setPrediction(null);
//     setShowUploadInput(false);
//   };

//   return (
//     <Card
//       sx={{
//         maxWidth: 600,
//         margin: "auto",
//         mt: 4,
//         p: 3,
//         boxShadow: 4,
//         borderRadius: 3,
//         backgroundColor: "#f9f9f9",
//       }}
//     >
//       <CardContent>
//         <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600 }}>
//           Crop Image Analyzer
//         </Typography>

//         {/* Mode toggle buttons */}
//         <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
//           <Button
//             variant={!useCamera && !capturedImage ? "contained" : "outlined"}
//             startIcon={<CloudUploadIcon />}
//             onClick={() => {
//               setUseCamera(false);
//               setCapturedImage(null);
//               setShowUploadInput(true); // show file input
//             }}
//             sx={{ minWidth: 130 }}
//           >
//             Upload
//           </Button>
//           <Button
//             variant={useCamera || capturedImage ? "contained" : "outlined"}
//             startIcon={<CameraAltIcon />}
//             onClick={() => {
//               setUseCamera(true);
//               setCapturedImage(null);
//               setShowUploadInput(false); // hide file input
//             }}
//             sx={{ minWidth: 130 }}
//           >
//             Use Camera
//           </Button>
//         </Stack>

//         {/* Show file input only after Upload is clicked */}
//         {showUploadInput && !imageFile && (
//           <Box sx={{ mb: 3, textAlign: "center" }}>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Box>
//         )}

//         {/* Webcam view */}
//         {useCamera && !capturedImage && (
//           <Box sx={{ textAlign: "center", mb: 2 }}>
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               videoConstraints={videoConstraints}
//               style={{
//                 width: "100%",
//                 maxWidth: 500,
//                 borderRadius: 10,
//                 border: "2px solid #ccc",
//               }}
//             />
//             <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 1 }}>
//               <Button variant="contained" color="primary" onClick={handleCapture}>
//                 Capture
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 startIcon={<FlipCameraAndroidIcon />}
//                 onClick={handleFlipCamera}
//               >
//                 Flip Camera
//               </Button>
//             </Stack>
//           </Box>
//         )}

//         {/* Captured Image */}
//         {capturedImage && (
//           <Box sx={{ textAlign: "center", mb: 2 }}>
//             <img
//               src={capturedImage}
//               alt="Captured"
//               style={{
//                 width: "100%",
//                 maxWidth: 500,
//                 borderRadius: 10,
//                 border: "2px solid #1976d2",
//               }}
//             />
//             <Button variant="outlined" color="warning" sx={{ mt: 1 }} onClick={handleRetake}>
//               Retake
//             </Button>
//           </Box>
//         )}

//         {/* Upload and clear buttons */}
//         {(imageFile || capturedImage) && (
//           <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleUpload}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : "Upload & Analyze"}
//             </Button>
//             <Button
//               variant="outlined"
//               color="error"
//               startIcon={<CloseIcon />}
//               onClick={handleClear}
//             >
//               Clear
//             </Button>
//           </Stack>
//         )}


//         {showAISuggestion && (
//         <Box
//             sx={{
//             mt: 3,
//             p: 2,
//             borderRadius: 2,
//             backgroundColor: "#fff8e1",
//             border: "1px dashed #fbc02d",
//             boxShadow: 1,
//             animation: `${blinker} 1.5s linear infinite`,
//             }}
//         >
//             <Typography variant="subtitle1" color="warning.main">
//             🤖 Generating AI Suggestions...
//             </Typography>
//             <Typography
//             variant="body2"
//             sx={{
//                 mt: 1,
//                 fontStyle: "italic",
//                 color: "#888",
//                 fontFamily: "'Courier New', monospace",
//                 animation: "blinker 1.5s linear infinite",
//             }}
//             >
//             Analyzing image and retrieving insights...
//             </Typography>
//         </Box>
//         )}


//         {/* Prediction results */}
//         {prediction && (
//           <Box
//             sx={{
//               mt: 3,
//               p: 2,
//               borderRadius: 2,
//               backgroundColor: "#e3f2fd",
//               border: "1px solid #90caf9",
//               boxShadow: 1,
//             }}
//           >
//             <Typography variant="h6" color="primary">
//               Result: {prediction.result}
//             </Typography>
//             <Typography variant="body2" sx={{ mb: 1 }}>
//               Confidence: {(prediction.confidence * 100).toFixed(2)}%
//             </Typography>
//             <Typography variant="body1" sx={{ color: "#333" }}>
//               <strong>Insights:</strong> {prediction.ai_insights}
//             </Typography>
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default CropUpload;





import React, { useState, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import CloseIcon from "@mui/icons-material/Close";
import Webcam from "react-webcam";
import API from "../api";
import { keyframes } from "@emotion/react";

const CropUpload = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [useCamera, setUseCamera] = useState(false);
  const [showUploadInput, setShowUploadInput] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: isMobile ? 300 : 500,
    facingMode: facingMode,
  };

  const blinker = keyframes`
    50% { opacity: 0.5; }
  `;

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
    setCapturedImage(null);
    setPrediction(null);
  };

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setUseCamera(false);
  }, []);

  const handleRetake = () => {
    setCapturedImage(null);
    setPrediction(null);
    setUseCamera(true);
  };

  const handleFlipCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if (capturedImage) {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      formData.append("image", blob, "captured.jpg");
    } else if (imageFile) {
      formData.append("image", imageFile);
    } else return;

    setLoading(true);
    setShowAISuggestion(true);

    try {
      const response = await API.post("/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { result, confidence, ai_insights } = response.data;
      setPrediction({ result, confidence, ai_insights });
    } catch (error) {
      console.error("Upload error:", error);
      setPrediction({
        result: "Error",
        confidence: 0,
        ai_insights: "Something went wrong.",
      });
    }

    setLoading(false);
    setShowAISuggestion(false);
  };

  const handleClear = () => {
    setImageFile(null);
    setCapturedImage(null);
    setPrediction(null);
    setShowUploadInput(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 3,
        boxShadow: 4,
        borderRadius: 3,
        backgroundColor: "#f9f9f9",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: 600 }}
        >
          Crop Image Analyzer
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <Button
            variant={!useCamera && !capturedImage ? "contained" : "outlined"}
            startIcon={<CloudUploadIcon />}
            onClick={() => {
              setUseCamera(false);
              setCapturedImage(null);
              setShowUploadInput(true);
            }}
            sx={{ minWidth: 130 }}
          >
            Upload
          </Button>
          <Button
            variant={useCamera || capturedImage ? "contained" : "outlined"}
            startIcon={<CameraAltIcon />}
            onClick={() => {
              setUseCamera(true);
              setCapturedImage(null);
              setShowUploadInput(false);
            }}
            sx={{ minWidth: 130 }}
          >
            Use Camera
          </Button>
        </Stack>

        {showUploadInput && !imageFile && (
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginBottom: "1rem" }}
            />
          </Box>
        )}

        {useCamera && !capturedImage && (
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{
                width: "100%",
                maxWidth: 500,
                borderRadius: 10,
                border: "2px solid #ccc",
              }}
            />
            <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 1 }}>
              <Button variant="contained" color="primary" onClick={handleCapture}>
                Capture
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<FlipCameraAndroidIcon />}
                onClick={handleFlipCamera}
              >
                Flip Camera
              </Button>
            </Stack>
          </Box>
        )}

        {capturedImage && (
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src={capturedImage}
              alt="Captured"
              style={{
                width: "100%",
                maxWidth: 500,
                borderRadius: 10,
                border: "2px solid #1976d2",
              }}
            />
            <Button variant="outlined" color="warning" sx={{ mt: 1 }} onClick={handleRetake}>
              Retake
            </Button>
          </Box>
        )}

        {(imageFile || capturedImage) && (
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Upload & Analyze"}
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CloseIcon />}
              onClick={handleClear}
            >
              Clear
            </Button>
          </Stack>
        )}

        {showAISuggestion && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#fff8e1",
              border: "1px dashed #fbc02d",
              boxShadow: 1,
              animation: `${blinker} 1.5s linear infinite`,
            }}
          >
            <Typography variant="subtitle1" color="warning.main">
              🤖 Generating AI Suggestions...
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontStyle: "italic",
                color: "#888",
                fontFamily: "'Courier New', monospace",
              }}
            >
              Analyzing image and retrieving insights...
            </Typography>
          </Box>
        )}

        {prediction && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#e3f2fd",
              border: "1px solid #90caf9",
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" color="primary">
              Result: {prediction.result}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Confidence: {(prediction.confidence * 100).toFixed(2)}%
            </Typography>
            <Typography variant="body1" sx={{ color: "#333" }}>
              <strong>Insights:</strong> {prediction.ai_insights}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CropUpload;
