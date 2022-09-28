import { gql } from "@apollo/client";

const GET_MESSAGES = gql`
    query{
    getChatUsers {
        firstName
        lastName
        latestMessage
  }
    }
`
export {GET_MESSAGES}