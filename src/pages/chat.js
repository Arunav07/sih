import * as React from "react";
import Head from 'next/head';
const userProfileIcon = '/assets/avatars/avatar-anika-visser.png'
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Chat = () => {
  const [input, setInput] = React.useState("");
const [messages, setMessages] = React.useState([{ id: 1, text: "Hi there!", sender: "bot" },
{ id: 2, text: "Hello!", sender: "user" },
{ id: 3, text: "How can I assist you today?", sender: "user" },
{ id: 4, text: "I wanted to touch base regarding my case. Any updates?", sender: "bot"}])

  const handleSend = () => {
    if (input.trim() !== "") {
      console.log(input);
    //   console.log(messages[messages.length - 1].id);

      
      const message = {
        id: messages[messages.length - 1].id + 1,
        text: input,
        user: 'user' 
      }
      setMessages([...messages, message])
      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
    <Head>
      <title>
        Chat | Chanakya
      </title>
    </Head>
    <Typography 
    variant="h5"
    style = {{
        marginLeft: '10px',
        padding: "0px 75px 0px",
    }} 
    >Client</Typography>

    
  
    <Box
      sx={{
        height: "90%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
        width: "90%",
        margin: "auto",
        borderRadius: "20px"
        }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2,borderRadius: "20px"}}>
        {messages.map((message) => (
          <Message key={message.id} 
          message={message} />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container 
        spacing={2}>
          <Grid item 
          xs={10}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item 
          xs={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  );
};

const Message = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isBot ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        {/* <Avatar sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}>
          {isBot ? "B" : "U"}
        </Avatar>
        <Avatar
          src={userProfileIcon}
          sx={{
            height: 30,
            mb: 2,
            width: 30
          }}
        /> */}
        {isBot ? (
  <Avatar sx={{ bgcolor: "primary.main" }}>
    C
  </Avatar>
) : (
  <Avatar
    src={userProfileIcon}
    sx={{
      height: 50,
      mb: 2,
      width: 50
    }}
  />
)}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? "primary.light" : "",
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

Chat.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

export default Chat;