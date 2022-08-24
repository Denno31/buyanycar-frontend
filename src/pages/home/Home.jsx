import React from "react";
import {
  Box,
  Container,
  styled,
  Stack,
  Typography,
  FormControlLabel,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../../common/components/sidebar/Sidebar";
import VehicleContainer from "./components/VehicleContainer";
import SpinnerGif from "../../spinner.gif";
import {
  GET_VEHICLE_MAKES,
  GET_VEHICLE_MODEL,
} from "../../queries/vehicleQueries";
import { useLazyQuery, useQuery } from "@apollo/client";
import Spinner from "../../common/components/spinner/Spinner";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)({
  marginTop: "20px",
});
const BannerWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
}));
const SearchWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  boxSizing: "border-box",
  // display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px",
  [theme.breakpoints.down("md")]: {
    margin: "0 10px 0 10px",
  },
}));
const BannerHeader = styled(Typography)(({ theme }) => ({
  color: "white",
  marginBottom: "15px",
  textAlign: "center",
}));
const StyledSelectInput = styled(Select)(({ theme }) => ({
  height: "35px",

  backgroundColor: "white",
}));
const SearchContent = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "10px",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));
const SearchButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifySelf: "center",
  "&:hover": {
    background: theme.palette.primary.main,
  },
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    width: "250px",
  },
}));
const Home = () => {
  const navigate = useNavigate();
  const [make, setMake] = React.useState("");
  const [model, setModel] = React.useState("");

  const {
    loading: loadingMakes,
    error: errorMakes,
    data: dataMakes,
  } = useQuery(GET_VEHICLE_MAKES);
  const [
    getVehicleModels,
    {
      loading: loadingModels,
      // error: errorModels,
      data: dataModels,
    },
  ] = useLazyQuery(GET_VEHICLE_MODEL);
  React.useEffect(() => {
    getVehicleModels({ variables: { vehicleMake: make } });
  }, [getVehicleModels, make]);
  const handleMakeChange = (e) => {
    setModel("");
    setMake(e.target.value);
  };
  const handleSearchClick = () => {
    let url = "/";
    if (make) {
      url += "?car_make=" + make;
    }
    if (model) {
      url += "&car_model=" + model;
    }

    navigate(url);
  };
  return (
    <>
      <BannerWrapper>
        <Box sx={{}}>
          <BannerHeader variant="h5">Find Your Perfect Car</BannerHeader>
          <SearchWrapper>
            <SearchContent sx={{ textAlign: "center" }}>
              {" "}
              <FormControl sx={{ m: 1, width: "250px" }}>
                <StyledSelectInput
                  id="make"
                  defaultValue=""
                  onChange={handleMakeChange}
                >
                  <MenuItem value="">---Select Model---</MenuItem>
                  {dataMakes?.vehicleMakes?.map(({ make }) => (
                    <MenuItem
                      key={make}
                      value={make}
                      onChange={(e) => setModel(e.target.value)}
                    >
                      {make}
                    </MenuItem>
                  ))}
                </StyledSelectInput>
              </FormControl>
              <FormControl sx={{ m: 1, width: 250 }}>
                <StyledSelectInput
                  id="model"
                  value={model}
                  defaultValue=""
                  onChange={(e) => setModel(e.target.value)}
                  disabled={dataModels?.vehicleModels.length === 0}
                >
                  {dataModels?.vehicleModels.map((m) => (
                    <MenuItem key={m.model} value={m.model}>
                      {m.model}
                    </MenuItem>
                  ))}
                </StyledSelectInput>
              </FormControl>
              {/* <img src={SpinnerGif} alt="" />
               */}
              {/* {loadingModels && <Spinner />} */}
              <SearchButton
                onClick={handleSearchClick}
                startIcon={<SearchIcon />}
                variant="contained"
              >
                Find My Car!
              </SearchButton>
            </SearchContent>
          </SearchWrapper>
        </Box>
      </BannerWrapper>
      <Container maxWidth="lg">
        <StyledBox>
          <Stack direction="row" gap={3}>
            <Sidebar />
            <VehicleContainer />
          </Stack>
        </StyledBox>
      </Container>
    </>
  );
};

export default Home;
