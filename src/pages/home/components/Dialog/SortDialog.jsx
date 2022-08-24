import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
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

export default function SortDialog({
  open,
  handleCloseFilterDialog,

  setSortKey,
}) {
  const [sortValue, setSortValue] = React.useState("");
  return (
    <div>
      <BootstrapDialog
        fullWidth
        onClose={handleCloseFilterDialog}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseFilterDialog}
        >
          Sort By
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <FormControl>
            {/* <FormLabel id="car-registered-label">Car Registered?</FormLabel> */}
            <RadioGroup
              aria-labelledby="car-registered-label"
              defaultValue="recommended"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="recommended"
                control={
                  <Radio
                    onChange={(e) => {
                      setSortValue(e.target.value);
                    }}
                  />
                }
                label="Recommended"
              />
              <FormControlLabel
                value="newest"
                control={
                  <Radio
                    onChange={(e) => {
                      setSortValue(e.target.value);
                    }}
                  />
                }
                label="Newest posting first"
              />
              <FormControlLabel
                value="oldest"
                control={
                  <Radio
                    onChange={(e) => {
                      setSortValue(e.target.value);
                    }}
                  />
                }
                label="Oldest posting first"
              />
              <FormControlLabel
                value="lowest"
                control={
                  <Radio
                    onChange={(e) => {
                      setSortValue(e.target.value);
                    }}
                  />
                }
                label="Lowest price first"
              />
              <FormControlLabel
                value="highest"
                control={
                  <Radio
                    onChange={(e) => {
                      setSortValue(e.target.value);
                    }}
                  />
                }
                label="Highest price first"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={(e) => {
              handleCloseFilterDialog();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => {
              setSortKey(sortValue);
              handleCloseFilterDialog();
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
