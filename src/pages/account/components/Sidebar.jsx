import React from "react";
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
const SidebarBox = styled(Card)(({ theme }) => ({
  width: "25%",
  height: "max-content",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const Sidebar = ({ active }) => {
  const activeClass = (currentTab) => {
    return {
      backgroundColor: active === currentTab ? "#F28829" : "",
      color: active === currentTab ? "#fff" : "",
    };
  };
  return (
    <SidebarBox>
      <List disablePadding>
        <ListItem sx={{ ...activeClass("account") }} disablePadding>
          <ListItemButton component={Link} to="/me/account">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem sx={{ ...activeClass("active-ads") }} disablePadding>
          <ListItemButton component={Link} to="/me/active-ads">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Active Adverts" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem sx={{ ...activeClass("under-review-ads") }} disablePadding>
          <ListItemButton component={Link} to="/me/under-review-ads">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Under Review Adverts" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem sx={{ ...activeClass("declined-ads") }} disablePadding>
          <ListItemButton component={Link} to="/me/declined-ads">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Declined Adverts" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem sx={{ ...activeClass("favorites") }} disablePadding>
          <ListItemButton component={Link} to="/me/favorites">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Privacy Policy" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Terms & conditions" />
          </ListItemButton>
        </ListItem>
      </List>
    </SidebarBox>
  );
};

export default Sidebar;
