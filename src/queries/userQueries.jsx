import { gql } from "@apollo/client";

const USER_FAVORITE_VEHICLES = gql`
  query {
    getFavoriteVehicles {
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
      engineSize
      registered
    }
  }
`;
export { USER_FAVORITE_VEHICLES };
