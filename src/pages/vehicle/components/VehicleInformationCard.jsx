import { Box, Card, Typography, styled } from "@mui/material";
import React from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CellTowerIcon from "@mui/icons-material/CellTower";
import { makeStyles } from "@mui/styles";
const VehicleSpecBox = styled(Box)(({ theme }) => ({
  fontWeight: "700",
  color: "#495057",
}));
const VehicleSpecTitle = styled(Box)(({ theme }) => ({
  fontWeight: "500",
  color: "#6d7782",
}));

const useStyles = makeStyles((theme) => ({
  informationWrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    gap: "10px",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  informationDetailWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    borderBottom: "2px solid #F1F3F5",
    padding: "10px",
  },
}));

const VehicleInformationCard = ({ vehicle }) => {
  const classes = useStyles();
  return (
    <Box sx={{ marginBottom: "10px" }}>
      <Card>
        <Box sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "2px solid #F1F3F5",
            }}
          >
            <Typography variant="h6">Vehicle Information</Typography>
          </Box>
        </Box>
        <Box className={classes.informationWrapper}>
          {/* left */}
          <Box sx={{ flex: 1 }}>
            <Box className={classes.informationDetailWrapper}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <DirectionsCarIcon fontSize="sm" />{" "}
                  <VehicleSpecTitle>Make</VehicleSpecTitle>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <VehicleSpecBox>{vehicle?.make}</VehicleSpecBox>
              </Box>
            </Box>
            <Box className={classes.informationDetailWrapper}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <DirectionsCarIcon fontSize="sm" />{" "}
                  <VehicleSpecTitle>Model</VehicleSpecTitle>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <VehicleSpecBox>{vehicle?.model}</VehicleSpecBox>
              </Box>
            </Box>
            <Box className={classes.informationDetailWrapper}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <DirectionsCarIcon fontSize="sm" />{" "}
                  <VehicleSpecTitle>Body Type</VehicleSpecTitle>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <VehicleSpecBox>{vehicle?.bodyType}</VehicleSpecBox>
              </Box>
            </Box>
            <Box className={classes.informationDetailWrapper}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <DirectionsCarIcon fontSize="sm" />{" "}
                  <VehicleSpecTitle>Engine Size</VehicleSpecTitle>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <VehicleSpecBox>{vehicle.engineSize}CC</VehicleSpecBox>
              </Box>
            </Box>
            <Box className={classes.informationDetailWrapper}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <DirectionsCarIcon fontSize="sm" />{" "}
                  <VehicleSpecTitle>Registered</VehicleSpecTitle>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <VehicleSpecBox>
                  {vehicle?.registered ? "Yes" : "No"}
                </VehicleSpecBox>
              </Box>
            </Box>
          </Box>

          {/* right */}
          <Box sx={{ flex: 1 }}>
            <Box className={classes.informationDetailWrapper}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <CalendarMonthIcon fontSize="sm" />{" "}
                  <VehicleSpecTitle>Year</VehicleSpecTitle>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <VehicleSpecBox>{vehicle?.manufactureYear}</VehicleSpecBox>
              </Box>
            </Box>
            <Box className={classes.informationDetailWrapper}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <ShutterSpeedIcon fontSize="sm" />{" "}
                  <VehicleSpecTitle>Mileage</VehicleSpecTitle>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <VehicleSpecBox>{vehicle?.mileage}</VehicleSpecBox>
              </Box>
            </Box>
            <Box className={classes.informationDetailWrapper}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <ColorLensIcon fontSize="sm" />{" "}
                  <VehicleSpecTitle>Color</VehicleSpecTitle>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <VehicleSpecBox>{vehicle?.color}</VehicleSpecBox>
              </Box>
            </Box>
            <Box className={classes.informationDetailWrapper}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <CellTowerIcon fontSize="sm" />{" "}
                  <VehicleSpecTitle>Transmission</VehicleSpecTitle>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <VehicleSpecBox>{vehicle?.transmission}</VehicleSpecBox>
              </Box>
            </Box>
            <Box className={classes.informationDetailWrapper}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <DirectionsCarIcon fontSize="sm" />{" "}
                  <VehicleSpecTitle>Fuel</VehicleSpecTitle>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <VehicleSpecBox>{vehicle?.fuel}</VehicleSpecBox>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "15px",
            fontSize: ".99rem",
            borderTop: "5px solid #F1F3F5",
          }}
        >
          <Typography>{vehicle?.description}</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default VehicleInformationCard;
