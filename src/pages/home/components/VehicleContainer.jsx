import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box, styled } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import VehicleCard from "./VehicleCard";
import SortForm from "./SortForm";
import { GET_VEHICLES } from "../../../queries/vehicleQueries";
import Spinner from "../../../common/components/spinner/Spinner";
import FilterDialog from "./FilterDialog";
import SortDialog from "./Dialog/SortDialog";
import NoRecordsFound from "../../../common/components/NotFound/NoRecordsFound";

const BoxResponseWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  marginBottom: "10px",
}));
const BoxResponseItem = styled(Box)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.primary.main,
  border: "1px solid " + theme.palette.primary.main,
  padding: "2px",
  borderRadius: "5px",
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

const VehicleContainer = () => {
  const [searchParams] = useSearchParams();
  const [sortKey, setSortKey] = useState("recommended");

  const [open, setOpen] = React.useState(false);
  const [openFilterDialog, setOpenFilterDialog] = React.useState(false);
  const menuList = {
    recommended: "Recommended",
    newest: "Newest posting first",
    oldest: "Oldest posting first",
    lowest: "Lowest price first",
    highest: "Highest price first",
  };
  const car_make = searchParams.get("car_make");
  const car_model = searchParams.get("car_model");
  const min_year = searchParams.get("min_year");
  const max_year = searchParams.get("max_year");
  const condition = searchParams.getAll("condition");
  const bodyType = searchParams.getAll("bodyType");
  const colorFilter = searchParams.getAll("color");
  const fuelFilter = searchParams.getAll("fuelType");
  const transmissionFilter = searchParams.getAll("transmission");
  const price_min = searchParams.get("price_min");
  const price_max = searchParams.get("price_max");
  const registeredFilter = searchParams.get("registered");
  const engineSizeParams = searchParams
    .getAll("engineSize")
    .map((e) => Number(e));
  console.log(car_model, "container");
  const { loading, error, data, refetch } = useQuery(GET_VEHICLES, {
    variables: {
      order: sortKey,
      make: car_make,
      model: car_model,
      manufactureYearMin: min_year,
      manufactureYearMax: max_year,
      condition,
      bodyType,
      engineSize: engineSizeParams,
      color: colorFilter,
      fuel: fuelFilter,
      transmission: transmissionFilter,
      price_min: Number(price_min),
      price_max: Number(price_max),
      registered: registeredFilter,
    },
  });

  if (error) {
    return (
      <Box flex={2.9}>
        Something went Wrong. Check your internet connection.
      </Box>
    );
  }
  const handleRefetch = () => {
    refetch({ variables: { order: sortKey } });
  };
  // console.log(refetch);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenFilterDialog = () => {
    setOpenFilterDialog(true);
  };
  const handleCloseFilterDialog = () => {
    setOpenFilterDialog(false);
  };
  return (
    <Box flex={2.9}>
      <SortForm
        sortKey={sortKey}
        setSortKey={setSortKey}
        onHandleRefech={handleRefetch}
      />
      <BoxResponseWrapper
        sx={{ display: { sm: "flex", xs: "flex", lg: "none", md: "none" } }}
      >
        <BoxResponseItem onClick={handleClickOpen}>
          <FilterAltIcon />
          FILTERS
        </BoxResponseItem>
        <BoxResponseItem onClick={handleClickOpenFilterDialog}>
          <SortIcon />
          {menuList[sortKey].toUpperCase()}
        </BoxResponseItem>
      </BoxResponseWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {data?.getVehicles.length > 0 ? (
            data?.getVehicles?.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))
          ) : (
            <NoRecordsFound title="No cars were found" />
          )}
        </>
      )}
      <FilterDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
      <SortDialog
        handleClickOpenFilterDialog={handleClickOpenFilterDialog}
        handleCloseFilterDialog={handleCloseFilterDialog}
        open={openFilterDialog}
        sortKey={sortKey}
        setSortKey={setSortKey}
      />
    </Box>
  );
};

export default VehicleContainer;
