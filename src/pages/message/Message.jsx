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
import { GET_MESSAGES } from "../../queries/messageQueries";
import { useQuery } from "@apollo/client";
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
  const {loading,error,data} = useQuery(GET_MESSAGES)
  console.log(data)
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
                <div key={idx}>
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
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <MessageBox>
                  <Typography component="p">
                    This is recipients message
                  </Typography>
                  <Typography>21:20</Typography>
                </MessageBox>
              </Box>
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <MessageBox>
                  <Typography component="p">This is my message</Typography>
                  <Typography>21:20</Typography>
                </MessageBox>
              </Box>
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
                ></StyledInput>
                <Box>
                  <SendIcon
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
