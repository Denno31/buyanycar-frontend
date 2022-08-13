import React from "react";
import {
  Box,
  styled,
  Card,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormGroup,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useQuery } from "@apollo/client";
import { GET_VEHICLE_MAKES } from "../../../queries/vehicleQueries";

const engineSizes = [
  3000, 2700, 2500, 2000, 1500, 800, 700, 6400, 5700, 5600, 5500, 4800, 4700,
  4600, 4500, 4400, 4200, 3900, 3800, 3700, 3600, 3500, 3400, 3200, 3100, 2900,
  2800, 2400, 2300, 2200, 2100, 1900, 1800, 1700, 1600,
];

const colors = [
  "Black",
  "Blue",
  "Gray",
  "Silver",
  "White",
  "Beige",
  "Brown",
  "Burgandy",
  "Gold",
  "Green",
  "Ivory",
  "Matt Black",
  "Off white",
  "Orange",
  "Pearl",
  "Pink",
  "Purple",
  "Red",
  "Teal",
  "Yellow",
];
const fuel = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
const transmission = ["Automatic", "AMT", "CVT", "Manual"];
const prices = [
  { min: 0, max: 450000, name: "Under 450k" },
  { min: 450000, max: 920000, name: "450k - 920k" },
  { min: 920000, max: 2200000, name: "920k - 2.2" },
  { min: 2200000, max: 6000000, name: "2.2M - 6M" },
  { min: 6000000, max: 0, name: "More than 6M" },
];
const FiltersHeaderCard = styled(Card)({
  padding: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
});
const FilterItemLocation = styled(Box)({
  padding: "12px",
  backgroundColor: "white",
  borderRadius: "5px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const ResetIconStyled = styled(Box)({
  "&:hover": {
    cursor: "pointer",
  },
});
const SideBarContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const Sidebar = () => {
  const {
    // loading: loadingMakes,
    // error: errorMakes,
    data: dataMakes,
  } = useQuery(GET_VEHICLE_MAKES);

  const getYears = () => {
    const years = [];
    const currentTime = new Date();
    let currentYear = currentTime.getFullYear();
    while (currentYear > 1961) {
      years.push(currentYear);
      currentYear -= 1;
    }
    return years;
  };

  return (
    <SideBarContainer flex={1}>
      <FiltersHeaderCard>
        <Typography variant="h5">Filters</Typography>
        <ResetIconStyled sx={{ display: "flex", alignItems: "center" }}>
          <DeleteIcon color="primary"></DeleteIcon>
          <Typography variant="span" color="primary">
            RESET
          </Typography>
        </ResetIconStyled>
      </FiltersHeaderCard>

      <Box sx={{ marginTop: "10px" }}>
        <FilterItemLocation>
          <Typography component="p">Location</Typography>
          <ArrowForwardIosIcon fontSize="inherit" />
        </FilterItemLocation>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Make</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ maxHeight: "200px", overflow: "scroll" }}>
              <FormControl>
                {/* <FormLabel id="car-registered-label">Car Registered?</FormLabel> */}
                <RadioGroup
                  aria-labelledby="car-registered-label"
                  defaultValue="ALL"
                  value="ALL"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    key="ALL"
                    value="ALL"
                    control={<Radio />}
                    label="Show All"
                  />
                  {dataMakes?.vehicleMakes.map((item, index) => (
                    <FormControlLabel
                      key={`${item.name}-${index}`}
                      value={item.make}
                      control={<Radio />}
                      label={item.make}
                    />
                  ))}
                  {/* <FormControlLabel value="NO" control={<Radio />} label="NO" /> */}
                </RadioGroup>
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Model</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Manufacture Year</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ display: "flex", gap: "2px" }}>
              <FormControl sx={{ mb: 2 }} fullWidth>
                <InputLabel id="year-label">From </InputLabel>
                <Select
                  labelId="year-label"
                  id="make-label"
                  label="Year"
                  defaultValue=""
                >
                  {getYears().map((yr) => (
                    <MenuItem key={`${yr} from`} value={yr}>
                      {yr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ mb: 2 }} fullWidth>
                <InputLabel id="year-label">To </InputLabel>
                <Select
                  labelId="year-label"
                  id="make-label"
                  label="Year"
                  defaultValue=""
                >
                  {getYears().map((yr) => (
                    <MenuItem key={`${yr} to`} value={yr}>
                      {yr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Condition</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Kenyan Used"
                key="kenyan"
              />
              <FormControlLabel
                key="new"
                control={<Checkbox />}
                label="Brand new"
              />
              <FormControlLabel
                key="foreign"
                control={<Checkbox />}
                label="Foreign Used"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Body Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ maxHeight: "200px", overflow: "scroll" }}>
              <FormGroup>
                {fuel.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox />}
                    label={item}
                  />
                ))}
              </FormGroup>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Engine Size</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ maxHeight: "200px", overflow: "scroll" }}>
              <FormGroup>
                {engineSizes.map((size) => (
                  <FormControlLabel
                    key={size}
                    control={<Checkbox />}
                    label={`${size} cc`}
                  />
                ))}
              </FormGroup>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Fuel</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ maxHeight: "200px", overflow: "scroll" }}>
              <FormGroup>
                {fuel.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox />}
                    label={item}
                  />
                ))}
              </FormGroup>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Color</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ maxHeight: "200px", overflow: "scroll" }}>
              <FormGroup>
                {colors.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox />}
                    label={item}
                  />
                ))}
              </FormGroup>
            </Box>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Inspection</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Transmission</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ maxHeight: "200px", overflow: "scroll" }}>
              <FormGroup>
                {transmission.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox />}
                    label={item}
                  />
                ))}
              </FormGroup>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Price</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ maxHeight: "200px", overflow: "scroll" }}>
              <FormControl>
                {/* <FormLabel id="car-registered-label">Car Registered?</FormLabel> */}
                <RadioGroup
                  aria-labelledby="car-registered-label"
                  defaultValue="ALL"
                  value="ALL"
                  name="radio-buttons-group"
                >
                  {prices.map((item, index) => (
                    <FormControlLabel
                      key={`${item.name}-${index}`}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                  {/* <FormControlLabel value="NO" control={<Radio />} label="NO" /> */}
                </RadioGroup>
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Registered Car</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ maxHeight: "200px", overflow: "scroll" }}>
              <FormControl>
                {/* <FormLabel id="car-registered-label">Car Registered?</FormLabel> */}
                <RadioGroup
                  aria-labelledby="car-registered-label"
                  defaultValue="ALL"
                  value="ALL"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="ALL"
                    control={<Radio />}
                    label="Show All"
                  />
                  <FormControlLabel
                    value="YES"
                    control={<Radio />}
                    label="YES"
                  />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </SideBarContainer>
  );
};

export default Sidebar;
