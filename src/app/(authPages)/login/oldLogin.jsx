"use client";

import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import { useForm, Controller } from "react-hook-form";
import { FormControl, InputLabel, FormHelperText, Button } from "@mui/material";
import { Label, Input } from "reactstrap";
import { signIn } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Forms = () => {
  let router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema), // Integrate Yup validation schema with react-hook-form
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Form Data:", data);

    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log("this is response--", response);
    if (response.url !== null) {
      router.push("/dashboard");
    }
    if (response.error !== null) {
      Swal.fire({
        title: "error",
        text: "Email or password incorrect",
        icon: "error",
      });
      setLoading(false);
    }
  };

  // Watch password field to compare with confirm password
  const password = watch("password");

  return (
    <div
      className="flex items-center justify-center m-auto w-full p-4"
      style={{ margin: "0px", padding: "0px", height: "100%" }}
    >
      {/* old login form */}
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

            {/* Submit Button */}
            <Button
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
              {loading ? (
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
              <Link href="/register" className="text-blue-500 hover:underline">
                register
              </Link>
            </div>
            <div className="text-center mt-3">
              <Link href="/forgot" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forms;
