import {gql} from "@apollo/client"


const POST_MESSAGE = gql`
    mutation($content: String!, $to: ID!){
    postMessage(content: $content, to: $to) {
        content
        toUser
        fromUser
        _id
  }
}
`
export{POST_MESSAGE}
