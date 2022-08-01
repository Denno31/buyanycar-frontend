import {
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import "./ad.css";
const PhotoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "5px",
}));
const FormBox = styled(Box)(({ theme }) => ({
  padding: "20px",
}));
const ImageBox = styled("div")(({ theme }) => ({
  width: "100px",
  height: "100px",
  marginLeft: "5px",
  overflow: "hidden",
  "&:hover": {},
  alignItems: "center",
  positon: "relative",
}));
const ImageHeaderBox = styled(Box)(({ theme }) => ({
  marginBottom: "10px",
}));
const CancelIconStyled = styled(CancelIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  zindex: 999,
  position: "absolute",
  top: 0,
  right: 0,
}));
const InputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "15px",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));
const CreateAd = () => {
  const [imgError, setImgError] = React.useState("");
  // const imagesLocalStorage = localStorage.getItem("selectedImages")
  //   ? JSON.parse(localStorage.getItem("selectedImages"))
  //   : [];
  // const [selectedImages, setSelectedImages] = React.useState([]);
  const [files, setFiles] = React.useState([]);

  //select file event
  const onSelectFiles = (e) => {
    setImgError("");
    console.log("onselect");
    if (imageFileExists(e.target.files[0].name)) {
      setImgError("The image has already been selected.");
      return;
    }
    if (files.length === 6) {
      setImgError("Maximum number of images reach.");
      return;
    }
    setFiles([...files, e.target.files[0]]);

    // set images in local storage
    let tempImagesArr = [];
    console.log(e.target.files[0]);
    tempImagesArr = [...files, e.target.files[0]];
    localStorage.setItem("selectedImages", JSON.stringify(tempImagesArr));
  };
  const removeImage = (img) => {
    const newImageArray = files.filter((item) => item.name !== img.name);
    setFiles(newImageArray);
    localStorage.setItem("selectedImages", JSON.stringify(newImageArray));
  };
  //check if file exists
  const imageFileExists = (name) => {
    const file = files.find((f) => f.name === name);
    return file;
  };

  return (
    <Container>
      <Box sx={{ margin: "30px auto", maxWidth: "900px" }}>
        <Card>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography variant="h5">Post a car</Typography>
          </Box>
          <FormBox>
            <Box component="form">
              <Box sx={{ marginBottom: "10px" }}>
                <ImageHeaderBox>
                  <Typography variant="h6">Add your Ad photos</Typography>
                  <Typography style={{ fontSize: ".8rem" }} component="p">
                    Add atleast 6 images. Image width must be atleast 600px.{" "}
                    <br />
                    The first picture will be used as the title image.
                  </Typography>
                </ImageHeaderBox>
                <PhotoBox>
                  <label id="label-photo">
                    <PermMediaIcon />
                    <input
                      type="file"
                      name="images"
                      onChange={onSelectFiles}
                      accept="image/png, image/jpeg, image.webp"
                    />
                  </label>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      cursor: "pointer",
                    }}
                  >
                    {files.map((image, index) => (
                      <Box key={index} sx={{ position: "relative" }}>
                        <ImageBox id="image-box">
                          <img
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              padding: "5px",
                            }}
                            src={URL.createObjectURL(image)}
                          />
                        </ImageBox>
                        <CancelIconStyled
                          id="remove-image-icon"
                          onClick={() => removeImage(image)}
                        />
                      </Box>
                    ))}
                  </Box>
                </PhotoBox>
              </Box>
              <ImageHeaderBox>
                <Typography style={{ fontSize: ".8rem" }} component="p">
                  Allowed Picture size should not exceed 7mb
                  <br />
                  Supported formats are PNG, JPEG and WEBP
                </Typography>
                <Typography
                  style={{ fontSize: ".8rem", color: "red" }}
                  component="p"
                >
                  {imgError}
                </Typography>
              </ImageHeaderBox>
            </Box>
            <Box>
              <Box>
                <Typography variant="h5">Details</Typography>
              </Box>
              <Box sx={{ marginTop: "15px" }}>
                <InputBox>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="make-label">County</InputLabel>
                    <Select labelId="make-label" id="make-label" label="Make">
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="model-label">Model</InputLabel>
                    <Select
                      labelId="model-label"
                      id="model-label"
                      label="Model"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </InputBox>
                <InputBox>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="make-label">Make</InputLabel>
                    <Select labelId="make-label" id="make-label" label="Make">
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="model-label">Model</InputLabel>
                    <Select
                      labelId="model-label"
                      id="model-label"
                      label="Model"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </InputBox>
                <InputBox>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="make-label">Make</InputLabel>
                    <Select labelId="make-label" id="make-label" label="Make">
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="model-label">Model</InputLabel>
                    <Select
                      labelId="model-label"
                      id="model-label"
                      label="Model"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </InputBox>
                <InputBox>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="make-label">Make</InputLabel>
                    <Select labelId="make-label" id="make-label" label="Make">
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="model-label">Model</InputLabel>
                    <Select
                      labelId="model-label"
                      id="model-label"
                      label="Model"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </InputBox>
                <InputBox>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="make-label">Make</InputLabel>
                    <Select labelId="make-label" id="make-label" label="Make">
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="model-label">Model</InputLabel>
                    <Select
                      labelId="model-label"
                      id="model-label"
                      label="Model"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </InputBox>
                <FormControl>
                  <FormLabel id="car-registered-label">
                    Car Registered?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="car-registered-label"
                    defaultValue="YES"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="YES"
                      control={<Radio />}
                      label="YES"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<Radio />}
                      label="NO"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Box>
          </FormBox>
        </Card>
      </Box>
    </Container>
  );
};

export default CreateAd;
