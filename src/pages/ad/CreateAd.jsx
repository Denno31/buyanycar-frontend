import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import "./ad.css";
import {
  GET_VEHICLE_MAKES,
  GET_VEHICLE_MODEL,
} from "../../queries/vehicleQueries";
import Spinner from "../../common/components/spinner/Spinner";
import { GET_COUNTIES, GET_SUB_COUNTIES } from "../../queries/countyQueries";
import { POST_ADD } from "../../mutations/vehicleMutations";
import SpinnerGif from "../../spinner.gif";
import UploadGif from "../../upload-small.gif";
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
  const [imageUploadDone, setImageUploadDone] = React.useState(false);
  const [imgError, setImgError] = React.useState("");

  const [uploadedImages, setUploadedImages] = React.useState(
    uploadedLocalStorageImages()
  );
  const [files, setFiles] = React.useState(getLocalStorageImages());
  const [county, setCounty] = React.useState("");
  const [area, setArea] = React.useState("");
  const [make, setMake] = React.useState("");
  const [model, setModel] = React.useState("");
  const [manufactureYear, setManufactureYear] = React.useState("");
  const [color, setColor] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [fuelType, setFuelType] = React.useState("");
  const [engineSize, setEngineSize] = React.useState(undefined);
  const [mileage, setMileage] = React.useState(undefined);
  const [transmission, setTransmission] = React.useState("");
  const [bodyType, setBodyType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(undefined);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [negotiable, setNegotiable] = React.useState(true);
  const [registered, setRegistered] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [loadingImageUpload, setLoadingImageUpload] = React.useState(false);
  // const [postSuccessFull, setPostSuccessFull] = React.useState(false);

  React.useEffect(() => {
    if (document.getElementById("image-input"))
      document.getElementById("image-input").value = "";
  }, [files]);

  const {
    loading: loadingMakes,
    error: errorMakes,
    data: dataMakes,
  } = useQuery(GET_VEHICLE_MAKES);
  const {
    loading: loadingCounties,
    error: errorCounties,
    data: dataCounties,
  } = useQuery(GET_COUNTIES);
  const [
    getSubCounties,
    {
      // loading: loadingSubCounties,
      // error: errorSubcounties,
      data: dataSubcounties,
    },
  ] = useLazyQuery(GET_SUB_COUNTIES);

  const [
    getVehicleModels,
    {
      // loading: loadingModels,
      // error: errorModels,
      data: dataModels,
    },
  ] = useLazyQuery(GET_VEHICLE_MODEL);
  const [postVehicle, { loading: loadingPostVehicle }] = useMutation(POST_ADD, {
    update(proxy, result) {
      console.log(result);
      if (result?.data?.postVehicle) resetState();
    },
    onError(err) {
      //console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      transmission,
      price: parseInt(price) ? parseInt(price) : 0,
      make: make,
      model: model,
      vehicleImageUrl: uploadedImages,
      color,
      mileage: parseInt(mileage) ? parseInt(mileage) : 0,
      description,
      phoneNumber,
      fuel: fuelType,
      negotiable,
      manufactureYear: manufactureYear.toString(),
      condition,
      bodyType,
      location: `${county}, ${area}`,
      engineSize: parseInt(engineSize) ? parseInt(engineSize) : 0,
      registered,
      vinChassisNumber: "",
    },
  });
  //post data after cloudinary upload is done
  React.useEffect(() => {
    // if (imageUploadDone && uploadedImages.length > 0) {
    //   postVehicle();
    //   console.log("done");
    //   setImageUploadDone(false);
    // }
  }, [postVehicle, uploadedImages, imageUploadDone]);

  if (loadingMakes || loadingCounties) return <Spinner />;
  if (errorMakes || errorCounties) return <div>Something went wrong</div>;

  //select file event
  // const onSelectFiles = (e) => {
  //   setImgError("");

  //   if (imageFileExists(e.target.files[0].name)) {
  //     setImgError("The image has already been selected.");
  //     return;
  //   }
  //   if (files.length === 15) {
  //     setImgError("Maximum number of images reach.");
  //     return;
  //   }
  //   setFiles([...files, e.target.files[0]]);

  //   // set images in local storage
  //   let tempImagesArr = [];
  //   //console.log(e.target.files[0]);
  //   tempImagesArr = [...files, e.target.files[0]];
  //   localStorage.setItem("selectedImages", JSON.stringify(tempImagesArr));
  // };
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
  //handle county input change
  const handleCountyChange = (e) => {
    setCounty(e.target.value);
    getSubCounties({ variables: { countyName: e.target.value } });
  };
  const handleMakeChange = (e) => {
    setMake(e.target.value);
    getVehicleModels({ variables: { vehicleMake: e.target.value } });
  };

  const getYears = () => {
    const years = [];
    const currentTime = new Date();
    let currentYear = currentTime.getFullYear();
    while (currentYear > 1961) {
      years.push(currentYear);
      currentYear -= 1;
    }
    return years;
  };
  //post data after upload is done

  // const uploadData = async () => {
  //   const uploadImageArray = [];
  //   const data = new FormData();

  //   data.append("upload_preset", "instaclone");
  //   data.append("cloud_name", "dm7tddlog");
  //   try {
  //     files.forEach(async (singleFile) => {
  //       data.append("file", singleFile);
  //       const res = await fetch(
  //         "https://api.cloudinary.com/v1_1/dm7tddlog/image/upload",
  //         {
  //           method: "post",
  //           body: data,
  //         }
  //       );
  //       const jsonData = await res.json();
  //       uploadImageArray.push(jsonData.url);
  //       //console.log(jsonData.url);
  //     });

  //     setUploadedImages([...uploadImageArray]);
  //     setImageUploadDone(true);
  //   } catch (err) {
  //     setImageUploadDone(false);
  //     console.log(err);
  //   }
  // };

  const uploadSingleImage = async (e) => {
    setImgError("");

    if (imageFileExists(e.target.files[0].name)) {
      setImgError("The image has already been selected.");
      return;
    }
    if (files.length === 15) {
      setImgError("Maximum number of images reach.");
      return;
    }
    setLoadingImageUpload(true);
    const data = new FormData();
    try {
      data.append("upload_preset", "instaclone");
      data.append("cloud_name", "dm7tddlog");
      data.append("file", e.target.files[0]);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dm7tddlog/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const jsonData = await res.json();
      console.log(jsonData);
      setFiles([
        ...files,
        { cloudUrl: jsonData.url, name: e.target.files[0].name },
      ]);
      // set images in local storage
      let tempImagesArr = [];
      //console.log(e.target.files[0]);
      tempImagesArr = [
        ...files,
        { cloudUrl: jsonData.url, name: e.target.files[0].name },
      ];
      localStorage.setItem("selectedImages", JSON.stringify(tempImagesArr));

      setLoadingImageUpload(false);
    } catch (err) {
      setLoadingImageUpload(false);
      console.log(err);
    }

    //console.log(jsonData.url);
  };
  function getLocalStorageImages() {
    const localStorageImages = localStorage.getItem("selectedImages")
      ? JSON.parse(localStorage.getItem("selectedImages"))
      : [];
    return localStorageImages;
  }
  function uploadedLocalStorageImages() {
    const imgs = getLocalStorageImages().map((item) => item.cloudUrl);
    return imgs;
  }
  function resetState() {
    setFiles([]);

    setCounty("");

    setArea("");

    setMake("");

    setModel("");

    setManufactureYear("");

    setColor("");

    setCondition("");

    setFuelType("");

    setEngineSize("");

    setMileage(undefined);

    setTransmission("");

    setBodyType("");

    setDescription("");

    setPrice("");

    setPhoneNumber("");

    setRegistered(true);

    setErrors("");

    setLoadingImageUpload(false);
    localStorage.removeItem("selectedImages");
  }
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
                  <Typography
                    style={{
                      fontSize: "15px",
                      color: "#99b2bf",
                      fontWeight: "400",
                    }}
                    component="p"
                  >
                    Add atleast 6 images. Image width must be atleast 600px.{" "}
                    <br />
                    The first picture will be used as the title image.
                  </Typography>
                </ImageHeaderBox>
                <PhotoBox>
                  <label id="label-photo">
                    <PermMediaIcon />
                    <input
                      id="image-input"
                      type="file"
                      name="images"
                      onChange={uploadSingleImage}
                      accept="image/png, image/jpeg, image/webp"
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
                            // src={URL.createObjectURL(image)}
                            src={image.cloudUrl}
                          />
                        </ImageBox>
                        <CancelIconStyled
                          id="remove-image-icon"
                          onClick={() => removeImage(image)}
                        />
                      </Box>
                    ))}
                  </Box>
                  {loadingImageUpload && (
                    <ImageBox id="image-box">
                      <img
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          padding: "5px",
                        }}
                        // src={URL.createObjectURL(image)}
                        src={SpinnerGif}
                      />
                    </ImageBox>
                  )}
                </PhotoBox>
              </Box>
              <ImageHeaderBox>
                <Typography
                  style={{
                    fontSize: "15px",
                    color: "#99b2bf",
                    fontWeight: "400",
                  }}
                  component="p"
                >
                  Allowed Picture size should not exceed 7mb
                  <br />
                  Supported formats are PNG, JPEG and WEBP
                </Typography>
                <Typography
                  style={{ fontSize: ".8rem", color: "red" }}
                  component="p"
                >
                  {errors.vehicleImageUrl}
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
                    <InputLabel id="county-label">County</InputLabel>
                    <Select
                      error={errors.location}
                      onChange={handleCountyChange}
                      value={county}
                      labelId="county-label"
                      id="make-label"
                      defaultValue=""
                      label="County"
                    >
                      {dataCounties?.getCounties?.map((county) => (
                        <MenuItem key={county.name} value={county.name}>
                          {county.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="area-label">Area</InputLabel>
                    <Select
                      error={errors.location}
                      labelId="area-label"
                      id="area-label"
                      label="Area"
                      defaultValue=""
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      disabled={!county}
                    >
                      {dataSubcounties?.getSubCounties.map((item) => (
                        <MenuItem key={item.subCounty} value={item.subCounty}>
                          {item.subCounty}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </InputBox>
                <InputBox>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="make-label">Make</InputLabel>
                    <Select
                      error={errors.make}
                      labelId="make-label"
                      id="make-label"
                      label="Make"
                      onChange={handleMakeChange}
                      value={make}
                      defaultValue=""
                    >
                      {dataMakes?.vehicleMakes?.map(({ make }) => (
                        <MenuItem key={make} value={make}>
                          {make}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="model-label">Model</InputLabel>
                    <Select
                      error={errors.model}
                      labelId="model-label"
                      id="model-label"
                      label="Model"
                      value={model}
                      defaultValue=""
                      onChange={(e) => setModel(e.target.value)}
                    >
                      {dataModels?.vehicleModels.map((m) => (
                        <MenuItem key={m.model} value={m.model}>
                          {m.model}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </InputBox>
                <InputBox>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="year-label">Year of manufacture</InputLabel>
                    <Select
                      error={errors.manufactureYear}
                      labelId="year-label"
                      id="make-label"
                      label="Year"
                      value={manufactureYear}
                      defaultValue=""
                      onChange={(e) => setManufactureYear(e.target.value)}
                    >
                      {getYears().map((yr) => (
                        <MenuItem key={yr} value={yr}>
                          {yr}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="color-label">Color</InputLabel>
                    <Select
                      error={errors.color}
                      labelId="color-label"
                      id="color-label"
                      label="Color"
                      defaultValue=""
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <MenuItem value="">Select color</MenuItem>
                      <MenuItem value="Black">Black</MenuItem>
                      <MenuItem value="Blue">Blue</MenuItem>
                      <MenuItem value="Gray">Gray</MenuItem>
                      <MenuItem value="White">White</MenuItem>
                      <MenuItem value="Gray">Gray</MenuItem>
                      <MenuItem value="Red">Red</MenuItem>
                      <MenuItem value="Gray">Gray</MenuItem>
                      <MenuItem value="Silver">Silver</MenuItem>
                      <MenuItem value="Brown">Brown</MenuItem>
                      <MenuItem value="Biege">Biege</MenuItem>
                      <MenuItem value="Gold">Gold</MenuItem>
                      <MenuItem value="Orange">Orange</MenuItem>
                      <MenuItem value="Burgandy">Burgandy</MenuItem>
                      <MenuItem value="Green">Green</MenuItem>
                      <MenuItem value="Gray">Gray</MenuItem>
                      <MenuItem value="Orange">Orange</MenuItem>
                      <MenuItem value="Yellow">Yellow</MenuItem>
                      <MenuItem value="Pink">Pink</MenuItem>
                    </Select>
                  </FormControl>
                </InputBox>
                <InputBox>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="condition-label">Condition</InputLabel>
                    <Select
                      error={errors.condition}
                      labelId="condition-label"
                      id="condition-label"
                      label="condition"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      defaultValue=""
                    >
                      <MenuItem value="brand new">Brand New</MenuItem>
                      <MenuItem value="kenyan used">Kenyan Used</MenuItem>
                      <MenuItem value="foreing used">Foreign Used</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="model-label">Transmission</InputLabel>
                    <Select
                      error={errors.transmission}
                      labelId="model-label"
                      id="model-label"
                      label="Model"
                      defaultValue=""
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                    >
                      <MenuItem value="AMT">AMT</MenuItem>
                      <MenuItem value="Automatic">Automatic</MenuItem>
                      <MenuItem value="CVT">CVT</MenuItem>
                      <MenuItem value="Manual">Manual</MenuItem>
                    </Select>
                  </FormControl>
                </InputBox>
                <InputBox>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="body-type-label">Body Type</InputLabel>
                    <Select
                      error={errors.bodyType}
                      labelId="body-type-label"
                      id="body-type-label"
                      label="body-type"
                      defaultValue=""
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                    >
                      <MenuItem value="Hatchback">Hatchback</MenuItem>
                      <MenuItem value="Sedan">Sedan</MenuItem>
                      <MenuItem value="MUV/SUV">Coupe</MenuItem>
                      <MenuItem value="Convertible">Convertible</MenuItem>
                      <MenuItem value="Wagon">Wagon</MenuItem>
                      <MenuItem value="Van">Van</MenuItem>
                      <MenuItem value="Jeep">Jeep</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <InputLabel id="fuel-type-label">Fuel Type</InputLabel>
                    <Select
                      error={errors.fuel}
                      labelId="fuel-type-label"
                      id="fuel-type-label"
                      label="fuel"
                      defaultValue=""
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                    >
                      <MenuItem value="Petrol">Petrol</MenuItem>
                      <MenuItem value="Diesel">Diesel</MenuItem>
                      <MenuItem value="Gasoline">Gasoline</MenuItem>
                      <MenuItem value="Electric">Electric</MenuItem>
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
                      control={<Radio onChange={(e) => setRegistered(true)} />}
                      label="YES"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<Radio onChange={(e) => setRegistered(false)} />}
                      label="NO"
                    />
                  </RadioGroup>
                </FormControl>

                <InputBox>
                  <TextField
                    error={typeof errors.engineSize === "string"}
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    label="Engine size CC"
                    value={engineSize}
                    onChange={(e) => setEngineSize(e.target.value)}
                  />
                  <TextField
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    label="Mileage"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                  />
                </InputBox>
                <InputBox>
                  <TextField
                    error={typeof errors.price === "string"}
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <TextField
                    error={typeof errors.phoneNumber === "string"}
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </InputBox>
                <FormControl>
                  <FormLabel id="car-registered-label">
                    Price negotiable?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="car-registered-label"
                    defaultValue="YES"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="YES"
                      control={<Radio onChange={(e) => setNegotiable(true)} />}
                      label="YES"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<Radio onChange={(e) => setNegotiable(false)} />}
                      label="NO"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  error={typeof errors.description === "string"}
                  margin="normal"
                  required
                  multiline
                  fullWidth
                  rows={4}
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              type="submit"
            >
              {" "}
              <Box sx={{ textAlign: "center", width: "50%", padding: "15px" }}>
                <Button
                  fullWidth
                  color="secondary"
                  onClick={postVehicle}
                  variant="outlined"
                  disabled={loadingPostVehicle}
                >
                  Post Ad
                </Button>
                {loadingPostVehicle && (
                  <Box>
                    <img src={UploadGif} alt="" />
                  </Box>
                )}
                <Box
                  sx={{
                    padding: "15px",
                    fontWeight: "400",
                    fontSize: "15px",
                    color: "#99b2bf",
                  }}
                >
                  By clicking on Post Ad, you accept the Terms of Use, confirm
                  that you will abide by the Safety Tips, and declare that this
                  posting does not include any Prohibited Items.
                </Box>
              </Box>
            </Box>
          </FormBox>
        </Card>
      </Box>
    </Container>
  );
};

export default CreateAd;
