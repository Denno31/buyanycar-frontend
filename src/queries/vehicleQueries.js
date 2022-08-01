import { gql } from "@apollo/client";

const GET_VEHICLES = gql`
  query {
    getVehicles {
      _id
      make
      model
      color
      condition
      transmission
      mileage
      vinChassisNumber
      description
      phoneNumber
      manufactureYear
      bodyType
      engineSize
      price
      location
      vehicleImageUrl
      vehicleOwner {
        firstName
        lastName
      }
      engineSize
      registered
    }
  }
`;
const GET_VEHICLE = gql`
  query getVehicle($vehicleId: ID!) {
    getVehicle(vehicleId: $vehicleId) {
      _id
      make
      model
      color
      condition
      transmission
      mileage
      vinChassisNumber
      description
      phoneNumber
      manufactureYear
      bodyType
      engineSize
      price
      location
      vehicleImageUrl
      negotiable
      fuel
      vehicleOwner {
        firstName
        lastName
      }
      engineSize
      registered
      description
    }
  }
`;
export { GET_VEHICLES, GET_VEHICLE };
