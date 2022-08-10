import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";

import VehicleCard from "./VehicleCard";
import SortForm from "./SortForm";
import { GET_VEHICLES } from "../../../queries/vehicleQueries";
import Spinner from "../../../common/components/spinner/Spinner";

const VehicleContainer = () => {
  const [sortKey, setSortKey] = useState("recommended");
  const { loading, error, data, refetch } = useQuery(GET_VEHICLES, {
    variables: { order: sortKey },
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
  console.log(refetch);
  return (
    <Box flex={2.9}>
      <SortForm
        sortKey={sortKey}
        setSortKey={setSortKey}
        onHandleRefech={handleRefetch}
      />
      {loading ? (
        <Spinner />
      ) : (
        <>
          {data?.getVehicles?.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </>
      )}
    </Box>
  );
};

export default VehicleContainer;
