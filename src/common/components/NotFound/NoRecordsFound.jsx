import { Box, styled } from "@mui/material";
import React from "react";

const BoxNoRecords = styled(Box)({
  color: "#868e96",
  fontWeight: "700",
  fontSize: "1.575rem",
  margin: "64px auto",
  textAlign: "center",
});

const NoRecordsFound = ({ title }) => {
  return <BoxNoRecords>{title}</BoxNoRecords>;
};

export default NoRecordsFound;
