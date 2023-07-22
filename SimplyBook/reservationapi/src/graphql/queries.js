/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReservation = /* GraphQL */ `
  query GetReservation($id: ID!) {
    getReservation(id: $id) {
      id
      user_id
      accessToken
      refreshToken
      reserveID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listReservations = /* GraphQL */ `
  query ListReservations(
    $filter: ModelReservationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        accessToken
        refreshToken
        reserveID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
