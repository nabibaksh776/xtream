import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { Button } from "@mui/material";

import searchImg from "@/assets/images/icons/header/search.png";

const SearchInput = () => {
  return (
    <Box
      className="relative flex items-center"
      style={{
        borderRadius: "5px",
        backgroundColor: "#EEF5F9",
        padding: "8px",
        maxWidth: "330px",
        width: "330px",
      }}
    >
      {/* <Button>
        <Image alt="bot image" width={30} height={30} src={botImag.src} />
      </Button> */}
      <Box>
        <Image
          alt="searchImg image"
          width={20}
          height={20}
          src={searchImg.src}
        />
      </Box>
      <input
        type="text"
        className="rounded-lg px-2"
        style={{
          border: "none",
          background: "none",
        }}
        label="Search.."
      />
    </Box>
  );
};

export default SearchInput;
