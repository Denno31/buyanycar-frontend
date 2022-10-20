import React from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import SwiperImage from "./components/SwiperImage";
import VehicleInformationCard from "./components/VehicleInformationCard";
import { GET_VEHICLE, GET_VEHICLE_SIMILAR } from "../../queries/vehicleQueries";
import Spinner from "../../common/components/spinner/Spinner";
import { shillingKE } from "../../utils/util";
import VehicleCard from "../home/components/VehicleCard";
import CloseIcon from '@mui/icons-material/Close';
import { POST_MESSAGE } from "../../mutations/messageMutations";

const PageTitleBox = styled(Box)(({ theme }) => ({
  fontSize: "2.1rem",
  lineHeight: "3rem",
  color: theme.palette.primary.main,
  paddingTop: "18px",
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}));

const VehicleImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: "10px",
  gap: "16px",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));
const ImageWraperBox = styled(Box)(({ theme }) => ({
  width: "70%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const ViewContactBox = styled("a")(({ theme }) => ({
  width: "95%",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  color: "#fff",
  textDecoration: "none",
  margin: "20px 0 ",
  "&:hover": {
    cursor: "pointer",
  },
}));
const SafetyTipsBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  padding: "5px",
}));
const StartChatBtn = styled(Button)(({ theme }) => ({
 marginTop:"10px",
 "&:hover": {
  //you want this to be the same as the backgroundColor above
  backgroundColor: theme.palette.primary.main
}
}));
const Vehicle = () => {
  const { id } = useParams();
  const [openChat,setOpenChat] = React.useState(false)
  const [content,setContent] = React.useState("")
  const { loading, error, data } = useQuery(GET_VEHICLE, {
    variables: { vehicleId: id },
  });
  const {
    loading: loadingSimilar,
    error: errorSimilar,
    data: dataSimilar,
  } = useQuery(GET_VEHICLE_SIMILAR, {
    variables: { vehicleMake: data?.getVehicle?.make || "" },
  });
  const [postMessage,{data:dataPostMessage,loading:loadingPostMessage,error:errorPostMessage}] = useMutation(POST_MESSAGE,
    {
     update(proxy, result) {
       console.log(result);
       
     },
     onError(err) {
       //console.log(err.graphQLErrors[0].extensions.errors);
      //  setErrors(err.graphQLErrors[0].extensions.errors);
      console.log(error)
     },
     variables:{
       content,
       to:data?.getVehicle?.vehicleOwner.id
     }
    }
   )
  if (loading) return <Spinner />;
  if (error) return <Box>Something went wrong</Box>;

  const handleOpenChat = ()=>{
    setOpenChat(true)
  }
  const handleCloseChat = ()=>{
    setOpenChat(false)
  }

  return (
    <Container maxWidth="lg">
      <PageTitleBox>
        {data?.getVehicle?.make} {data?.getVehicle?.model}{" "}
        {data?.getVehicle?.manufactureYear}
      </PageTitleBox>
      <VehicleImageBox>
        <ImageWraperBox>
          <Box
            sx={{
              width: "100%",

              backgroundColor: "#fff",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          >
            {/* <SingleImageSlider />
          <MultipleImagesSlider /> */}
            <SwiperImage images={data?.getVehicle?.vehicleImageUrl} />
            {/* <ImageSlider images={productImages} /> */}
          </Box>
          <VehicleInformationCard vehicle={data?.getVehicle} />
          <Box>
            <PageTitleBox>Similar Cars</PageTitleBox>
            <Box sx={{ marginTop: "10px" }}>
              {loadingSimilar ? (
                <Spinner />
              ) : error ? (
                <Box>Something went wrong</Box>
              ) : (
                dataSimilar?.getSimilarVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))
              )}
            </Box>
          </Box>
        </ImageWraperBox>
        <Box sx={{ flex: 1 }}>
          <Box>
            <Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">
                    Price: {shillingKE.format(data?.getVehicle?.price)}
                  </Typography>

                  <Typography>
                    {data?.getVehicle?.negotiable
                      ? "(Negotiable)"
                      : "(Not Negotiable)"}
                  </Typography>
                </Box>
                {!openChat && <Button
                onClick={handleOpenChat}
                  color="secondary"
                  variant="outlined" 
                  startIcon={<MessageIcon />}
                >
                  Chat with Seller
                </Button>}
                {openChat && <Box>
                  <Box sx={{display:"flex", justifyContent:"flex-end"}}><CloseIcon onClick={handleCloseChat}  sx={{cursor:"pointer"}}/></Box>
                  <TextField value={content} fullWidth label="Type a Message" onChange={(e)=>setContent(e.target.value)}>

                  </TextField>
                  <StartChatBtn variant="contained" fullWidth onClick={postMessage}>Start chart</StartChatBtn>
                </Box>}
              </Box>
            </Card>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <Card>
              <Box sx={{ padding: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Seller Info</Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Avatar></Avatar>
                  <Typography style={{ fontWeight: "700" }}>
                    {data?.getVehicle?.vehicleOwner?.firstName}{" "}
                    {data?.getVehicle?.vehicleOwner?.lastName}
                  </Typography>
                </Box>
                <ViewContactBox href={`tel:${data?.getVehicle?.phoneNumber}`}>
                  Call Seller
                </ViewContactBox>
              </Box>
            </Card>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <Card>
              <Box sx={{ padding: "10px" }}>
                <Typography style={{ textAlign: "center" }} variant="h6">
                  Safety Tips
                </Typography>
                <SafetyTipsBox>
                  <Typography>
                    <li>Remember, don't send any pre-payments</li>{" "}
                    <li>Meet the seller at a safe public place </li>
                    <li>
                      Inspect the vehicle to make sure they meet your needs
                    </li>
                    <li>
                      Check all documentation and only pay if you're satisfied
                    </li>
                  </Typography>
                </SafetyTipsBox>
              </Box>
            </Card>
          </Box>
        </Box>
      </VehicleImageBox>
    </Container>
  );
};

export default Vehicle;
