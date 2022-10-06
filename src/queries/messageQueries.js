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
export {GET_CHATS,GET_MESSAGES}