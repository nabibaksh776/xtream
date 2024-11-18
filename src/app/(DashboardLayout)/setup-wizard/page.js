"use client";
import Step1 from "@/components/setupWizard/steps/Step1";
import Step2 from "@/components/setupWizard/steps/Step2";
import Step3 from "@/components/setupWizard/steps/Step3_Setup_user";
import Step4 from "@/components/setupWizard/steps/Step4";
import { useState } from "react";
import { handleFormSteps } from "@/redux/onboarding/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@/components/Tabs/Tabs";
import { Paper, Box, Typography } from "@mui/material";

export default function Page() {
  const [step, setStep] = useState(0);
  let dispatch = useDispatch();
  const [tab_status, setTabStatus] = useState(0);
  //   handle Tabs
  const [tabs_heading, setTabs] = useState([
    { value: "Welcome", id: 0, selected: true },
    { value: "Team Set Up", id: 1, selected: false },
    { value: "User Set Up", id: 2, selected: false },
    { value: "Customization", id: 3, selected: false },
    { value: "Finished ", id: 4, selected: false },
  ]);

  // function to handle tabs
  const handleTab = (id) => {
    let temp = tabs_heading.map((item) => {
      setTabStatus(id);
      if (item.id == id) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    setTabs(temp);
  };

  return (
    // main page tabs
    <div>
      <Typography variant="h2" className="text-xl font-bold">
        Custom Steps Wizard
      </Typography>
      <div className="shadow-sm flex mt-4 bg-white">
        {/* // tabs */}
        <Tabs action={handleTab} tabs_heading={tabs_heading} />
      </div>

      {/* Tabls */}
      {tab_status == 0 ? (
        <>
          <Step1 handleTab={handleTab} />
        </>
      ) : (
        <></>
      )}

      {tab_status == 1 ? (
        <>
          <Step2 handleTab={handleTab} />
        </>
      ) : (
        <></>
      )}

      {tab_status == 2 ? (
        <>
          <Step3 handleTab={handleTab} />
        </>
      ) : (
        <></>
      )}

      {tab_status == 3 ? (
        <>
          <Step4 />
        </>
      ) : (
        <></>
      )}
      {tab_status == 4 ? <>Finished</> : <></>}
    </div>
  );
  // return <Step3 handleNext={handleNext} handlePrevious={handlePrevious} />
}
