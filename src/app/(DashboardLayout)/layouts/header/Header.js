import React from "react";
import { Box } from "@mui/material";
import bellImg from "@/assets/images/icons/header/bell.png";
import smsIg from "@/assets/images/icons/header/Letter.png";
import Image from "next/image";
import { Navbar } from "reactstrap";
import { Button } from "@mui/material";
import ProfileDropDown from "@/components/Profile/ProfileDropdown/Dorpdown";
import SearchInput from "@/components/common/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import botImag from "@/assets/images/icons/header/bot.png";
// main header of website
const Header = () => {
  // swtich design
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
    <Box className="headerMainBox">
      <Navbar dark expand="md">
        <Box className="header w-full flex justify-between items-center relative p-2">
          {/* search Box */}
          <Box>
            <SearchInput />
          </Box>
          <Box className="flex items-center justify-center">
            <Box className="flex items-center justify-center mr-10 gap-x-6">
              <Box>
                <Image
                  alt="searchImg image"
                  width={35}
                  height={35}
                  src={botImag.src}
                />
              </Box>
              <Box>
                <span>
                  <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label=""
                  />
                </span>
              </Box>
              <Box
                className="bg_body flex items-center justify-center cursor-pointer rounded-full"
                style={{
                  width: "40px",
                  height: "40px",
                  padding: "0px",
                }}
              >
                <Image alt="bell icon" width={25} height={25} src={bellImg} />
              </Box>
              <Box
                className="bg_body flex items-center justify-center cursor-pointer rounded-full"
                style={{
                  width: "40px",
                  height: "40px",
                  padding: "0px",
                }}
              >
                <Image alt="sms icon" width={25} height={25} src={smsIg} />
              </Box>
            </Box>
            <ProfileDropDown />
          </Box>
        </Box>
      </Navbar>
    </Box>
  );
};

export default Header;
