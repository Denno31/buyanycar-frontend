import React from "react";
import { Box, styled, Card, CardMedia, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { shillingKE } from "../../../utils/util";
const StyledCard = styled(Card)({
  display: "flex",
  "&:hover": {
    background: "#F8F9FA",
    cursor: "pointer",
  },
});
const BoxSpecWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: { display: "flex" },
}));
const BoxSpec = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
const SpectItemTypography = styled(Box)(({ theme }) => ({
  fontWeight: "700",
  color: "#868e96",
  padding: "5px",
  [theme.breakpoints.down("md")]: {
    padding: "2px",
    fontWeight: "400",
    fontSize: "0.8rem",
  },
}));
const CardDescriptonBox = styled(Box)({
  marginLeft: "10px",
  flex: 1,
  padding: "5px",
});

const CardHeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #dee2e6",
  flexWrap: "wrap",
  paddingBottom: "10px",
  [theme.breakpoints.down("md")]: {
    paddingBottom: "4px",
  },
}));
const FavoriteIconStyled = styled(BookmarkBorderIcon)({
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
});
const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  [theme.breakpoints.down("md")]: { height: "125px", width: "125px" },
}));

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ marginBottom: "15px" }}
      onClick={() => navigate(`/vehicle/${vehicle._id}`)}
    >
      <StyledCard>
        <CardMediaStyled
          sx={{ position: "relative", height: "200px", width: "210px" }}
        >
          <CardMedia
            component="img"
            height="200px"
            sx={{ width: "100%", height: "100%" }}
            image={vehicle.vehicleImageUrl[0]}
          />
          <FavoriteIconStyled fontSize="medium" />
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
            <BoxSpecWrapper sx={{ maxWidth: "25%" }}>
              {" "}
              <BoxSpec>
                <SpectItemTypography>{vehicle.condition}</SpectItemTypography>
                <SpectItemTypography>
                  {vehicle.transmission}
                </SpectItemTypography>
              </BoxSpec>
              <BoxSpec>
                <SpectItemTypography>{vehicle.mileage}Km</SpectItemTypography>
                <SpectItemTypography>{vehicle.color}</SpectItemTypography>
              </BoxSpec>
            </BoxSpecWrapper>
          </Box>
          <Box
            sx={{
              display: "flex",
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
      </StyledCard>
    </Box>
  );
};

export default VehicleCard;
