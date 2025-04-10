import React from 'react';
import { Paper, Typography, Divider, Box } from '@mui/material';

const HistoryPage = ({ result }) => {
  return (
    <Paper elevation={6} sx={{ p: 3, backgroundColor: "#005898", color: "#fff", textAlign: "center" }}>
      <Typography variant="h5">{result.result}</Typography>
      <Divider sx={{ my: 2, backgroundColor: "#fff" }} />
      <Box
        component="img"
        src={result.image}
        alt="Crop Prediction"
        sx={{ width: "100%", maxHeight: 300, borderRadius: 2, objectFit: "cover" }}
      />
      <Typography variant="body1" mt={2}>
        Confidence: {(result.confidence * 100).toFixed(2)}%
      </Typography>
      <Box
        sx={{
          mt: 2,
          backgroundColor: "#003f6b",
          p: 2,
          borderRadius: 2,
          fontSize: "0.9rem",
        }}
      >
        {result.ai_insights}
      </Box>
    </Paper>
  );
};

export default HistoryPage;
