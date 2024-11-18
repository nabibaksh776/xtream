"use client";
import React from "react";
import { Container } from "reactstrap";
import Header from "./layouts/header/Header";
import Sidebar from "./layouts/sidebars/vertical/Sidebar";
import CircularProgress from "@mui/material/CircularProgress";
import { useSession } from "next-auth/react";
const FullLayout = ({ children }) => {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };

  console.log("session in main layout----", session);

  // show loading if there is no session
  // if (!session) {
  //   return (
  //     <div
  //       style={{
  //         position: "fixed",
  //         top: "0px",
  //         left: "0px",
  //         height: "100vh",
  //         width: "100%",
  //         backgroundColor: "white",
  //       }}
  //       className="flex items-center justify-center"
  //     >
  //       <CircularProgress />
  //     </div>
  //   );
  // }
  return (
    <main style={{ width: "100%" }}>
      {/* intial loading  */}
      <div className="pageWrapper d-md-block d-lg-flex">
        {/******** Sidebar **********/}
        <aside
          className={`sidebarArea shadow bg-white ${
            !open ? "" : "showSidebar"
          }`}
        >
          <Sidebar showMobilemenu={() => showMobilemenu()} />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header showMobmenu={() => showMobilemenu()} />

          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <div>{children}</div>
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
