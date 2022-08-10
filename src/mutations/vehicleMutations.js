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
export { POST_ADD };
