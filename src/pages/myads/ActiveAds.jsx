import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../../common/components/spinner/Spinner";
import { GET_VEHICLES_BY_USER } from "../../queries/vehicleQueries";
import Sidebar from "../account/components/Sidebar";
import SidebarMenu from "../account/components/SidebarMenu";
import VehicleCard from "./components/VehicleCard";

const WrapperBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: "30px",
  gap: "30px",
}));

const AccountDetailBox = styled(Box)(({ theme }) => ({
  width: "75%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

// const AccountInfoBox = styled(Box)(({ theme }) => ({
//   borderBottom: "1px solid #dcdfe2",
//   marginBottom: "5px",
//   paddingBottom: "5px",
// }));

const ActiveAds = () => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const {
    loading,
    // error,
    data,
    //  refetch
  } = useQuery(GET_VEHICLES_BY_USER, {
    variables: { userId: userInfo?.id },
  });

  return (
    <Container>
      <WrapperBox>
        <Sidebar active="active-ads" />
        <AccountDetailBox>
          <Typography
            style={{
              paddingBottom: "7px",
              borderBottom: "1px solid  #F28829",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            variant="h5"
          >
            Active Ads
            <SidebarMenu />
          </Typography>
          <Card>
            <CardHeader title="My active Ads"></CardHeader>
            <CardContent>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {data?.getVehiclesByUser?.map((vehicle) => (
                    <VehicleCard key={vehicle._id} vehicle={vehicle} />
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </AccountDetailBox>
      </WrapperBox>
    </Container>
  );
};

export default ActiveAds;
