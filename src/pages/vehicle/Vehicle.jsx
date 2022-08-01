import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  styled,
  Typography,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import SwiperImage from "./components/SwiperImage";
import VehicleInformationCard from "./components/VehicleInformationCard";
import { GET_VEHICLE } from "../../queries/vehicleQueries";
import Spinner from "../../common/components/spinner/Spinner";
import { shillingKE } from "../../utils/util";

const PageTitleBox = styled(Box)(({ theme }) => ({
  fontSize: "2.1rem",
  lineHeight: "3rem",
  color: theme.palette.primary.main,
  paddingTop: "18px",
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}));

const VehicleImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: "10px",
  gap: "16px",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));
const ImageWraperBox = styled(Box)(({ theme }) => ({
  width: "70%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const ViewContactBox = styled("a")(({ theme }) => ({
  width: "95%",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  color: "#fff",
  textDecoration: "none",
  margin: "20px 0 ",
  "&:hover": {
    cursor: "pointer",
  },
}));
const SafetyTipsBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  padding: "5px",
}));

const Vehicle = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_VEHICLE, {
    variables: { vehicleId: id },
  });
  if (loading) return <Spinner />;
  if (error) return <Box>Something went wrong</Box>;
  return (
    <Container maxWidth="lg">
      <PageTitleBox>
        {data?.getVehicle?.make} {data?.getVehicle?.model}{" "}
        {data?.getVehicle?.manufactureYear}
      </PageTitleBox>
      <VehicleImageBox>
        <ImageWraperBox>
          <Box
            sx={{
              width: "100%",

              backgroundColor: "#fff",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          >
            {/* <SingleImageSlider />
          <MultipleImagesSlider /> */}
            <SwiperImage images={data?.getVehicle?.vehicleImageUrl} />
            {/* <ImageSlider images={productImages} /> */}
          </Box>
          <VehicleInformationCard vehicle={data?.getVehicle} />
        </ImageWraperBox>
        <Box sx={{ flex: 1 }}>
          <Box>
            <Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">
                    Price: {shillingKE.format(data?.getVehicle?.price)}
                  </Typography>

                  <Typography>
                    {data?.getVehicle?.negotiable
                      ? "(Negotiable)"
                      : "(Not Negotiable)"}
                  </Typography>
                </Box>
                <Button
                  color="secondary"
                  variant="outlined"
                  startIcon={<MessageIcon />}
                >
                  Chat with Seller
                </Button>
              </Box>
            </Card>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <Card>
              <Box sx={{ padding: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Seller Info</Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Avatar></Avatar>
                  <Typography style={{ fontWeight: "700" }}>
                    {data?.getVehicle?.vehicleOwner?.firstName}{" "}
                    {data?.getVehicle?.vehicleOwner?.lastName}
                  </Typography>
                </Box>
                <ViewContactBox href={`tel:${data?.getVehicle?.phoneNumber}`}>
                  Call Seller
                </ViewContactBox>
              </Box>
            </Card>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <Card>
              <Box sx={{ padding: "10px" }}>
                <Typography style={{ textAlign: "center" }} variant="h6">
                  Safety Tips
                </Typography>
                <SafetyTipsBox>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  </Typography>
                </SafetyTipsBox>
              </Box>
            </Card>
          </Box>
        </Box>
      </VehicleImageBox>
      <Box>
        <PageTitleBox>Similar Cars</PageTitleBox>
        <Box></Box>
      </Box>
    </Container>
  );
};

export default Vehicle;
