import { gql } from "@apollo/client";

const GET_VEHICLES = gql`
  query getVehicles($order: String) {
    getVehicles(order: $order) {
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
const GET_VEHICLE_MAKES = gql`
  query GetVehicleMakes {
    vehicleMakes {
      _id
      make
    }
  }
`;
const GET_VEHICLE_MODEL = gql`
  query getVehicleModels($vehicleMake: String!) {
    vehicleModels(vehicleMake: $vehicleMake) {
      model
      make
    }
  }
`;

export { GET_VEHICLES, GET_VEHICLE, GET_VEHICLE_MAKES, GET_VEHICLE_MODEL };
