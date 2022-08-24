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
import Sidebar from "./components/Sidebar";
import SidebarMenu from "./components/SidebarMenu";

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

const AccountInfoBox = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #dcdfe2",
  marginBottom: "5px",
  paddingBottom: "5px",
}));

const Account = () => {
  const { userInfo } = useSelector((state) => state.userInfo);
  return (
    <Container>
      <WrapperBox>
        <Sidebar active="account" />
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
            Account
            <SidebarMenu />
          </Typography>

          <Card>
            <CardHeader title="Account Information"></CardHeader>
            <CardContent>
              <AccountInfoBox>
                {" "}
                <Typography>First Name</Typography>
                <Typography sx={{ color: "#979899" }}>
                  {userInfo?.firstName}
                </Typography>
              </AccountInfoBox>
              <AccountInfoBox>
                <Typography>Last Name</Typography>

                <Typography sx={{ color: "#979899" }}>
                  {userInfo?.lastName}
                </Typography>
              </AccountInfoBox>
              <AccountInfoBox>
                <Typography>Email</Typography>

                <Typography sx={{ color: "#979899" }}>
                  {userInfo?.email}
                </Typography>
              </AccountInfoBox>
              <AccountInfoBox>
                <Typography>Phone Number</Typography>

                <Typography sx={{ color: "#979899" }}>0794024121</Typography>
              </AccountInfoBox>
            </CardContent>
          </Card>
        </AccountDetailBox>
      </WrapperBox>
    </Container>
  );
};

export default Account;
