"use client";
// React Imports
import { useRef, useState, useEffect } from "react";
// Next Imports
import { useRouter } from "next/navigation";
// MUI Imports
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "next-auth/react";
import { Box } from "@mui/material";
// Hook Imports

import { useSession } from "next-auth/react";
// Styled component for badge content
const BadgeContentSpan = styled("span")({
  width: 8,
  height: 8,
  borderRadius: "50%",
  cursor: "pointer",
  backgroundColor: "var(--mui-palette-success-main)",
  boxShadow: "0 0 0 2px var(--mui-palette-background-paper)",
});

const UserDropdown = () => {
  const { data: session } = useSession();
  const [userEmailName, setuserEmail] = useState();
  // States
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // Refs
  const anchorRef = useRef(null);

  // Hooks
  const router = useRouter();

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false);
  };

  const handleDropdownClose = (event, url) => {
    if (url) {
      router.push(url);
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return;
    }

    setOpen(false);
  };

  // handle logout
  const handleLogout = async () => {
    console.log("handle logout");
    let resposne = await signOut({
      redirect: false, // Prevent page reload
    });
    // Perform manual redirection after sign-out
    await router.push("/login");
    console.log("this is resposne while signout--", resposne);
  };

  console.log("this is session is DropDown--", session);

  useEffect(() => {
    if (session) {
      if (session.user) {
        let isName = session?.user?.name;
        if (isName == null) {
          let splitEmail = session?.user?.email;
          let newName = splitEmail.split("@");
          setuserEmail(newName[0]);
        }
      }
    }
  }, [session]);

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap="circular"
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        className="mis-2"
      >
        <Box className="flex items-center">
          <Box className="flex flex-col mr-3 items-end">
            <Typography className="text-md">Thoman Andree</Typography>
            <Typography className="text-sm text-muted">
              UIUX Designer
            </Typography>
          </Box>

          <img
            ref={anchorRef}
            alt={
              session?.user?.name ? session?.user?.name : session?.user?.email
            }
            src="https://img.freepik.com/premium-psd/3d-render-cartoon-avatar-isolated_570939-89.jpg"
            onClick={handleDropdownOpen}
            className="cursor-pointer bs-[40px] is-[40px]"
            style={{
              border: "1px solid lightgray",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />
        </Box>
      </Badge>

      <Popper
        open={open}
        transition
        disablePortal
        placement="bottom-end"
        anchorEl={anchorRef.current}
        className="min-is-[240px] !mbs-4 z-[1]"
        style={{ zIndex: 11 }}
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "right top" : "left top",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={(e) => handleDropdownClose(e)}>
                <MenuList>
                  <div
                    className="flex items-center plb-2 pli-4 gap-2 p-2"
                    tabIndex={-1}
                  >
                    {/* <Avatar
                      alt={
                        session?.user?.name
                          ? session?.user?.name
                          : session?.user?.email
                      }
                      src="https://img.freepik.com/free-vector/young-prince-vector-illustration_1308-174367.jpg"
                    /> */}
                    {/* <div>
                      <div>
                        <Typography
                          variant="body2"
                          className="font-medium"
                          color="text.primary"
                        >
                          {session?.user ? (
                            <>
                              {session?.user?.name
                                ? session?.user?.name
                                : userEmailName}
                            </>
                          ) : (
                            <>John</>
                          )}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption">
                          {session?.user?.email
                            ? session?.user?.email
                            : "mrjohn@gmail.com"}
                        </Typography>
                      </div>
                    </div> */}
                  </div>
                  {/* <Divider className="mlb-1" /> */}
                  <MenuItem
                    className="gap-3 pli-4"
                    onClick={(e) => handleDropdownClose(e)}
                  >
                    <i className="ri-user-3-line" />
                    <Typography color="text.primary">Super Admin</Typography>
                  </MenuItem>
                  <MenuItem
                    className="gap-3 pli-4"
                    onClick={(e) => handleDropdownClose(e)}
                  >
                    <i className="ri-settings-4-line" />
                    <Typography color="text.primary">Admin</Typography>
                  </MenuItem>
                  <MenuItem
                    className="gap-3 pli-4"
                    onClick={(e) => handleDropdownClose(e)}
                  >
                    <i className="ri-money-dollar-circle-line" />
                    <Typography color="text.primary">Manager</Typography>
                  </MenuItem>
                  <MenuItem
                    className="gap-3 pli-4"
                    onClick={(e) => handleDropdownClose(e)}
                  >
                    <i className="ri-question-line" />
                    <Typography color="text.primary">User</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default UserDropdown;
