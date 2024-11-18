import React, { useState } from "react";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

// chicons
import botImag from "@/assets/images/icons/header/image2.png";
import FilterImg from "@/assets/images/icons/header/Filter.png";
import SuitcaseImg from "@/assets/images/icons/header/Suitcase.png";
import TicketImg from "@/assets/images/icons/header/Ticket.png";
import Document from "@/assets/images/icons/header/Document.png";

import SendImg from "@/assets/images/icons/header/Send.png";
import ScrollToBottom from "react-scroll-to-bottom";
const ChatbotPopup = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleToggle = () => setOpen(!open);
  const [badges, setBadges] = useState([
    { label: "Ticket", icon: TicketImg.src },
    { label: "Task", icon: SuitcaseImg.src },
    { label: "Funnels", icon: FilterImg.src },
    { label: "Docs", icon: Document.src },
  ]);

  //   handle Send message
  const handleSendMessage = () => {
    console.log("this is input--", input);

    let userQuery = { content: input, role: "user" };
    setMessages((prevData) => {
      return [...prevData, userQuery];
    });
    // after submit in last clear the query value
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <IconButton
        onClick={handleToggle}
        className="fixed bottom-5 right-5 bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
        style={{ zIndex: 1300 }}
      >
        <ChatIcon sx={{ fontSize: "50px" }} />
      </IconButton>

      {/* Chat Dialog */}
      <Dialog
        open={open}
        onClose={handleToggle}
        style={{ borderRadius: "20px" }}
      >
        <Box
          className="w-96 bg-white rounded-lg overflow-hidden relative flex flex-col justify-between items-center"
          style={{ width: "500px" }}
        >
          {/* Header */}
          <Box className="w-full bg-blue-500 text-white p-4 flex justify-between items-center">
            <Box className="flex items-center">
              <img
                src={botImag.src} // Replace with your chatbot icon
                alt="Chatbot"
                className="w-8 h-8 rounded-full mr-2"
              />
              <Typography className="font-sm">Hi There 👋</Typography>
            </Box>
            <IconButton onClick={handleToggle} className="text-white">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Navigation Tabs */}
          {messages.length > 0 ? (
            <>
              <ScrollToBottom
                className="p-4 flex flex-col gap-2 w-full h-[380px]"
                style={{
                  overflowY: "auto",
                }}
              >
                {messages.map((message, idx) => (
                  <Box
                    key={idx}
                    className="text-white p-3 self-end"
                    style={{
                      backgroundColor: "#344054",
                      borderTopRightRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      borderTopLeftRadius: "10px",
                      marginTop: "10px",
                      marginLeft: "auto",
                      maxWidth: "250px",
                    }}
                  >
                    {message.content}
                  </Box>
                ))}
              </ScrollToBottom>
            </>
          ) : (
            <>
              <Box
                style={{
                  flexGlrow: "1",
                  overflowX: "auto",
                }}
              >
                <Box className="flex gap-2 p-4">
                  {badges.map((item, index) => (
                    <Button
                      key={index}
                      className="text-white hover:bg-gray-300 rounded-[10px] px-4 py-2 capitalize flex items-center justify-between"
                      style={{
                        backgroundColor: "#344054",
                      }}
                    >
                      {item.label}
                      <img
                        src={item.icon}
                        className="ml-2"
                        //   style={{
                        //     width: "20px",
                        //     height: "20px",
                        //   }}
                      />
                    </Button>
                  ))}
                </Box>

                {/* Suggestions Section */}
                <Box className="p-4">
                  <Typography className="font-xl mb-2">Suggestions</Typography>
                  <Box className="grid grid-cols-3 gap-2">
                    {[...Array(3)].map((_, idx) => (
                      <Box
                        key={idx}
                        className="bg-gray-100 rounded-lg p-2 text-sm text-gray-600 text-center"
                      >
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Recent Notifications */}
                <Box className="p-4">
                  <Typography className="font-xl mb-2">
                    Recent Notifications
                  </Typography>
                  <Box className="grid grid-cols-2 gap-2">
                    {[...Array(4)].map((_, idx) => (
                      <Box
                        key={idx}
                        className="bg-gray-100 rounded-lg p-2 text-sm text-gray-600 text-center"
                      >
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Recent Notifications */}
                <Box className="p-4">
                  <Typography className="font-xl mb-2">
                    Recent Notifications
                  </Typography>
                  <Box className="grid grid-cols-2 gap-2">
                    {[...Array(4)].map((_, idx) => (
                      <Box
                        key={idx}
                        className="bg-gray-100 rounded-lg p-2 text-sm text-gray-600 text-center"
                      >
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </>
          )}

          {/* input Box for sending message */}
          <Box className="w-full p-4 flex flex-col gap-2">
            {/* type mesage Box */}
            <Box className="flex items-center">
              <input
                placeholder="Ask anything"
                variant="outlined"
                size="small"
                className="bg-gray-100"
                value={input}
                style={{
                  padding: "13px",
                  flexGrow: "1",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button
                style={{
                  borderRadius: "0px",
                  color: "white",
                  border: "1px solid transparent",
                  padding: "12px",
                  backgroundColor: "#2962ff",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
                onClick={handleSendMessage}
              >
                <img
                  src={SendImg.src}
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                />
              </button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ChatbotPopup;
