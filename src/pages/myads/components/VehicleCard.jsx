import React from "react";
import {
  Box,
  styled,
  Card,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { shillingKE } from "../../../utils/util";
import AccessAlarmsRoundedIcon from "@mui/icons-material/AccessAlarmsRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteAdButton from "../../account/components/DeleteAdButton";

const StyledCard = styled(Card)({
  display: "flex",
  justifyContent: "space-between",
  "&:hover": {
    background: "#F8F9FA",
    cursor: "pointer",
  },
});
const BoxSpecWrapper = styled(Box)(({ theme }) => ({
  marginTop: "15px",
  [theme.breakpoints.down("md")]: { display: "flex" },
}));
// const BoxSpec = styled(Box)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "space-between",
// }));
// const SpectItemTypography = styled(Box)(({ theme }) => ({
//   fontWeight: "700",
//   color: "#868e96",
//   padding: "5px",
//   [theme.breakpoints.down("md")]: {
//     padding: "2px",
//     fontWeight: "400",
//     fontSize: "0.8rem",
//   },
// }));
const CardDescriptonBox = styled(Box)({
  display: "flex",
  marginLeft: "10px",
  padding: "5px",
});

const CardHeaderBox = styled(Box)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",

  flexWrap: "wrap",

  [theme.breakpoints.down("md")]: {
    paddingBottom: "4px",
  },
}));
// const FavoriteIconStyled = styled(BookmarkBorderIcon)({
//   position: "absolute",
//   backgroundColor: "white",
//   borderRadius: "50%",
//   padding: "8px",
//   color: "red",
//   bottom: 5,
//   right: 5,
//   "&:hover": {
//     background: "#F8F9FA",
//     cursor: "pointer",
//     padding: "9px",
//   },
// });
const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  [theme.breakpoints.down("md")]: { height: "125px", width: "125px" },
}));
const ButtonStyled = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "green",
  },
}));
const LiveTagBoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: "#eae8e8",
  padding: "5px",
  borderRadius: "2px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ marginBottom: "15px" }}
      onClick={() => navigate(`/vehicle/${vehicle._id}`)}
    >
      <StyledCard>
        <Box sx={{ display: "flex" }}>
          <CardMediaStyled
            sx={{ position: "relative", height: "180px", width: "190px" }}
          >
            <CardMedia
              component="img"
              height="200px"
              sx={{ width: "100%", height: "100%" }}
              image={vehicle.vehicleImageUrl[0]}
            />
          </CardMediaStyled>
          <CardDescriptonBox
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CardHeaderBox>
                <Box>
                  <Typography
                    sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                    variant="h5"
                  >
                    {vehicle.make} {vehicle.model} {vehicle.manufactureYear}{" "}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontWeight: { xs: "500", md: "700" } }}
                    color="primary"
                  >
                    {shillingKE.format(vehicle.price)}
                  </Typography>
                </Box>
              </CardHeaderBox>
              <BoxSpecWrapper
                sx={{
                  display: { xs: "none", md: "flex", lg: "flex", sm: "none" },
                }}
              >
                {" "}
                <Typography color="primary">Reviewing</Typography>
                {/* <LiveTagBoxStyled>
                  <AccessAlarmsRoundedIcon />
                  <Typography fontSize="14px">Live in 1.4hr</Typography>
                </LiveTagBoxStyled> */}
              </BoxSpecWrapper>
              <Box
                sx={{
                  flexDirection: "column",
                  gap: "5px",
                  padding: "5px",
                  display: { xs: "flex", md: "none", lg: "none", sm: "flex" },
                }}
              >
                <DeleteAdButton vehicleId={vehicle._id} />

                <ButtonStyled
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/me/${vehicle._id}/edit`);
                  }}
                  startIcon={<EditRoundedIcon />}
                  variant="contained"
                ></ButtonStyled>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex", lg: "flex", sm: "none" },

                alignItems: "center",
              }}
            >
              <LocationOnIcon color="secondary" fontSize="xs"></LocationOnIcon>
              <Typography
                component="span"
                color="secondary"
                sx={{ fontSize: "13px" }}
              >
                {vehicle.location}
              </Typography>
            </Box>
          </CardDescriptonBox>
        </Box>
        <Box
          sx={{
            flexDirection: "column",
            gap: "5px",
            padding: "5px",
            display: { xs: "none", md: "flex", lg: "flex", sm: "none" },
          }}
        >
          <DeleteAdButton vehicleId={vehicle._id} />

          <ButtonStyled
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/me/${vehicle._id}/edit`);
            }}
            startIcon={<EditRoundedIcon />}
            variant="contained"
          >
            Edit
          </ButtonStyled>
        </Box>
      </StyledCard>
    </Box>
  );
};

export default VehicleCard;
