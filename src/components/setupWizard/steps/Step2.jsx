import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
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
    handleTab(2); // Go to the next tab
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
    <Paper className="p-8 bg-white rounded-md mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Section 1 */}
        <Box>
          <Box className="mb-4">
            <Typography className="text-[16px] font-poppins font-bold text-left text-dark">
              1. Team Information
            </Typography>
            <Typography className="text-sm">
              Overview of the Sales Team&lsquo;s Structure and Key Details
            </Typography>
          </Box>
        </Box>
        {/* Grid 1 */}
        <Grid container spacing={4}>
          {/* Team Name */}
          <Grid item sm={12} md={4} lg={4}>
            {isCustomField == true ? (
              <>
                <label>Team Name</label>
                <div style={{ position: "relative" }}>
                  <button
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "0%",
                      transform: "translate(-50%,-50%)",
                      cursor: "pointer",
                      zIndex: "11",
                    }}
                    onClick={() => {
                      setIsCustomField(false);
                    }}
                  >
                    <CloseIcon size={10} />
                  </button>

                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={!!errors.customTeamName}
                  >
                    <Controller
                      name="customTeamName"
                      control={control}
                      defaultValue="" // Default value for the select field
                      render={({ field }) => (
                        <TextField
                          id="customTeamName"
                          placeholder="Custom Team Name"
                          variant="outlined"
                          onChange={(event) => {
                            field.onChange(event);
                          }}
                          fullWidth
                          error={!!errors.customTeamName} // Show error state
                          helperText={errors.customTeamName?.message} // Display error message
                          sx={{
                            width: "100%",
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
                      )}
                    />
                    {errors.customTeamName && (
                      <FormHelperText>
                        {errors.customTeamName.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
              </>
            ) : (
              <>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.teemName}
                >
                  <label>Team Name</label>
                  <Controller
                    name="teemName"
                    control={control}
                    defaultValue="" // Default value for the select field
                    render={({ field }) => (
                      <select
                        className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                        id="teemName"
                        {...field} // Pass field props to the Select component
                        label="Teem Name"
                        onChange={(event) => {
                          field.onChange(event);
                          if (event.target.value === "custom") {
                            setIsCustomField(true);
                          }
                        }}
                      >
                        {teemNameList.map((item, index) => (
                          <option key={index} value={item.name}>
                            {item.value}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.teemName && (
                    <FormHelperText>{errors.teemName.message}</FormHelperText>
                  )}
                </FormControl>
              </>
            )}
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.teemLeader}
            >
              <label>Team Leader</label>
              <Controller
                name="teemLeader"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <select
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="teemLeader"
                    {...field} // Pass field props to the Select component
                    label="Teem Leader"
                    onChange={(event) => {
                      field.onChange(event);
                      if (event.target.value === "custom") {
                        setIsCustomField(true);
                      }
                    }}
                  >
                    <option>John Doe</option>
                    <option>Smith Evans</option>
                    <option>William Christ</option>
                    <option>Robert Junior</option>
                    <option>Custom</option>
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
              <label>Primary Region</label>
              <Controller
                name="country"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <select
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="country"
                    {...field} // Pass field props to the Select component
                    label="Primary Region"
                    onChange={(event) => {
                      field.onChange(event);
                      handleSelectCountry(event.target.value);
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

          {/* state dropdown */}
          <Grid item sm={12} md={4} lg={4}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.teemLeader}
            >
              <label>Select State</label>
              <Controller
                name="states"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <select
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="states"
                    {...field} // Pass field props to the Select component
                    label="Select State"
                    onChange={(event) => {
                      field.onChange(event);
                      if (event.target.value === "custom") {
                        setIsCustomField(true);
                      }
                    }}
                  >
                    {states?.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              />
              {errors.states && (
                <FormHelperText>{errors.states.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Number of Team Member */}
          <Grid item sm={12} md={4} lg={4}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.numTeamMembers}
            >
              <label>Number of Team Members</label>
              <Controller
                name="numTeamMembers"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <select
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="numTeamMembers"
                    {...field} // Pass field props to the Select component
                    label="Number of Team Members"
                    onChange={(event) => {
                      field.onChange(event);
                      if (event.target.value === "custom") {
                        setIsCustomField(true);
                      }
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                )}
              />
              {errors.numTeamMembers && (
                <FormHelperText>{errors.numTeamMembers.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.SalesRoles}
            >
              <label>Sales Roles</label>
              <Controller
                name="SalesRoles"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <select
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="SalesRoles"
                    {...field} // Pass field props to the Select component
                    label="Sales Roles"
                    onChange={(event) => {
                      field.onChange(event);
                      if (event.target.value === "custom") {
                        setIsCustomField(true);
                      }
                    }}
                  >
                    <option value="AE">AE</option>
                    <option value="SDR">SDR</option>
                    <option value="Account Manager">Account Manager</option>
                    <option value="Custom">Custom</option>
                  </select>
                )}
              />
              {errors.SalesRoles && (
                <FormHelperText>{errors.SalesRoles.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        {/* step 2 */}
        <Box className="mt-5">
          <Box className="mb-4">
            <Typography className="text-[16px] font-poppins font-bold text-left text-dark">
              2. Sales Goals
            </Typography>
            <Typography className="text-sm">
              Establish Sales Objective for Quarterly & Annualy Performance
            </Typography>
          </Box>
        </Box>

        <Box className="mb-4">
          <Typography>Annual Revenue Target</Typography>
        </Box>
        <Grid container spacing={4}>
          {/* Team Name */}
          <Grid item sm={12} md={4} lg={3}>
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
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

        <Grid container spacing={4} className="mt-3">
          {/* Team Name */}
          <Grid item sm={12} md={4} lg={3}>
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
              <label>Win Rate Goal (%)</label>
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
              <label>Lead Conversion Rate Goal (%)</label>
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

        {/* Step 3 */}
        <Box className="mt-5">
          <Box className="mb-4">
            <Typography className="text-[16px] font-poppins font-bold text-left text-dark">
              3. Team KPIs
            </Typography>
            <Typography className="text-sm">
              Trach Core Metrics to Measure Progress & Success
            </Typography>
          </Box>
        </Box>
        <Box className="mt-4 mb-3">
          <Typography>Annual Gowth Goals</Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item sm={12} md={4} lg={4}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.teemLeader}
            >
              <label>Select Stage</label>
              <Controller
                name="teemLeader"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <select
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="teemLeader"
                    {...field} // Pass field props to the Select component
                    label="Select Stage"
                    placeholder="Discover"
                    onChange={(event) => {
                      field.onChange(event);
                      if (event.target.value === "custom") {
                        setIsCustomField(true);
                      }
                    }}
                  >
                    <option>stage 1</option>
                    <option>stage 2</option>
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
              <label>Select Stage</label>
              <Controller
                name="country"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <select
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="country"
                    {...field} // Pass field props to the Select component
                    label="Deal Velocity Goal"
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

          {/* state dropdown */}
          <Grid item sm={12} md={4} lg={4}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.teemLeader}
            >
              <label>Target %</label>
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
                    placeholder="70%"
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
            Convert
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item sm={12} md={4} lg={4}>
            <Box className="mt-4 mb-3">
              <Typography>Activity Valume Goals</Typography>
            </Box>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.teemLeader}
            >
              <label>Target %</label>
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
                    placeholder="Discover"
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

          <Grid item sm={12} md={4} lg={4}>
            <Box className="mt-4 mb-3">
              <Typography>Follow-up Rate</Typography>
            </Box>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.teemLeader}
            >
              <label>Specify Target</label>
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
                    placeholder="24 Hours"
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
          <Grid item sm={12} md={4} lg={4}>
            <Box className="mt-4 mb-3">
              <Typography>Training Completion Rate</Typography>
            </Box>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.teemLeader}
            >
              <label>Target %</label>
              <Controller
                name="states"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <select
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="teemLeader"
                    {...field} // Pass field props to the Select component
                    label="Select Stage"
                    placeholder="Discover"
                    onChange={(event) => {
                      field.onChange(event);
                      if (event.target.value === "custom") {
                        setIsCustomField(true);
                      }
                    }}
                  >
                    <option>stage 1</option>
                    <option>stage 2</option>
                  </select>
                )}
              />
              {errors.states && (
                <FormHelperText>{errors.states.message}</FormHelperText>
              )}
            </FormControl>
            <Box className="flex items-center justify-start">
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
              <Typography className="ml-2">Not Applicable</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box className="mt-4 mb-3">
          <Typography>Activity Volume Goals</Typography>
        </Box>
        <Grid container spacing={4} className="mt-3">
          {/* Team Name */}
          <Grid item sm={12} md={4} lg={4}>
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
              <label>Calls per Rep</label>
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

          <Grid item sm={12} md={4} lg={4}>
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
              <label>Email per Rep</label>
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

          <Grid item sm={12} md={4} lg={4}>
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
              <label>Custom</label>
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

        <Grid container spacing={4} className="mt-3">
          {/* Team Name */}
          <Grid item sm={12} md={4} lg={3}>
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
              <label>Avg Lead Response Time</label>
              <Controller
                name="teemName"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="11:10:50"
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="country"
                    {...field} // Pass field props to the Select component
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
              <label>Avg Time to Send Calendar invite</label>
              <Controller
                name="teemName"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="00:40:20"
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="country"
                    {...field} // Pass field props to the Select component
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
              <label>Average Dea Cycle Time</label>
              <Controller
                name="teemName"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <input
                    type="text"
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="country"
                    placeholder="20 Days"
                    {...field} // Pass field props to the Select component
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
            <FormControl fullWidth variant="outlined" error={!!errors.teemName}>
              <label>Customer Satisfaction Score</label>
              <Controller
                name="teemName"
                control={control}
                defaultValue="" // Default value for the select field
                render={({ field }) => (
                  <input
                    type="text"
                    className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    id="country"
                    placeholder="100"
                    {...field} // Pass field props to the Select component
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
            Add New
          </Button>
        </Box>
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
      </form>
    </Paper>
  );
}

export default Step1;
