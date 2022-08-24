import { gql } from "@apollo/client";

const POST_ADD = gql`
  mutation postVehicle(
    $transmission: String!
    $price: Float!
    $make: String!
    $model: String!
    $vehicleImageUrl: [String!]!
    $color: String!
    $mileage: Float!
    $description: String!
    $phoneNumber: String!
    $fuel: String!
    $negotiable: Boolean!
    $manufactureYear: String!
    $condition: String!
    $bodyType: String!
    $location: String!
    $engineSize: Float!
    $registered: Boolean!
    $vinChassisNumber: String
  ) {
    postVehicle(
      vehicleInput: {
        transmission: $transmission
        price: $price
        make: $make
        model: $model
        vehicleImageUrl: $vehicleImageUrl
        color: $color
        mileage: $mileage
        description: $description
        phoneNumber: $phoneNumber
        fuel: $fuel
        negotiable: $negotiable
        manufactureYear: $manufactureYear
        condition: $condition
        bodyType: $bodyType
        location: $location
        engineSize: $engineSize
        registered: $registered
        vinChassisNumber: $vinChassisNumber
      }
    ) {
      make
      model
    }
  }
`;
const UPDATE_ADD = gql`
  mutation editVehicle(
    $_id: ID!
    $transmission: String!
    $price: Float!
    $make: String!
    $model: String!
    $vehicleImageUrl: [String!]!
    $color: String!
    $mileage: Float!
    $description: String!
    $phoneNumber: String!
    $fuel: String!
    $negotiable: Boolean!
    $manufactureYear: String!
    $condition: String!
    $bodyType: String!
    $location: String!
    $engineSize: Float!
    $registered: Boolean!
    $vinChassisNumber: String
  ) {
    editVehicle(
      vehicleInput: {
        _id: $_id
        transmission: $transmission
        price: $price
        make: $make
        model: $model
        vehicleImageUrl: $vehicleImageUrl
        color: $color
        mileage: $mileage
        description: $description
        phoneNumber: $phoneNumber
        fuel: $fuel
        negotiable: $negotiable
        manufactureYear: $manufactureYear
        condition: $condition
        bodyType: $bodyType
        location: $location
        engineSize: $engineSize
        registered: $registered
        vinChassisNumber: $vinChassisNumber
      }
    ) {
      make
      model
    }
  }
`;
const DELETE_ADD = gql`
  mutation deleteVehicle($vehicleId: ID!) {
    deleteVehicle(vehicleId: $vehicleId) {
      make
      model
    }
  }
`;
export { POST_ADD, UPDATE_ADD, DELETE_ADD };
