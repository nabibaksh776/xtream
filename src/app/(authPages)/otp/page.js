"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import loginImg from "@/assets/images/auth/otp.png";
import OTPInput from "@/components/otp/Otp";
import Link from "next/link";

import { Box, Grid, Typography, Button } from "@mui/material";

import { EmailOutlined } from "@mui/icons-material";

const Forms = () => {
  let router = useRouter();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema), // Integrate Yup validation schema with react-hook-form
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Form Data:", data);
  };

  return (
    <Grid container className="bg-white">
      <Grid
        item
        lg={7}
        md={7}
        sm={12}
        xs={12} // Ensures full width on extra small devices
        className="gradientBackgroundColor flex items-center justify-center p-6 md:p-12 lg:p-20" // Adjust padding for different devices
      >
        <Box
          style={{
            width: "90%", // Full width on smaller devices
            maxWidth: "500px", // Limit width on larger devices
            margin: "auto",
            border: "1px solid lightgray",
            height: "100%",
          }}
          className="p-6 md:p-12 rounded-lg flex items-center justify-center"
        >
          <img
            alt="auth image"
            src={loginImg.src}
            style={{
              width: "100%",
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        lg={5}
        md={5}
        sm={12}
        xs={12} // Full width for small devices
        className="flex items-center justify-center p-4"
      >
        <Box
        style={{width :"80%"}}
        >
          <Box className="mb-4">
            <Typography
              variant="h3"
              className="text-center" // Center align text
              style={{
                fontSize: "2rem", // Adjust font size for h3
                fontWeight: "bold", // Optional for emphasis
                marginBottom: "0.5rem", // Space below heading
              }}
            >
              OTP Code
            </Typography>
            <Typography
              variant="body1" // Use variant for consistency
              style={{
                fontSize: "1rem",
                color: "gray", // Subtle text color
              }}
              className="text-center text-primary"
            >
              Type the code we have sent you on your registered email
            </Typography>
          </Box>

          {/* otp component */}
          <OTPInput buttonName="Submit Code" loading={false} />

          <Box className="mt-4">
            <Typography className="text-center">
              Can be resend in 00:40
            </Typography>
            <Button className="bg-none m-auto block mt-2">Send</Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Forms;
