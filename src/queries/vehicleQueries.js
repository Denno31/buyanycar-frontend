import { gql } from "@apollo/client";

const GET_VEHICLES = gql`
  query getVehicles(
    $order: String
    $make: String
    $model: String
    $manufactureYearMin: String
    $manufactureYearMax: String
    $condition: [String]
    $bodyType: [String]
    $engineSize: [Float]
    $color: [String]
    $fuel: [String]
    $transmission: [String]
    $price_min: Float
    $price_max: Float
    $registered: String
  ) {
    getVehicles(
      order: $order
      vehicleFilter: {
        make: $make
        manufactureYearMin: $manufactureYearMin
        manufactureYearMax: $manufactureYearMax
        condition: $condition
        bodyType: $bodyType
        engineSize: $engineSize
        color: $color
        fuel: $fuel
        transmission: $transmission
        price_min: $price_min
        price_max: $price_max
        registered: $registered
        model: $model
      }
    ) {
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
const GET_VEHICLES_BY_USER = gql`
  query getVehiclesByUser($userId: ID!) {
    getVehiclesByUser(userId: $userId) {
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
const GET_VEHICLE_SIMILAR = gql`
  query getSimilarVehicles($vehicleMake: String!) {
    getSimilarVehicles(vehicleMake: $vehicleMake) {
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
      engineSize
      registered
      description
    }
  }
`;
export {
  GET_VEHICLES,
  GET_VEHICLE,
  GET_VEHICLE_MAKES,
  GET_VEHICLE_MODEL,
  GET_VEHICLES_BY_USER,
  GET_VEHICLE_SIMILAR,
};
