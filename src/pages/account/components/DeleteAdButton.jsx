import { Button } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DELETE_ADD } from "../../../mutations/vehicleMutations";
import { GET_VEHICLES_BY_USER } from "../../../queries/vehicleQueries";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
const DeleteAdButton = ({ vehicleId, title }) => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const [deleteVehicle, { loading }] = useMutation(DELETE_ADD, {
    variables: { vehicleId: vehicleId },
    onCompleted: () => console.log("completed"),
    refetchQueries: [
      { query: GET_VEHICLES_BY_USER, variables: { userId: userInfo?.id } },
    ],
  });
  return (
    <Button
      size="small"
      disabled={loading}
      startIcon={<DeleteForeverIcon />}
      variant="outlined"
      onClick={(e) => {
        e.stopPropagation();
        console.log("clicked");
        deleteVehicle();
      }}
    >
      {title}
    </Button>
  );
};

export default DeleteAdButton;
