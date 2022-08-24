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
import { USER_FAVORITE_VEHICLES } from "../../queries/userQueries";
import Sidebar from "../account/components/Sidebar";
import SidebarMenu from "../account/components/SidebarMenu";
import VehicleCard from "../home/components/VehicleCard";
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
const Favorite = () => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const { loading, error, data } = useQuery(USER_FAVORITE_VEHICLES, {});

  return (
    <Container>
      <WrapperBox>
        <Sidebar active="favorites" />
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
            Favorite Ads
            <SidebarMenu />
          </Typography>
          <Card>
            <CardHeader title="My active Ads"></CardHeader>
            <CardContent>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {data?.getFavoriteVehicles?.map((vehicle) => (
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

export default Favorite;
