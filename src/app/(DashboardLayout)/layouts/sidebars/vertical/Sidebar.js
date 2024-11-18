import React from "react";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../shared/logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Image from "next/image";
import dashboardIcon from "@/assets/images/icons/sidebar/Home.png";
import funnelImg from "@/assets/images/icons/sidebar/Filter.png";
import TeamsImg from "@/assets/images/icons/sidebar/team.png";
import UsersImg from "@/assets/images/icons/sidebar/UserCircle.png";
import ProjectImg from "@/assets/images/icons/sidebar/Widget5.png";
import ToolsImg from "@/assets/images/icons/sidebar/Suitcase.png";
import ConfigurationsImg from "@/assets/images/icons/sidebar/Tuning2.png";
import Settings from "@/assets/images/icons/sidebar/Settings.png";
import MoonImg from "@/assets/images/icons/sidebar/Moon.png";
import Login2 from "@/assets/images/icons/sidebar/Login2.png";
const settings = [
  {
    title: "Dark Mode",
    href: "/",
    icon: MoonImg.src,
  },
  {
    title: "Logout",
    href: "/",
    icon: Login2.src,
  },
];

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: dashboardIcon.src,
  },
  {
    title: "Setup Wizard",
    href: "/setup-wizard",
    icon: dashboardIcon.src,
  },
  {
    title: "Funnel Analyst",
    href: "/ui/alerts",
    icon: funnelImg.src,
  },
  {
    title: "Project Builder",
    href: "/ui/alerts",
    icon: ProjectImg.src,
  },
  {
    title: "Teams",
    href: "/ui/badges",
    icon: TeamsImg.src,
  },
  {
    title: "Users",
    href: "/ui/buttons",
    icon: UsersImg.src,
  },
  {
    title: "Tools",
    href: "/ui/cards",
    icon: ToolsImg.src,
  },
  {
    title: "Configurations",
    href: "/ui/grid",
    icon: ConfigurationsImg.src,
  },
  {
    title: "Settings",
    href: "/ui/tables",
    icon: Settings.src,
  },
];

const Sidebar = ({ showMobilemenu }) => {
  const location = usePathname();

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
    <div className="p-3 sidefixed">
      <div className="d-flex align-items-center justify-center">
        <Box
          className="flex items-center justify-center"
          style={{ justifyContent: "center" }}
        >
          <Logo />
        </Box>
        <span className="ms-auto d-lg-none">
          <Button close size="sm" onClick={showMobilemenu}></Button>
        </span>
      </div>

      <Box
        className="flex flex-col justify-between "
        style={{
          height: "95%",
        }}
      >
        <div className="pt-4 mt-2">
          <Nav vertical className="sidebarNav">
            {navigation.map((navi, index) => (
              <NavItem key={index} className="sidenav-bg">
                <Link
                  href={navi.href}
                  className={`${
                    location === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                  `}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Image alt="icon" width={20} height={20} src={navi.icon} />
                  <span
                    className="ms-3 d-inline-block"
                    style={{ fontWeight: "200" }}
                  >
                    {navi.title}
                  </span>
                </Link>
              </NavItem>
            ))}
          </Nav>
        </div>

        {/* Nev buttons */}
        <div className="pt-4 mt-2">
          <Nav vertical className="sidebarNav">
            {settings.map((navi, index) => (
              <NavItem key={index} className="sidenav-bg">
                <Box
                  className={`${
                    location === navi.href
                      ? "text-primary nav-link py-2"
                      : "nav-link text-secondary py-2"
                  }`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    className="flex items-center cursor-pointer"
                    onClick={() => {
                      if (navi.title == "Logout") {
                        console.log("you want to Logout");
                      }
                    }}
                  >
                    <Image alt="icon" width={20} height={20} src={navi.icon} />
                    <span
                      className="ms-3 d-inline-block text-[16px]"
                      style={{ fontWeight: "200" }}
                    >
                      {navi.title}
                    </span>
                  </Box>

                  {/* show switch in dark modd */}
                  {navi.title === "Dark Mode" ? (
                    <>
                      <span>
                        <FormControlLabel
                          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                          label=""
                        />
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
              </NavItem>
            ))}
          </Nav>
        </div>
      </Box>
    </div>
  );
};

export default Sidebar;
