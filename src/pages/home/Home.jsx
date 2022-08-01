import React from "react";
import { Box, Container, styled, Stack } from "@mui/material";

import Sidebar from "../../common/components/sidebar/Sidebar";
import VehicleContainer from "./components/VehicleContainer";
const StyledBox = styled(Box)({
  marginTop: "20px",
});

const Home = () => {
  return (
    <Container maxWidth="lg">
      <StyledBox>
        <Stack direction="row" gap={3}>
          <Sidebar />
          <VehicleContainer />
        </Stack>
      </StyledBox>
    </Container>
  );
};

export default Home;
