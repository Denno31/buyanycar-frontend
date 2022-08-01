import * as React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { REGISTER_USER } from "../../../../mutations/userMutations";
import { USER_LOGIN_SUCCESS } from "../../../../constants/user";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const RegisterButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#38aa34",
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function SignupDialog({ handleClickOpen, handleClose, open }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState({});
  const [formValues, setFormValues] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    tos: false,
  });
  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: result.data.register });
      localStorage.setItem("user", JSON.stringify(result.data.register));
      handleClose();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: formValues,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    registerUser();
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>

        <Typography style={{ fontWeight: "600", marginLeft: "15px" }}>
          Register via email and phone
        </Typography>

        <DialogContent dividers>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={errors.email}
              autoComplete="email"
              autoFocus
              value={formValues.email}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={errors.password}
              autoComplete="current-password"
              value={formValues.password}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="First Name"
              type="text"
              id="firsName"
              error={errors.firstName}
              value={formValues.firstName}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="lastName"
              label="Last Name(Optional)"
              type="text"
              id="lastName"
              value={formValues.lastName}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="phoneNumber"
              label="Phone Number(Only Numbers)"
              type="number"
              id="phoneNumber"
              value={formValues.phoneNumber}
              onChange={onChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="Tos"
                  color="primary"
                  checked={formValues.tos}
                  name="tos"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.checked,
                    })
                  }
                />
              }
              label="Agree to Terms of Service"
            />
            <RegisterButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Register
            </RegisterButton>
            {Object?.keys(errors).length > 0 && (
              <Box>
                {Object?.values(errors)?.map((value) => (
                  <Alert severity="error" key={value}>
                    {value}
                  </Alert>
                ))}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </div>
  );
}
