import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Typography,
  styled,
  Box,
  Avatar,
  Container,
  MenuItem,
  Menu,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { Link } from "react-router-dom";
import SignupDialog from "../../../pages/home/components/Dialog/Signup";
import SigninDialog from "../../../pages/home/components/Dialog/Signin";
import { USER_LOGOUT } from "../../../constants/user";

const useStyles = makeStyles((theme) => ({
  brand: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  MenuIcon: {
    backgroundColor: "white",
    color: "#c0c3c6",
    padding: "5px",
    marginRight: "10px",
    borderRadius: "50%",
    "&:hover": {
      cursor: "pointer",
      color: "#c9cacc",
    },
  },
  ProfileIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const MenuBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "&:hover": {
    cursor: "pointer",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  boxSizing: "border-box",
}));
const SellIconStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: "8px",
  borderRadius: "5px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#38aa34",
  },
  boxSizing: "border-box",
}));
const AuthMenuItem = styled(Box)(({ theme }) => ({
  fontWeight: "600",
  "&:hover": {
    cursor: "pointer",
    borderBottom: "1px solid #fff",
  },
}));
const MenuStyled = styled(Menu)(({ theme }) => ({
  boxSizing: "border-box",
}));
const Navbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogOpenSignin, setDialogOpenSignin] = React.useState(false);
  const profileMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleClickOpenSignin = () => {
    setDialogOpenSignin(true);
  };
  const handleCloseSignin = () => {
    setDialogOpenSignin(false);
  };
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: USER_LOGOUT, payload: null });
  };
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <StyledToolbar>
          <Typography
            sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } }}
            className={classes.brand}
            variant="h6"
            onClick={() => navigate("/")}
          >
            BuyAnyCarKe
          </Typography>
          {userInfo && userInfo?.userInfo && (
            <Box className={classes.ProfileIcon}>
              <Avatar
                alt="Denno"
                src="/image/image.jpg"
                aria-controls={profileMenuOpen ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={profileMenuOpen ? "true" : undefined}
                onClick={handleOpenMenu}
              ></Avatar>
            </Box>
          )}
          {!(userInfo && userInfo?.userInfo) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <AuthMenuItem onClick={handleClickOpen}>Register</AuthMenuItem>
              <AuthMenuItem onClick={handleClickOpenSignin}>Login</AuthMenuItem>
              {/* <SellIconStyled
                onClick={() => {
                  if (!userInfo) return handleClickOpenSignin();
                  navigate("/new-ad");
                }}
              >
                Want to Sell?
              </SellIconStyled> */}
            </Box>
          )}
          {userInfo && userInfo?.userInfo && (
            <MenuBox>
              <MessageIcon className={classes.MenuIcon} />
              <NotificationsIcon className={classes.MenuIcon} />
              <BookmarkBorderIcon
                onClick={(e) => navigate("/me/favorites")}
                className={classes.MenuIcon}
              />
              <Avatar
                alt="Denno"
                src="/image/image.jpg"
                id="basic-button"
                aria-controls={profileMenuOpen ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={profileMenuOpen ? "true" : undefined}
                onClick={handleOpenMenu}
              ></Avatar>
              <SellIconStyled
                onClick={() => {
                  if (!userInfo) return handleClickOpenSignin();
                  navigate("/new-ad");
                }}
              >
                Want to Sell?
              </SellIconStyled>
            </MenuBox>
          )}
        </StyledToolbar>
      </Container>
      <SignupDialog
        open={dialogOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <SigninDialog
        open={dialogOpenSignin}
        handleClickOpen={handleClickOpenSignin}
        handleClose={handleCloseSignin}
      />
      <MenuStyled
        id="profile-menu"
        anchorEl={anchorEl}
        open={profileMenuOpen}
        onClose={(e) => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/me/account");
          }}
        >
          My account
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            setAnchorEl(null);
          }}
        >
          Logout
        </MenuItem>
      </MenuStyled>
    </AppBar>
  );
};

export default Navbar;
