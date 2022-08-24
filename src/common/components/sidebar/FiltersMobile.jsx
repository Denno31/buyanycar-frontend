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
  Button,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useQuery } from "@apollo/client";
import {
  GET_VEHICLE_MAKES,
  GET_VEHICLE_MODEL,
} from "../../../queries/vehicleQueries";
import { useNavigate, useSearchParams } from "react-router-dom";

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
const bodyTypes = [
  "SUV",
  "Station Wagon",
  "Sedan",
  "Pickup",
  "Hatchback",
  "Coupe",
  "van",
  "Minivan",
  "Crossover",
  "Convertible",
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
    display: "block",
  },
}));
const FiltersMobile = () => {
  const [searchParams] = useSearchParams();
  const [fromYear, setFromYear] = React.useState("");
  const [toYear, setToYear] = React.useState("");
  const [conditions, setConditions] = React.useState([]);
  const navigate = useNavigate();
  //console.log("sidebar:==>", searchParams.getAll("condition"));
  const filterAttributes = {};
  const filter_attr_1_make = useSearchParams;
  const {
    // loading: loadingMakes,
    // error: errorMakes,
    data: dataMakes,
  } = useQuery(GET_VEHICLE_MAKES);
  const {
    // loading: loadingModels,
    error: errorModels,
    data: dataModels,
  } = useQuery(GET_VEHICLE_MODEL, {
    variables: {
      vehicleMake: searchParams.get("car_make") || "all",
    },
  });
  console.log("Errror models:", errorModels);
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
  const getFilterUrl = (filter) => {
    const conditionParams = searchParams.getAll("condition");

    let conditions = "&condition";
    const car_make = filter.car_make || searchParams.get("car_make") || "all";
    const car_model =
      filter.car_model || searchParams.get("car_model") || "all";
    const min_year = filter.minYear || searchParams.get("min_year") || 0;
    const max_year = filter.maxYear || searchParams.get("max_year") || 0;
    const price_min = filter.price_min || searchParams.get("price_min") || 0;
    const price_max = filter.price_max || searchParams.get("price_max") || 0;
    const filterRegistered =
      filter.registered || searchParams.get("registered") || 0;
    let conditionsArray =
      filter.condition && !conditionParams.includes(filter.condition)
        ? [...conditionParams, filter.condition]
        : conditionParams || [];
    if (filter.del) {
      conditionsArray = conditionsArray.filter((c) => {
        return c !== filter.condition && c !== "";
      });
    }
    if (conditionsArray.length === 0) conditions = "";
    conditionsArray.forEach((item, idx) => {
      conditions += "=" + item;
      if (idx < conditionsArray.length - 1) conditions += "&condition";
    });
    let filterConditions = getParams("condition", filter.condition, filter.del);
    let filterBodyTypes = getParams("bodyType", filter.bodyType, filter.del);
    const filterEngineSize = getParams(
      "engineSize",
      filter.engineSize,
      filter.del
    );
    const filterFuelType = getParams("fuelType", filter.fuelType, filter.del);
    const filterTransmission = getParams(
      "transmission",
      filter.transmission,
      filter.del
    );
    const filterColor = getParams("color", filter.color, filter.del);

    //console.log("condiiii", filterConditions);
    return `/?car_make=${car_make}&car_model=${car_model}&min_year=${min_year}&max_year=${max_year}&price_min=${price_min}&price_max=${price_max}&registered=${filterRegistered}${filterConditions}${filterBodyTypes}${filterEngineSize}${filterFuelType}${filterTransmission}${filterColor}`;
  };
  function getParams(filter, filterValue, del) {
    //const query_param = Object.keys(filter)[0];
    const queryParams = searchParams.getAll(filter);
    let params = "&" + filter;

    let conditionsArray =
      filterValue && !queryParams.includes(filterValue)
        ? [...queryParams, filterValue]
        : queryParams || [];
    if (del) {
      conditionsArray = conditionsArray.filter((c) => {
        return c !== filterValue && c !== "";
      });
    }
    if (conditionsArray.length === 0) params = "";
    conditionsArray.forEach((item, idx) => {
      params += "=" + item;
      if (idx < conditionsArray.length - 1) params += "&" + filter;
    });
    return params;
  }
  const getMinYear = () => {
    let startYear = parseInt(fromYear) ? parseInt(fromYear) : 0;
    let endYear = parseInt(toYear) ? parseInt(toYear) : 0;

    return Math.min(endYear, startYear);
  };
  const getMaxYear = () => {
    let startYear = parseInt(fromYear) ? parseInt(fromYear) : 0;
    let endYear = parseInt(toYear) ? parseInt(toYear) : 0;

    return Math.max(endYear, startYear);
  };

  // const handleMakeChange = (e) => {
  //   //setMake(e.target.value);
  //   getVehicleModels({ variables: { vehicleMake: e.target.value } });
  // };

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
                {/* <FormLabel id="car-makes-label">Car Registered?</FormLabel> */}
                <RadioGroup
                  aria-labelledby="car-makes-label"
                  defaultValue="ALL"
                  name="radio-buttons-group-make"
                >
                  <FormControlLabel
                    key="ALL"
                    value="ALL"
                    control={
                      <Radio
                        onChange={(e) =>
                          navigate(getFilterUrl({ car_make: "all" }))
                        }
                      />
                    }
                    label="Show All"
                  />

                  {dataMakes?.vehicleMakes.map((item, index) => (
                    <FormControlLabel
                      key={`${item.name}-${index}`}
                      value={item.make}
                      control={
                        <Radio
                          onChange={(e) =>
                            navigate(getFilterUrl({ car_make: item.make }))
                          }
                        />
                      }
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
            <Box sx={{ maxHeight: "200px", overflow: "scroll" }}>
              <FormControl>
                {/* <FormLabel id="price-label"></FormLabel> */}
                <RadioGroup
                  aria-labelledby="price-label"
                  defaultValue="ALL"
                  name="radio-price-group"
                >
                  {/* <FormControlLabel
                    key="ALL"
                    value="ALL"
                    control={<Radio />}
                    label="Show All"
                  /> */}
                  {dataModels?.vehicleModels.map((item, index) => (
                    <FormControlLabel
                      key={`${item}-${index}`}
                      value={item.model}
                      control={
                        <Radio
                          onChange={(e) =>
                            navigate(
                              getFilterUrl({
                                car_model: item.model,
                              })
                            )
                          }
                        />
                      }
                      label={item.model}
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
            <Typography>Manufacture Year</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ display: "flex", gap: "2px" }}>
              <FormControl sx={{ mb: 2 }} fullWidth>
                <InputLabel id="year-label-to">From </InputLabel>
                <Select
                  labelId="year-label-from"
                  id="make-label"
                  label="Year"
                  defaultValue=""
                  value={fromYear}
                  onChange={(e) => setFromYear(e.target.value)}
                >
                  {getYears().map((yr) => (
                    <MenuItem key={`${yr} from`} value={yr}>
                      {yr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ mb: 2 }} fullWidth>
                <InputLabel id="year-label-to">To </InputLabel>
                <Select
                  labelId="year-label-to"
                  id="make-label"
                  label="Year"
                  defaultValue=""
                  value={toYear}
                  onChange={(e) => {
                    setToYear(e.target.value);
                  }}
                >
                  {getYears().map((yr) => (
                    <MenuItem key={`${yr} to`} value={yr}>
                      {yr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button
              onClick={(e) =>
                navigate(
                  getFilterUrl({ maxYear: getMaxYear(), minYear: getMinYear() })
                )
              }
              size="small"
              variant="outlined"
            >
              save
            </Button>
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
                control={
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        navigate(getFilterUrl({ condition: "Kenyan Used" }));
                      } else {
                        navigate(
                          getFilterUrl({ condition: "Kenyan Used", del: true })
                        );
                      }
                    }}
                  />
                }
                label="Kenyan Used"
                key="kenyan"
              />
              <FormControlLabel
                key="new"
                control={
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        navigate(getFilterUrl({ condition: "Brand New" }));
                      } else {
                        navigate(
                          getFilterUrl({ condition: "Brand New", del: true })
                        );
                      }
                    }}
                  />
                }
                label="Brand new"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        navigate(getFilterUrl({ condition: "Foreign Used" }));
                      } else {
                        navigate(
                          getFilterUrl({ condition: "Foreign Used", del: true })
                        );
                      }
                    }}
                  />
                }
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
                {bodyTypes.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            navigate(getFilterUrl({ bodyType: item }));
                          } else {
                            navigate(
                              getFilterUrl({ bodyType: item, del: true })
                            );
                          }
                        }}
                      />
                    }
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
                    control={
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            navigate(getFilterUrl({ engineSize: size }));
                          } else {
                            navigate(
                              getFilterUrl({ engineSize: size, del: true })
                            );
                          }
                        }}
                      />
                    }
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
                    control={
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            navigate(getFilterUrl({ fuelType: item }));
                          } else {
                            navigate(
                              getFilterUrl({ fuelType: item, del: true })
                            );
                          }
                        }}
                      />
                    }
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
                    control={
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            navigate(getFilterUrl({ color: item }));
                          } else {
                            navigate(getFilterUrl({ color: item, del: true }));
                          }
                        }}
                      />
                    }
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
                    control={
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            navigate(getFilterUrl({ transmission: item }));
                          } else {
                            navigate(
                              getFilterUrl({ transmission: item, del: true })
                            );
                          }
                        }}
                      />
                    }
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
                {/* <FormLabel id="price-label"></FormLabel> */}
                <RadioGroup
                  aria-labelledby="price-label"
                  defaultValue="ALL"
                  name="radio-price-group"
                >
                  <FormControlLabel
                    key="ALL"
                    value="ALL"
                    control={<Radio />}
                    label="Show All"
                  />
                  {prices.map((item, index) => (
                    <FormControlLabel
                      key={`${item.name}-${index}`}
                      value={`${item.max} ${item.min}`}
                      control={
                        <Radio
                          onChange={(e) =>
                            navigate(
                              getFilterUrl({
                                price_min: item.min,
                                price_max: item.max,
                              })
                            )
                          }
                        />
                      }
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
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="ALL"
                    control={
                      <Radio
                        onChange={(e) =>
                          navigate(
                            getFilterUrl({
                              registered: "ALL",
                            })
                          )
                        }
                      />
                    }
                    label="Show All"
                  />
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) =>
                          navigate(
                            getFilterUrl({
                              registered: "YES",
                            })
                          )
                        }
                      />
                    }
                    label="YES"
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) =>
                          navigate(
                            getFilterUrl({
                              registered: "NO",
                            })
                          )
                        }
                      />
                    }
                    label="NO"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </SideBarContainer>
  );
};

export default FiltersMobile;
