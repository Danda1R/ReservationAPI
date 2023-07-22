/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReservation = /* GraphQL */ `
  subscription OnCreateReservation(
    $filter: ModelSubscriptionReservationFilterInput
  ) {
    onCreateReservation(filter: $filter) {
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
export const onUpdateReservation = /* GraphQL */ `
  subscription OnUpdateReservation(
    $filter: ModelSubscriptionReservationFilterInput
  ) {
    onUpdateReservation(filter: $filter) {
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
export const onDeleteReservation = /* GraphQL */ `
  subscription OnDeleteReservation(
    $filter: ModelSubscriptionReservationFilterInput
  ) {
    onDeleteReservation(filter: $filter) {
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
