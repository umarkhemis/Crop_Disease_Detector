

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const HelpPage = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ message: input }),
        body: JSON.stringify({ query: input }),
      });
      const data = await res.json();
      const botReply = { from: "bot", text: data.reply || "Sorry, I didn’t get that." };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Server error. Try again later." },
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        marginTop: '90px'
      }}
    >
      <Box sx={{ p: 2, backgroundColor: "#1976d2", color: "white",    }}>
        <Typography variant="h6">🌾 AgriBot Uganda</Typography>
        <Typography variant="body2">Ask me anything about crop diseases, app usage, or farming tips!</Typography>
      </Box>
      <Divider />
      <Box
        ref={chatRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                p: 1.5,
                borderRadius: 2,
                backgroundColor: msg.from === "user" ? "#1976d2" : "#e0e0e0",
                color: msg.from === "user" ? "#fff" : "#000",
              }}
            >
              <Typography variant="body2">{msg.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Divider />
      <Box sx={{ display: "flex", p: 2 }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default HelpPage;        