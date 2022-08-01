import React from "react";
import "./Nav.css";
import { Box, styled, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { makeStyles } from "@mui/styles";

const BoxWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  height: "50px",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const useStyles = makeStyles((theme) => ({
  brand: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  MenuIcon: {
    backgroundColor: "white",
    color: "#727272",

    "&:hover": {
      cursor: "pointer",
      color: "#c9cacc",
    },
  },
}));

const MobileBarItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: "20px",
}));

const BottomNav = () => {
  const [y, setY] = React.useState(0);
  const [btNavFixed, setBtnNavFixed] = React.useState(false);
  const handleNavigation = (e) => {
    const window = e.currentTarget;
    if (y > window.scrollY) {
      setBtnNavFixed(false);
    } else if (y < window.scrollY) {
      setBtnNavFixed(true);
    }
    setY(window.scrollY);
  };

  React.useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", (e) => handleNavigation(e));
  }, [y]);
  const classes = useStyles();
  return (
    <div className={`mobile-bar ${btNavFixed ? "active" : ""}`}>
      <BoxWrapper>
        <MobileBarItem>
          <HomeOutlinedIcon className={classes.MenuIcon} />
          <Typography
            sx={{ marginTop: "0", fontSize: "13px", color: "#727272" }}
            mt={0}
            component="span"
          >
            Home
          </Typography>
        </MobileBarItem>
        <MobileBarItem>
          <AddBoxOutlinedIcon className={classes.MenuIcon} />
          <Typography
            sx={{ marginTop: "0", fontSize: "13px", color: "#727272" }}
            mt={0}
            component="span"
          >
            Sell
          </Typography>
        </MobileBarItem>
        <MobileBarItem>
          <BookmarkBorderOutlinedIcon className={classes.MenuIcon} />
          <Typography
            sx={{ marginTop: "0", fontSize: "13px", color: "#727272" }}
            mt={0}
            component="span"
          >
            Saved
          </Typography>
        </MobileBarItem>
        <MobileBarItem>
          <MessageOutlinedIcon className={classes.MenuIcon} />
          <Typography
            sx={{ marginTop: "0", fontSize: "13px", color: "#727272" }}
            mt={0}
            component="span"
          >
            Messages
          </Typography>
        </MobileBarItem>
      </BoxWrapper>
    </div>
  );
};

export default BottomNav;
