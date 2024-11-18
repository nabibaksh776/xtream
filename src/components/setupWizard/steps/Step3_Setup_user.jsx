import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Divider,
  TextField,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { AddSetupWizardField } from "@/redux/GlobalStates/GlobalStates";
import CloseIcon from "@mui/icons-material/Close";

const { Country, State, City } = require("country-state-city");

function Step1({ handleTab }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const countries = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState({});
  const [states, setStates] = useState([]);
  const [countryList, setCountryList] = useState([
    {
      currency: null,
      flag: null,
      isoCode: null,
      latitude: null,
      longitude: null,
      name: "Global",
      phonecode: null,
    },
    ...countries,
  ]);

  // Yup schema for validation
  const validationSchema = Yup.object().shape({
    teemName: Yup.string()
      .required("Teem Name required")
      .oneOf(
        ["enterprise", "mid-market", "smb", "commercial", "custom"],
        "Select Teem Name"
      ),
    customTeamName: Yup.string(),
    country: Yup.string().required("Country required"),
    states: Yup.string().required("State required"),
    numTeamMembers: Yup.string().required("Number of Team Members required"),
    SalesRoles: Yup.string().required("Sales Roles required"),
  });

  const { setupWizard } = useSelector((state) => state.Gobal_States);
  const [isCustomField, setIsCustomField] = useState(false);
  const [teemNameList, setTeamList] = useState([
    { name: "enterprise", value: "Enterprise" },
    { name: "mid-market", value: "Mid-market" },
    { name: "smb", value: "SMB" },
    { name: "commercial", value: "Commercial" },
    { name: "custom", value: "Custom" },
  ]);

  // Setup form with validation schema using yupResolver
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema), // Applying Yup validation schema
    defaultValues: {
      teamName: "", // Initialize teamName to avoid uncontrolled input issues
    },
  });

  // onSubmit function
  const onSubmit = (data) => {
    console.log("Form data is: ", data);
    dispatch(AddSetupWizardField(data));
    handleTab(3); // Go to the next tab
  };

  // handle select country
  const handleSelectCountry = (value) => {
    console.log("countries---", countries);
    const curentCountry = countries.find((country) => country.name === value);
    setSelectedCountry(curentCountry);
    const states_list = State.getStatesOfCountry(curentCountry.isoCode);
    setStates(states_list);
  };

  return (
    <Box className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Section 1 */}
        <Paper className="p-8 rounded-md bg-white">
          <Box>
            <Box className="mb-4">
              <Typography className="text-[16px] font-poppins font-bold text-left text-dark">
                1. User Information
              </Typography>
            </Box>
          </Box>
          {/* Grid 1 */}
          <Grid container spacing={4}>
            {/* Team Name */}
            <Grid item sm={12} md={4} lg={4}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>User Type</label>
                <Controller
                  name="teemLeader"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <select
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="teemLeader"
                      {...field} // Pass field props to the Select component
                      label="User Type"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    >
                      <option>User 1</option>
                      <option>User 2</option>
                    </select>
                  )}
                />
                {errors.teemLeader && (
                  <FormHelperText>{errors.teemLeader.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          {/* step 2 */}
          <Box className="mt-5">
            <Box className="mb-4">
              <Typography className="text-[16px] font-poppins font-bold text-left text-dark">
                2. Personal Info
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={4}>
            {/* Team Name */}
            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>First Name</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      label="Win Rate Goal(%)"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>Last Name</label>
                <Controller
                  name="teemLeader"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      label="Win Rate Goal(%)"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemLeader && (
                  <FormHelperText>{errors.teemLeader.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>Email Address</label>
                <Controller
                  name="country"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      label="Win Rate Goal(%)"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.country && (
                  <FormHelperText>{errors.country.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* state dropdown */}
            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>Phone Number</label>
                <Controller
                  name="states"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      label="Win Rate Goal(%)"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.states && (
                  <FormHelperText>{errors.states.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          {/* Step 3 */}
          <Box className="mt-5">
            <Box className="mb-4">
              <Typography className="text-[16px] font-poppins font-bold text-left text-dark">
                3. Team Information
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {/* Team Name */}
            <Grid item sm={12} md={4} lg={4}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Select Team</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <select
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="teemName"
                      {...field} // Pass field props to the Select component
                      label="Select Team"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    >
                      {teemNameList.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={4}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>Title</label>
                <Controller
                  name="teemLeader"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <select
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="teemLeader"
                      {...field} // Pass field props to the Select component
                      label="Title"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    >
                      <option>Leader 1</option>
                      <option>Leader 2</option>
                    </select>
                  )}
                />
                {errors.teemLeader && (
                  <FormHelperText>{errors.teemLeader.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={4}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>Reports To</label>
                <Controller
                  name="country"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <select
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      label="Reports To"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    >
                      {countryList?.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                />
                {errors.country && (
                  <FormHelperText>{errors.country.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Box className="flex justify-end mt-3">
            <Button
              sx={{
                borderRadius: "8px",
                color: "white",
                backgroundColor: "primary.main",
                border: "1px solid transparent",
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                minWidth: "130px",
                padding: "6px 20px",
              }}
            >
              Save
            </Button>
          </Box>
        </Paper>

        <Paper className="p-8 rounded-md bg-white mt-4">
          <Box className="mt-5">
            <Box className="mb-4">
              <Typography className="text-[16px] font-poppins font-bold text-left text-dark">
                4. User Goals
              </Typography>
            </Box>
          </Box>
          <Box className="mt-4 mb-3">
            <Typography>Annual Revenue Target</Typography>
          </Box>
          <Grid container spacing={4}>
            {/* Team Name */}
            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Q1</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Q2</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Q3</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Q4</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Box className="mt-4 mb-3">
            <Typography>Annual Gowth Goals</Typography>
          </Box>
          <Grid container spacing={4}>
            {/* Team Name */}
            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Q1</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Q2</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Q3</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Q4</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={4} className="mt-2">
            {/* Team Name */}
            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Deal Velocity Goal</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Win Rate Goal(%)</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Average Deal Size Goal</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item sm={12} md={4} lg={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemName}
              >
                <label>Lead Conversion Rate Goal(%)</label>
                <Controller
                  name="teemName"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <input
                      type="text"
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      id="country"
                      {...field} // Pass field props to the Select component
                      placeholder="$100 000"
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "custom") {
                          setIsCustomField(true);
                        }
                      }}
                    />
                  )}
                />
                {errors.teemName && (
                  <FormHelperText>{errors.teemName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          {/* note is here */}
          <Typography className="mt-4 text-muted">
            Note: Team KPIs and Goals will/should be applied to each user that
            is attached to a team.
          </Typography>
          {/* Action Buttons */}
          <Box
            className="flex items-center justify-end"
            sx={{ marginTop: "86px" }}
          >
            <Button
              sx={{
                borderRadius: "8px",
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                minWidth: "130px",
                marginLeft: "20px",
                padding: "10px 20px",
              }}
            >
              Add New Team
            </Button>
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
                padding: "10px 20px",
              }}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
}

export default Step1;
