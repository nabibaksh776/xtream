"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import loginImg from "@/assets/images/auth/register.png";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import GoogleImg from "@/assets/images/icons/google.png";
import facebookImg from "@/assets/images/icons/facebook.png";
import Image from "next/image";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Grid,
  Typography,
  FormControl,
  Button,
  FormHelperText,
} from "@mui/material";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  LockOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

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
        <Box style={{ width: "80%" }}>
          <Box>
            <Typography
              variant="h3"
              className="text-center" // Center align text
              style={{
                fontSize: "2rem", // Adjust font size for h3
                fontWeight: "bold", // Optional for emphasis
                marginBottom: "0.5rem", // Space below heading
              }}
            >
              Create new account
            </Typography>
            <Typography
              variant="body1" // Use variant for consistency
              style={{
                fontSize: "1rem",
                color: "gray", // Subtle text color
              }}
              className="text-center text-primary"
            >
              Welcome back! Please enter your details
            </Typography>
          </Box>

          <form className="mt-5 mb-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2  w-full">
              {/* Email Field */}
              <Box>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type="text"
                        placeholder="Name"
                        className="h-[57px] w-full border rounded-lg px-2 pl-10 authInput"
                      />
                      <InputAdornment
                        position="start"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      >
                        <Person2OutlinedIcon className="text-primary" />
                      </InputAdornment>
                      {error && (
                        <span className="absolute text-red-500 text-xs left-2 bottom-[-18px]">
                          {error.message} {/* Display error message */}
                        </span>
                      )}
                    </div>
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type="text"
                        placeholder="username"
                        className="h-[57px] w-full border rounded-lg px-2 pl-10 authInput"
                      />
                      <InputAdornment
                        position="start"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      >
                        <Person2OutlinedIcon className="text-primary" />
                      </InputAdornment>
                      {error && (
                        <span className="absolute text-red-500 text-xs left-2 bottom-[-18px]">
                          {error.message} {/* Display error message */}
                        </span>
                      )}
                    </div>
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type="number"
                        placeholder="phone"
                        className="h-[57px] w-full border rounded-lg px-2 pl-10 authInput"
                      />
                      <InputAdornment
                        position="start"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      >
                        <LocalPhoneOutlinedIcon className="text-primary" />
                      </InputAdornment>
                      {error && (
                        <span className="absolute text-red-500 text-xs left-2 bottom-[-18px]">
                          {error.message} {/* Display error message */}
                        </span>
                      )}
                    </div>
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="h-[57px] w-full border rounded-lg px-2 pl-10 authInput"
                      />
                      <InputAdornment
                        position="start"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      >
                        <EmailOutlined className="text-primary" />
                      </InputAdornment>
                      {error && (
                        <span className="absolute text-red-500 text-xs left-2 bottom-[-18px]">
                          {error.message} {/* Display error message */}
                        </span>
                      )}
                    </div>
                  )}
                />
              </Box>
              <Box>
                {/* Password Field */}
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-[57px] w-full border border-[#13AAE0] rounded-lg px-2 pl-10 authInput"
                      />
                      <InputAdornment
                        position="start"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      >
                        <LockOutlined className="text-primary" />
                      </InputAdornment>
                      <InputAdornment
                        position="end"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? (
                            <VisibilityOffOutlined className="text-primary" />
                          ) : (
                            <VisibilityOutlined className="text-primary" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    </div>
                  )}
                />
              </Box>
              <Box>
                {/* Password Field */}
                <Controller
                  name="cpassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="confirm password"
                        className="h-[57px] w-full border border-[#13AAE0] rounded-lg px-2 pl-10 authInput"
                      />
                      <InputAdornment
                        position="start"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      >
                        <LockOutlined className="text-primary" />
                      </InputAdornment>
                      <InputAdornment
                        position="end"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? (
                            <VisibilityOffOutlined className="text-primary" />
                          ) : (
                            <VisibilityOutlined className="text-primary" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    </div>
                  )}
                />
              </Box>
            </div>

            <Box className="flex items-center justify-between mt-2">
              <Box className="flex items-center">
                <Checkbox defaultChecked className="text-primary" />
                <Typography>
                  Agree to our Terms and Conditions & Privacy Policy
                </Typography>
              </Box>
            </Box>

            <Box className="mt-4">
              <Button
                type="submit"
                className="w-full bg-primary text-white p-3"
              >
                Sign up
              </Button>
            </Box>

            <Box className="mt-4">
              <Typography className="text-center">Or Sign up with</Typography>
              <Box className="mt-3">
                <Button
                  className="w-full bg-white text-dark p-2 flex items-center"
                  style={{ border: "1px solid lightgray" }}
                >
                  <Image
                    className="mr-2"
                    alt="google icon"
                    src={GoogleImg.src}
                    width={30}
                    height={30}
                  />
                  Continue with google
                </Button>
                <Button
                  className="w-full bg-white text-dark p-2 flexi items-center mt-2"
                  style={{ border: "1px solid lightgray" }}
                >
                  <Image
                    className="mr-2"
                    alt="google icon"
                    src={facebookImg.src}
                    width={30}
                    height={30}
                  />
                  Continue with facebook
                </Button>
              </Box>
            </Box>
            <Box className="mt-4">
              <Typography className="text-center">
                Already have an account?
                <Link
                  href="/login"
                  className="text-blue-500 hover:underline ml-1"
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Forms;
