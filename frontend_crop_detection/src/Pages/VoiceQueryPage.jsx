
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Typography, Box, Container, Paper } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthContext } from "../Components/AuthContext";
import API from "../api";
import { useTranslation } from "react-i18next";

const VoiceQueryPage = () => {
  const { user } = useContext(AuthContext);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState(null);
  const navigate = useNavigate();

  const t = useTranslation()

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = async (event) => {
      const speech = event.results[0][0].transcript;
      console.log("Voice Query:", speech);
      setListening(false);
      setLoading(true);

      try {
        const response = await API.post("/genai/voice_query/", { query: speech });
        setInsight(response.data);
      } catch (err) {
        console.error("Voice AI error:", err);
      }

      setLoading(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 2 }}
      >
        Back to Home
      </Button>

      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Ask With Your Voice 🎙️
        </Typography>

        <Button
          variant="contained"
          onClick={startListening}
          color={listening ? "error" : "primary"}
          startIcon={listening ? <StopIcon /> : <MicIcon />}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {listening ? "Stop" : "Start Voice Query"}
        </Button>

        {loading && <CircularProgress sx={{ ml: 2 }} />}

        {insight && (
          <Box mt={4} textAlign="left">
            <Typography variant="h6">{t("AI Insight:")}</Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
              {t(insight.insight)}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default VoiceQueryPage;





















// import React, { useState } from "react";
// import { Button, CircularProgress, Typography } from "@mui/material";
// import MicIcon from "@mui/icons-material/Mic";
// import StopIcon from "@mui/icons-material/Stop";
// import API from "../api";

// const VoiceQuery = ({ token, onInsightReceived }) => {
//   const [listening, setListening] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const startListening = () => {
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.start();
//     setListening(true);

//     recognition.onresult = async (event) => {
//       const speech = event.results[0][0].transcript;
//       console.log("Voice Query:", speech);
//       setListening(false);
//       setLoading(true);

//       try {
//         const response = await API.post(
//             "/genai/voice_query/",
//           { query: speech },
          
//         );
//         onInsightReceived(response.data);
//       } catch (err) {
//         console.error("Voice AI error:", err);
//       }

//       setLoading(false);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       setListening(false);
//     };
//   };

//   return (
//     <div style={{ margin: "1rem" }}>
//       <Button
//         variant="contained"
//         onClick={startListening}
//         color={listening ? "error" : "primary"}
//         startIcon={listening ? <StopIcon /> : <MicIcon />}
//         disabled={loading}
//       >
//         {listening ? "Stop" : "Ask With Voice"}
//       </Button>
//       {loading && <CircularProgress style={{ marginLeft: "1rem" }} />}
//     </div>
//   );
// };

// export default VoiceQuery;
