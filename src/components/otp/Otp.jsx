"use client";
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import dynamic from "next/dynamic";
// Dynamically import ReactCodeInput to prevent Strict Mode warning
const ReactCodeInput = dynamic(() => import("react-code-input"), {
  ssr: false,
});
import "./OTPInput.css"; // Ensure this file exists and has proper styles
function OTPInput({ buttonName, loading }) {
  const [input, setInput] = useState(""); // OTP input state
  const [errorMsg, setErrorMsg] = useState(""); // Error message state
  const [isClient, setIsClient] = useState(false); // State to check client-side rendering

  // Triggered after the first render to ensure the component is mounted on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const inputStyle = React.useMemo(
    () => ({
      margin: "8px",
      MozAppearance: "textfield", // For Firefox
      width: "70px",
      height: "70px",
      borderRadius: "5px",
      fontSize: "24px",
      paddingLeft: "7px",
      color: "black",
      border: errorMsg ? "1px solid red" : "1px solid #0b3c95", // Conditionally add border color based on error
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.09)",
      fontWeight: "bold",
      textAlign: "center",
      appearance: "textfield",
    }),
    [errorMsg]
  );

  const handleVarifyFunction = async () => {
    console.log("Input values are:", input);
    const email = sessionStorage.getItem("email");

    if (!email) {
      setErrorMsg("Email not found in session.");
      return;
    }

    // Add your logic to verify OTP here (e.g., API call)
    // Example:
    // const response = await verifyOTP({ otp: input, email });
    // if (response.success) { // Handle success }
  };

  const handleButtonClick = () => {
    if (input.length !== 5) {
      setErrorMsg("Please enter a valid OTP.");
    } else {
      setErrorMsg(""); // Clear error message if input is valid
      console.log("OTP Submitted:", input);
      handleVarifyFunction(); // Call the verification function
    }
  };

  if (!isClient) {
    return null; // Return nothing until the client-side is ready
  }

  return (
    <Box>
      <div className="flex justify-center items-center mb-[10px]">
        <ReactCodeInput
          type="number"
          fields={5}
          inputMode="numeric"
          onChange={(e) => {
            const numericValue = e.replace(/[^0-9]/g, ""); // Remove non-numeric characters
            setInput(numericValue);
            setErrorMsg(""); // Clear error when input changes
          }}
          value={input}
          className="reactCodeInput border-primary"
          inputStyle={inputStyle}
        />
      </div>
      <div className="text-center text-red-500">{errorMsg}</div>{" "}
      <Button
        type="button"
        variant="contained"
        className="mt-4 py-4 mainFonts bg-primary"
        fullWidth
        onClick={handleButtonClick}
        disabled={loading}
      >
        {buttonName || "Verify"}
      </Button>
    </Box>
  );
}

export default OTPInput;
