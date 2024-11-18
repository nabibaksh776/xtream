import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  Grid,
  Paper
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { AddSetupWizardField } from "@/redux/GlobalStates/GlobalStates";
// Yup schema for validation
const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("companyName is required"),
  NumberofEmploye: Yup.string().required("Number of Employee"),
  S_admin_f_l_name: Yup.string().required(
    "Super admin first and last name is required"
  ),
  EmailAddress: Yup.string()
    .email("Please enter a valid email address") // Email validation
    .required("Email address is required"),
});

function Step1({ handleTab }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { setupWizard } = useSelector((state) => state.Gobal_States);

  // Setup form with validation schema using yupResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add setValue from useForm for default value handling
  } = useForm({
    resolver: yupResolver(validationSchema), // Applying Yup validation schema
  });

  // onSubmit function
  const onSubmit = (data, event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("form data is ", data);
    dispatch(AddSetupWizardField(data));
    handleTab(1);
  };

  return (
    <Paper className="shadow-sm p-8 bg-white rounded-md mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Grid container spacing={4}>
          <Grid item sm={12} md={4} lg={4}>
            <InputLabel
              htmlFor="url"
              sx={{
                fontSize: "16px",
                fontWeight: 580,
                color: "primary.main",
                marginBottom: "6px",
              }}
              className="text-dark"
            >
              Company Name
            </InputLabel>
            <TextField
              id="companyName"
              placeholder="Enter Company Name "
              variant="outlined"
              fullWidth
              {...register("companyName")} // React Hook Form register
              error={!!errors.companyName} // Show error state
              helperText={errors.companyName?.message} // Display error message
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <InputLabel
              htmlFor="url"
              sx={{
                fontSize: "16px",
                fontWeight: 580,
                color: "primary.main",
                marginBottom: "6px",
              }}
              className="text-dark"
            >
              Super Admins First and Last Name
            </InputLabel>
            <TextField
              id="S_admin_f_l_name"
              placeholder="Super Admins First and Last Name "
              variant="outlined"
              fullWidth
              {...register("S_admin_f_l_name")} // React Hook Form register
              error={!!errors.S_admin_f_l_name} // Show error state
              helperText={errors.S_admin_f_l_name?.message} // Display error message
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <InputLabel
              htmlFor="url"
              sx={{
                fontSize: "16px",
                fontWeight: 580,
                color: "primary.main",
                marginBottom: "6px",
              }}
              className="text-dark"
            >
              Email Address
            </InputLabel>
            <TextField
              id="EmailAddress"
              placeholder="Email Address"
              variant="outlined"
              fullWidth
              {...register("EmailAddress")} // React Hook Form register
              error={!!errors.EmailAddress} // Show error state
              helperText={errors.EmailAddress?.message} // Display error message
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <InputLabel
              htmlFor="url"
              sx={{
                fontSize: "16px",
                fontWeight: 580,
                color: "primary.main",
                marginBottom: "6px",
              }}
              className="text-dark"
            >
              Number of Employees
            </InputLabel>
            
            <TextField
              id="NumberofEmploye"
              placeholder="Number of Employees"
              variant="outlined"
              fullWidth
              type="number"
              {...register("NumberofEmploye")}
              error={!!errors.NumberofEmploye}
              helperText={errors.NumberofEmploye?.message}
              inputProps={{
                min: 1, // Minimum value (e.g., 1 employee)
                max: 1000, // Maximum value (e.g., 1000 employees)
                step: 1, // Step for incrementing the value
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        {/* next button here */}
        <Box
          className="flex items-center justify-end"
          sx={{ marginTop: "86px" }}
        >
          
          <Button
            type="submit"
            sx={{
              borderRadius: "8px",
              color: "white",
              backgroundColor: "primary.main",
              border: "1px solid transparent",
              boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              minWidth: "130px",
              marginLeft: "20px",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Step1;
