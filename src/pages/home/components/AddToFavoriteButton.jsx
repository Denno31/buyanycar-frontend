import { Box, styled } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { useMutation } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import { ADD_VEHICLE_TO_FAVORITE } from "../../../mutations/userMutations";
import Spinner from "../../../common/components/spinner/Spinner";
import { useSelector } from "react-redux";
import { USER_FAVORITE_VEHICLES } from "../../../queries/userQueries";

const FavoriteIconStyled = styled(Box)({
  position: "absolute",
  backgroundColor: "white",
  borderRadius: "50%",
  padding: "8px",
  color: "red",
  bottom: 5,
  right: 5,
  "&:hover": {
    background: "#F8F9FA",
    cursor: "pointer",
    padding: "9px",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const AddToFavoriteButton = ({ vehicleId }) => {
  //   console.log(vehicleId);
  const userInfo = useSelector((state) => state.userInfo);
  const localStorageUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [postFavoriteVehicle, { loading, error, data }] = useMutation(
    ADD_VEHICLE_TO_FAVORITE,
    {
      update(proxy, result) {
        // const localStorageUser = JSON.parse(localStorage.getItem("user"));
        const updatedUser = {
          ...localStorageUser,
          favoriteVehicles: result.data.postFavoriteVehicle.favoriteVehicles,
        };
      
        localStorage.setItem("user", JSON.stringify(updatedUser));
      },
      onError(error) {
        console.log(error);
      },
      refetchQueries: [{ query: USER_FAVORITE_VEHICLES }],
    }
  );
  const handlePostFavoriteVehicle = (e) => {
    e.stopPropagation();
    if (!userInfo) {
      alert("You must be logged in");
    }
    postFavoriteVehicle({ variables: { vehicleId } });
  };
  const isFavorite = () => {
    const favoriteVehiclesLocal =
      localStorageUser && localStorageUser.favoriteVehicles
        ? localStorageUser.favoriteVehicles
        : [];
    return favoriteVehiclesLocal.includes(vehicleId);
  };
  return (
    <FavoriteIconStyled onClick={handlePostFavoriteVehicle}>
      {loading ? (
        <CircularProgress size="1.2rem" />
      ) : !isFavorite() ? (
        <BookmarkBorderIcon sx={{ color: "#EB445A" }} />
      ) : (
        <FavoriteIcon sx={{ color: "#EB445A" }} />
      )}
      {/* {loading && <Spinner />}
       */}
      {/* <CircularProgress size="1.2rem" /> */}
    </FavoriteIconStyled>
  );
};

export default AddToFavoriteButton;
