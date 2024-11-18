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
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
const { Country, State, City } = require("country-state-city");
import FormControlLabel from "@mui/material/FormControlLabel";

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

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "dodgerblue", // Set the track to dodgerblue when checked
          opacity: 1,
          border: 0,
          // You can change it to blue if you prefer
          // backgroundColor: "blue",
          ...theme.applyStyles("dark", {
            backgroundColor: "dodgerblue", // For dark theme
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
      transition: "background-color 300ms", // Smooth transition for thumb color
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA", // Default track color when unchecked
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "dodgerblue", // Default track color for dark theme
      }),
    },
  }));

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Section 1 */}
        <Paper className="p-8 rounded-md bg-white">
          <Box>
            <Box className="mb-4">
              <div className="flex justify-between items-center text-[16px] font-poppins font-bold text-left text-dark">
                <p>1. CRM Integration</p>
                <p>
                  <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label=""
                  />
                </p>
              </div>
            </Box>
          </Box>
          {/* Grid 1 */}
          <Grid container spacing={4}>
            {/* Team Name */}
            <Grid item sm={12} md={12} lg={12}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>Select CRM Platfrom</label>
                <Controller
                  name="teemLeader"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <select
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                   
                      id="teemLeader"
                      {...field} // Pass field props to the Select component
                      label="Select CRM Platfrom"
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
          <Box className="mt-4">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Notification</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-md font-bold font-poppins text-left text-dark">
              <p>Data Permissions</p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Access to Deals & Opportunities</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Access to Accounts & Contacts</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Pipeline Data</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
        </Paper>
        {/* step 2 */}

        <Paper className="p-8 rounded-md bg-white mt-4">
          <Box>
            <Box className="mb-4">
              <div className="flex justify-between items-center text-[16px] font-poppins font-bold text-left text-dark">
                <p>2. Content Management System</p>
                <p>
                  <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label=""
                  />
                </p>
              </div>
            </Box>
          </Box>
          {/* Grid 1 */}
          <Grid container spacing={4}>
            {/* Team Name */}
            <Grid item sm={12} md={12} lg={12}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>Select CRM Platform</label>
                <Controller
                  name="teemLeader"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <select
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                      
                      id="teemLeader"
                      {...field} // Pass field props to the Select component
                      label="Select CRM Platfrom"
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
          <Box className="mt-4">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Notification</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-md font-bold font-poppins text-left text-dark">
              <p>Content Acccess Level</p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Training Modules</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Product Documentation</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Sales Playbooks</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
        </Paper>
        {/* step 3 */}
        <Paper className="p-8 rounded-md bg-white mt-4">
          <Box>
            <Box className="mb-4">
              <div className="flex justify-between items-center text-[16px] font-poppins font-bold text-left text-dark">
                <p>3. Call Recording Software Integration</p>
                <p>
                  <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label=""
                  />
                </p>
              </div>
            </Box>
          </Box>
          {/* Grid 1 */}
          <Grid container spacing={4}>
            {/* Team Name */}
            <Grid item sm={12} md={12} lg={12}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>Select CRM Platform</label>
                <Controller
                  name="teemLeader"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <select
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                    
                      id="teemLeader"
                      {...field} // Pass field props to the Select component
                      label="Call Recording Platform"
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
          <Box className="mt-4">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Notification</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-md font-bold font-poppins text-left text-dark">
              <p>Data Permissions</p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Call Transcripts</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Sentimen Analysis</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Call Metrics (e.g, duration, engagement level)</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Call Notes & Hightights</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
        </Paper>

        {/* step 4 */}
        <Paper className="p-8 rounded-md bg-white mt-4">
          <Box>
            <Box className="mb-4">
              <div className="flex justify-between items-center text-[16px] font-poppins font-bold text-left text-dark">
                <p>4. Email Integration</p>
                <p>
                  <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label=""
                  />
                </p>
              </div>
            </Box>
          </Box>
          {/* Grid 1 */}
          <Grid container spacing={4}>
            {/* Team Name */}
            <Grid item sm={12} md={12} lg={12}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>Email Provider</label>
                <Controller
                  name="teemLeader"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <select
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                   
                      id="teemLeader"
                      {...field} // Pass field props to the Select component
                      label="Select CRM Platfrom"
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
          <Box className="mt-4">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Notification</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-md font-bold font-poppins text-left text-dark">
              <p>Data Permissions</p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Sent Email Data</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Email Response Rates</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Engagement Level</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Email Threads by Deal</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
        </Paper>

        {/* step 5 */}
        <Paper className="p-8 rounded-md bg-white mt-4">
          <Box>
            <Box className="mb-4">
              <div className="flex justify-between items-center text-[16px] font-poppins font-bold text-left text-dark">
                <p>5. Sales Engagement Platform Integration</p>
                <p>
                  <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label=""
                  />
                </p>
              </div>
            </Box>
          </Box>
          {/* Grid 1 */}
          <Grid container spacing={4}>
            {/* Team Name */}
            <Grid item sm={12} md={12} lg={12}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.teemLeader}
              >
                <label>Paltform</label>
                <Controller
                  name="teemLeader"
                  control={control}
                  defaultValue="" // Default value for the select field
                  render={({ field }) => (
                    <select
                      className="h-[57px] border border-[#13AAE0] rounded-lg px-2"
                  
                      id="teemLeader"
                      {...field} // Pass field props to the Select component
                      label="Select CRM Platfrom"
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
          <Box className="mt-4">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Notifications</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-md font-bold font-poppins text-left text-dark">
              <p>Data Permissions</p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Touchpoints per Lead/Deal</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Sequence Complete Rate</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Activity Logging (Calls, Emails)</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
        </Paper>

        {/* step 6 */}
        <Paper className="p-8 rounded-md bg-white mt-4">
          <Box>
            <Box className="mb-4">
              <div className="flex justify-between items-center text-[16px] font-poppins font-bold text-left text-dark">
                <p>6. Data Display Customization for Team and Users</p>
              </div>
            </Box>
          </Box>
          {/* Grid 1 */}
          <Box className="mt-4">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Team-Level Display Setting</p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Notification</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Team-Level Revenue & Pipeline Growth</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Team Average Deal Velocity</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Team Win Rate</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Average Deal Size per Team</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
        </Paper>

        {/* step 7 */}
        <Paper className="p-8 rounded-md bg-white mt-4">
          <Box>
            <Box className="mb-4">
              <div className="flex justify-between items-center text-[16px] font-poppins font-bold text-left text-dark">
                <p>7. Activity Data</p>
              </div>
            </Box>
          </Box>
          <Box className="mt-4">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>
                Show Aggregated Call Metrics (e.g total calls, engagement rates)
              </p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-md font-bold font-poppins text-left text-dark">
              <p>Notifications</p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Team Email Engagement Rate</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Team Win Rate</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Average Response Time per Team</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
        </Paper>

        {/* Step 8 */}
        <Paper className="p-8 rounded-md bg-white mt-4">
          <Box>
            <Box className="mb-4">
              <div className="flex justify-between items-center text-[16px] font-poppins font-bold text-left text-dark">
                <p>8. Training & Compliance</p>
                <p>
                  <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label=""
                  />
                </p>
              </div>
            </Box>
          </Box>
          {/* Grid 1 */}
          <Box className="mt-4">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Notificatons</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-md font-bold font-poppins text-left text-dark">
              <p>Show Training Completion Rate</p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Additional Team-Specific Insights</p>
            </div>
          </Box>

          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Content Engagement from CMS (Most Accessed Content)</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>

          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Highlight High-Impact Calls(Based on Sentiment)</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
        </Paper>

        {/* step 9 */}
        <Paper className="p-8 rounded-md bg-white mt-4">
          <Box>
            <Box className="mb-4">
              <div className="flex justify-between items-center text-[16px] font-poppins font-bold text-left text-dark">
                <p>9. Individual User Display Settings</p>
              </div>
            </Box>
          </Box>
          {/* Grid 1 */}
          <Box className="mt-4">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Revenue and Performance Metrics</p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Notifications</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>

          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Individual Revenue Contribution</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>

          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Individual Pipeline Growth</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Deal Velocity for User</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Win Rate</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
          <Box className="mt-2">
            <div className="flex justify-between items-center text-[16px] font-poppins text-left text-dark">
              <p>Show Average Deal Size</p>
              <p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </p>
            </div>
          </Box>
        </Paper>

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
    </div>
  );
}

export default Step1;
