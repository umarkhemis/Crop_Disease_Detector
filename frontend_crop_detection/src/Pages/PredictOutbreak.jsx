
import React, { useState, useContext } from "react";
import {
  Box, Typography, Select, MenuItem, Button, FormControl,
  InputLabel, CircularProgress, Card, CardContent
} from "@mui/material";
import API from "../api";
import { AuthContext } from "../Components/AuthContext";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PredictOutbreak = () => {
  const { user } = useContext(AuthContext);
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await API.post(
        "/predict-outbreak/",
        { crop, region, timeframe },
        { headers: { Authorization: `Token ${user.token}` } }
      );
      setPrediction(response.data);
    } catch (err) {
      console.error("Prediction error:", err);
    }
    setLoading(false);
  };

  return (
    <Box p={4} sx={{marginTop: '30px'}}>
      <Button variant="outlined" onClick={() => navigate("/")}>← Back to Home</Button>

      <Typography variant="h4" mb={3}>🌾 Predict Crop Pest & Disease Outbreak</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Crop</InputLabel>
        <Select value={crop} onChange={(e) => setCrop(e.target.value)} label="Crop">
          <MenuItem value="maize">Maize</MenuItem>
          <MenuItem value="beans">Beans</MenuItem>
          <MenuItem value="cassava">Cassava</MenuItem>
          <MenuItem value="tomato">Tomato</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Region</InputLabel>
        <Select value={region} onChange={(e) => setRegion(e.target.value)} label="Region">
          <MenuItem value="Western Uganda">Western Uganda</MenuItem>
          <MenuItem value="Central Uganda">Central Uganda</MenuItem>
          <MenuItem value="Eastern Uganda">Eastern Uganda</MenuItem>
          <MenuItem value="Northern Uganda">Northern Uganda</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Timeframe</InputLabel>
        <Select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} label="Timeframe">
          <MenuItem value="next week">Next Week</MenuItem>
          <MenuItem value="next month">Next Month</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Predict"}
      </Button>

      {prediction && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6">🧠 Prediction:</Typography>
            <Typography>{prediction.prediction}</Typography>
            <Typography variant="body2" color="text.secondary">
              Confidence: {prediction.confidence * 100}%
            </Typography>

            {prediction.historical_trend && (
              <Box mt={4}>
                <Typography variant="h6">📊 Historical Outbreak Trend:</Typography>
                <Line
                  data={{
                    labels: prediction.historical_trend.map((h) => h.month),
                    datasets: [
                      {
                        label: "Outbreak Severity",
                        data: prediction.historical_trend.map((h) => h.severity),
                        fill: false,
                        // borderColor: "#1976d2",
                        borderColor: "gray",
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: { min: 0, max: 1, ticks: { callback: v => `${v * 100}%` } }
                    },
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PredictOutbreak;


































// import React, { useState, useContext } from "react";
// import {
//   Box, Typography, Select, MenuItem, Button, FormControl,
//   InputLabel, CircularProgress, Card, CardContent
// } from "@mui/material";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";
// import API from "../api";
// import { AuthContext } from "../Components/AuthContext";
// import { useNavigate } from "react-router-dom";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const PredictOutbreak = () => {
//   const { user } = useContext(AuthContext);
//   const [crop, setCrop] = useState("");
//   const [region, setRegion] = useState("");
//   const [timeframe, setTimeframe] = useState("");
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const response = await API.post(
//         "/predict-outbreak/",
//         { crop, region, timeframe },
//         {
//           headers: {
//             Authorization: `Token ${user.token}`,
//           },
//         }
//       );
//       setPrediction(response.data);
//     } catch (err) {
//       console.error("Prediction error:", err);
//     }
//     setLoading(false);
//   };

//   // Prepare chart data
//   const chartData = prediction?.confidence && {
//     labels: [prediction.prediction],
//     datasets: [
//       {
//         label: "Prediction Confidence",
//         data: [prediction.confidence * 100], // assuming confidence is a decimal (e.g., 0.85)
//         backgroundColor: "#4caf50",
//       },
//     ],
//   };

//   return (
//     <Box p={4} sx={{marginTop: '30px'}}>
//       <Button variant="outlined" onClick={() => navigate("/")}>← Back to Home</Button>

//       <Typography variant="h4" mb={3}>🌾 Predict Crop Pest & Disease Outbreak</Typography>

//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Crop</InputLabel>
//         <Select value={crop} onChange={(e) => setCrop(e.target.value)} label="Crop">
//           <MenuItem value="maize">Maize</MenuItem>
//           <MenuItem value="beans">Beans</MenuItem>
//           <MenuItem value="cassava">Cassava</MenuItem>
//           <MenuItem value="tomato">Tomato</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Region</InputLabel>
//         <Select value={region} onChange={(e) => setRegion(e.target.value)} label="Region">
//           <MenuItem value="Western Uganda">Western Uganda</MenuItem>
//           <MenuItem value="Central Uganda">Central Uganda</MenuItem>
//           <MenuItem value="Eastern Uganda">Eastern Uganda</MenuItem>
//           <MenuItem value="Northern Uganda">Northern Uganda</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Timeframe</InputLabel>
//         <Select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} label="Timeframe">
//           <MenuItem value="next week">Next Week</MenuItem>
//           <MenuItem value="next month">Next Month</MenuItem>
//         </Select>
//       </FormControl>

//       <Button variant="contained" onClick={handleSubmit} disabled={loading}>
//         {loading ? <CircularProgress size={24} /> : "Predict"}
//       </Button>

//       {prediction && (
//         <Card sx={{ mt: 4, p: 2 }}>
//           <CardContent>
//             <Typography variant="h6">🧠 Prediction Result</Typography>
//             <Typography variant="body1">Prediction: <strong>{prediction.prediction}</strong></Typography>

//             {prediction.confidence && (
//               <>
//                 <Typography variant="body2" color="text.secondary" mt={1}>
//                   Confidence: {(prediction.confidence * 100).toFixed(2)}%
//                 </Typography>
//                 <Box mt={3}>
//                   <Bar
//                     data={chartData}
//                     options={{
//                       responsive: true,
//                       plugins: {
//                         legend: { display: false },
//                         title: { display: true, text: "Confidence Level (%)" },
//                       },
//                       scales: {
//                         y: { beginAtZero: true, max: 100 }
//                       }
//                     }}
//                   />
//                 </Box>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// };

// export default PredictOutbreak;
