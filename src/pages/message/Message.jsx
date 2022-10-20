import {
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { GET_CHATS, GET_MESSAGES, NEW_MESSAGE } from "../../queries/messageQueries";
import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import {  useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { POST_MESSAGE } from "../../mutations/messageMutations";
const WrapperBox = styled(Box)({
  marginTop: "30px",
});
const StyledInput = styled("input")({
  padding: "15px",
  flex: 1,
  border: "none",
  outline: "none",
});
const MessageBox = styled(Box)({
  padding: "7px 11px",
  display: "inline-flex",
  flexDirection: "column",
  justifySelf: "flex-end",
  backgroundColor: "#fff",
  borderRadius: "15px",
  boxShadow: "0 2px 3px 0 rgb(0 0 0 / 5%)",
});
const Message = () => {
  const navigate = useNavigate()
  const {userInfo} = useSelector(state=>state.userInfo)
  const [errors,setErrors] = React.useState({})
  const [content,setContent] = React.useState("")
  
  const {toId} = useParams()
  const {loading,error,data} = useQuery(GET_CHATS)
  const [getMessages,{loading:loadingMessages,error:errorMessages,data:dataMessages}] = useLazyQuery(GET_MESSAGES,{
    variables:{
      fromUser:toId
    }
  })
  const [postMessage,{data:dataPostMessage,loading:loadingPostMessage,error:errorPostMessage}] = useMutation(POST_MESSAGE,
     {
      update(proxy, result) {
        console.log(result);
        
      },
      onError(err) {
        //console.log(err.graphQLErrors[0].extensions.errors);
        setErrors(err.graphQLErrors[0].extensions.errors);
      },
      variables:{
        content,
        to:toId
      }
     }
    )
    const {data:messageData, error:messageError}  = useSubscription(NEW_MESSAGE)
    React.useEffect(()=>{
      if(messageError) console.log(messageError)
      if(messageData){
        console.log(messageData)
      }
    },[messageError,messageData])
    React.useEffect(()=>{
      getMessages()
    },[toId])
  return (
    <Container>
      {" "}
      <WrapperBox>
        <Paper sx={{ padding: "15px" }}>
          <Typography
            sx={{ marginLeft: "15px" }}
            color="secondary"
            variant="h6"
          >
            My Messages
          </Typography>
        </Paper>
        <Box sx={{ display: "flex", marginTop: "1px", height: "70vh" }}>
          <Paper sx={{ width: "360px", height: "inherit", overflow: "auto" }}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {data?.getChatUsers.map((chat,idx)=>(
                <div key={chat.id} onClick={()=> navigate('/me/messages/'+chat.id)}>
                <ListItem  alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={chat?.firstName} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={`${chat?.firstName} ${chat?.lastName}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        
                      </Typography>
                      {` ${chat?.latestMessage}`}
                    </React.Fragment>
                  }
                />
                
              </ListItem>
              <Divider variant="inset" component="li" />
              </div>
              ))}
              
              
            </List>
          </Paper>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {dataMessages?.getMessages.map(msg=><Box key={msg._id}
                sx={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: msg.users[0]=== userInfo.id ? "flex-end": "flex-start",
                }}
              >
                <MessageBox>
                  <Typography component="p">
                    {msg?.content}
                  </Typography>
                  <Typography>21:20</Typography>
                </MessageBox>
              </Box>)}
              
            </Box>
            <Paper>
              <Box
                sx={{
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <StyledInput
                  type="text"
                  placeholder="Write your message here"
                  onChange={(e)=>setContent(e.target.value)}
                ></StyledInput>
                <Box >
                  <SendIcon
                    onClick={postMessage}
                    sx={{ cursor: "pointer" }}
                    fontSize="large"
                    color="secondary"
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </WrapperBox>
    </Container>
  );
};

export default Message;
