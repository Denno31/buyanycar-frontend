import { gql } from "@apollo/client";

const GET_COUNTIES = gql`
  query {
    getCounties {
      code
      name
    }
  }
`;
const GET_SUB_COUNTIES = gql`
  query getSubCounties($countyName: String!) {
    getSubCounties(countyName: $countyName) {
      subCounty
      name
    }
  }
`;
export { GET_COUNTIES, GET_SUB_COUNTIES };
