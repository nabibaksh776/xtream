"use client";

import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import { useForm, Controller } from "react-hook-form";
import { FormControl, InputLabel, FormHelperText, Button } from "@mui/material";
import { Register } from "@/redux/Auth/apis";
import { useDispatch, useSelector } from "react-redux";
import { Label, Input } from "reactstrap";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
});

const Forms = () => {
  let dispatch = useDispatch();
  let router = useRouter();
  const [data, setData] = useState();
  let { user_registration } = useSelector((state) => state.Auth_States);

  // function to login after register
  const handleLogin = async () => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response.url !== null) {
      router.push("/setup-wizard");
    }

    if (response.error != null) {
      Swal.fire({
        title: "error",
        text: "Network error",
        icon: "error",
      });
    }
  };
  useEffect(() => {
    if (user_registration.isSuccess == true) {
      Swal.fire({
        title: "Success",
        text: "User Registered Successfully",
        icon: "success",
      });

      // function to login after register
      handleLogin();
    }
    if (user_registration.error !== null) {
      Swal.fire({
        title: "error",
        text: user_registration.error || "Network error",
        icon: "error",
      });
    }
  }, [user_registration]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema), // Integrate Yup validation schema with react-hook-form
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setData(data);
    dispatch(Register(data));
  };

  // Watch password field to compare with confirm password
  const password = watch("password");

  return (
    <div
      className="flex items-center justify-center m-auto w-full p-4"
      style={{ margin: "0px", padding: "0px", height: "100%" }}
    >
      <div className="w-full sm:w-[500px]">
        <div
          className="border-b p-3 mb-0 text-center flex justify-center"
          style={{ marginBottom: "20px" }}
        >
          <Logo />
        </div>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <FormControl
              fullWidth
              error={Boolean(errors.username)}
              margin="normal"
            >
              <Label htmlFor="username">Full Name</Label>
              <Controller
                name="username"
                control={control}
                defaultValue="" // Set defaultValue to avoid uncontrolled to controlled warning
                render={({ field }) => (
                  <Input
                    {...field}
                    id="username"
                    placeholder="Enter your username"
                  />
                )}
              />
              {errors.username && (
                <FormHelperText>{errors.username.message}</FormHelperText>
              )}
            </FormControl>

            {/* Email Field */}
            <FormControl
              fullWidth
              error={Boolean(errors.email)}
              margin="normal"
            >
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                defaultValue="" // Set defaultValue to avoid uncontrolled to controlled warning
                render={({ field }) => (
                  <Input {...field} id="email" placeholder="Enter your email" />
                )}
              />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>

            {/* Password Field */}
            <FormControl
              fullWidth
              error={Boolean(errors.password)}
              margin="normal"
            >
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                defaultValue="" // Set defaultValue to avoid uncontrolled to controlled warning
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                )}
              />
              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}
            </FormControl>

            {/* Confirm Password Field */}
            <FormControl
              fullWidth
              error={Boolean(errors.confirmPassword)}
              margin="normal"
            >
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue="" // Set defaultValue to avoid uncontrolled to controlled warning
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                  />
                )}
              />
              {errors.confirmPassword && (
                <FormHelperText>
                  {errors.confirmPassword.message}
                </FormHelperText>
              )}
            </FormControl>

            {/* Submit Button */}
            <Button
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Register
              {user_registration.loading ? (
                <>
                  <CircularProgress
                    className="ml-2"
                    color="inherit"
                    size={15}
                  ></CircularProgress>
                </>
              ) : (
                <></>
              )}
            </Button>

            <div className="text-center mt-3">
              <span>If you have an account? </span>
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forms;
