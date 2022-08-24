import React from "react";
import { Box, styled, FormControl, Select, MenuItem } from "@mui/material";
const SortBoxContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  marginBottom: "25px",
  paddingBottom: "15px",
}));
const StyledSelectInput = styled(Select)(({ theme }) => ({
  height: "35px",
  width: "210px",
  backgroundColor: "white",
}));
const SortForm = ({ sortKey, setSortKey }) => {
  return (
    <SortBoxContainer>
      <FormControl
        sx={{
          m: 1,
          width: 250,
          mt: 3,
          display: { sm: "none", xs: "none", lg: "block", md: "block" },
        }}
      >
        <StyledSelectInput
          id="sort-key"
          value={sortKey}
          onChange={(e) => {
            setSortKey(e.target.value);
          }}
        >
          <MenuItem value="recommended">Recommended</MenuItem>
          <MenuItem value="newest">Newest posting first</MenuItem>
          <MenuItem value="oldest">Oldest posting first</MenuItem>
          <MenuItem value="lowest">Lowest price first</MenuItem>
          <MenuItem value="highest">Highest price first</MenuItem>
        </StyledSelectInput>
      </FormControl>
    </SortBoxContainer>
  );
};

export default SortForm;
