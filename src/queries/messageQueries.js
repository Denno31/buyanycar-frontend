import { gql } from "@apollo/client";

const GET_CHATS = gql`
    query{
    getChatUsers {
        firstName
        lastName
        latestMessage
        id
  }
    }
`
const GET_MESSAGES = gql`
    query GetMessages($fromUser: ID) {
  getMessages(fromUser: $fromUser) {
    content
    createdAt 
    toUser
    fromUser
    _id
    users
  }
 
}
`
const NEW_MESSAGE =  gql`
subscription newMessage{
  newMessage{
    fromUser
    toUser
    _id
    createdAt
    content
    user
  }
}
`
export {GET_CHATS,GET_MESSAGES,NEW_MESSAGE}