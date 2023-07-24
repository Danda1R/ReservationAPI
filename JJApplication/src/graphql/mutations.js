/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phone
      isActive
      userimage
      rsvp {
        nextToken
        startedAt
        __typename
      }
      accessToken
      refreshToken
      reserveID
      username
      groups {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phone
      isActive
      userimage
      rsvp {
        nextToken
        startedAt
        __typename
      }
      accessToken
      refreshToken
      reserveID
      username
      groups {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phone
      isActive
      userimage
      rsvp {
        nextToken
        startedAt
        __typename
      }
      accessToken
      refreshToken
      reserveID
      username
      groups {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
      id
      title
      numMembers
      user {
        nextToken
        startedAt
        __typename
      }
      event {
        nextToken
        startedAt
        __typename
      }
      isApproved
      creatorid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
      id
      title
      numMembers
      user {
        nextToken
        startedAt
        __typename
      }
      event {
        nextToken
        startedAt
        __typename
      }
      isApproved
      creatorid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
      id
      title
      numMembers
      user {
        nextToken
        startedAt
        __typename
      }
      event {
        nextToken
        startedAt
        __typename
      }
      isApproved
      creatorid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      title
      address
      description
      start_datetime
      end_datetime
      venue_name
      isApproved
      eventimage
      organizerid
      group {
        id
        title
        numMembers
        isApproved
        creatorid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      groupid
      rsvp {
        nextToken
        startedAt
        __typename
      }
      rsvp_total
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      title
      address
      description
      start_datetime
      end_datetime
      venue_name
      isApproved
      eventimage
      organizerid
      group {
        id
        title
        numMembers
        isApproved
        creatorid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      groupid
      rsvp {
        nextToken
        startedAt
        __typename
      }
      rsvp_total
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      title
      address
      description
      start_datetime
      end_datetime
      venue_name
      isApproved
      eventimage
      organizerid
      group {
        id
        title
        numMembers
        isApproved
        creatorid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      groupid
      rsvp {
        nextToken
        startedAt
        __typename
      }
      rsvp_total
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createRsvp = /* GraphQL */ `
  mutation CreateRsvp(
    $input: CreateRsvpInput!
    $condition: ModelRsvpConditionInput
  ) {
    createRsvp(input: $input, condition: $condition) {
      id
      status
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        email
        phone
        isActive
        userimage
        accessToken
        refreshToken
        reserveID
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      userid
      event {
        id
        title
        address
        description
        start_datetime
        end_datetime
        venue_name
        isApproved
        eventimage
        organizerid
        groupid
        rsvp_total
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      eventid
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateRsvp = /* GraphQL */ `
  mutation UpdateRsvp(
    $input: UpdateRsvpInput!
    $condition: ModelRsvpConditionInput
  ) {
    updateRsvp(input: $input, condition: $condition) {
      id
      status
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        email
        phone
        isActive
        userimage
        accessToken
        refreshToken
        reserveID
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      userid
      event {
        id
        title
        address
        description
        start_datetime
        end_datetime
        venue_name
        isApproved
        eventimage
        organizerid
        groupid
        rsvp_total
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      eventid
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteRsvp = /* GraphQL */ `
  mutation DeleteRsvp(
    $input: DeleteRsvpInput!
    $condition: ModelRsvpConditionInput
  ) {
    deleteRsvp(input: $input, condition: $condition) {
      id
      status
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        email
        phone
        isActive
        userimage
        accessToken
        refreshToken
        reserveID
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      userid
      event {
        id
        title
        address
        description
        start_datetime
        end_datetime
        venue_name
        isApproved
        eventimage
        organizerid
        groupid
        rsvp_total
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      eventid
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createGroupUser = /* GraphQL */ `
  mutation CreateGroupUser(
    $input: CreateGroupUserInput!
    $condition: ModelGroupUserConditionInput
  ) {
    createGroupUser(input: $input, condition: $condition) {
      id
      userId
      groupId
      user {
        id
        firstName
        lastName
        email
        phone
        isActive
        userimage
        accessToken
        refreshToken
        reserveID
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      group {
        id
        title
        numMembers
        isApproved
        creatorid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateGroupUser = /* GraphQL */ `
  mutation UpdateGroupUser(
    $input: UpdateGroupUserInput!
    $condition: ModelGroupUserConditionInput
  ) {
    updateGroupUser(input: $input, condition: $condition) {
      id
      userId
      groupId
      user {
        id
        firstName
        lastName
        email
        phone
        isActive
        userimage
        accessToken
        refreshToken
        reserveID
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      group {
        id
        title
        numMembers
        isApproved
        creatorid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteGroupUser = /* GraphQL */ `
  mutation DeleteGroupUser(
    $input: DeleteGroupUserInput!
    $condition: ModelGroupUserConditionInput
  ) {
    deleteGroupUser(input: $input, condition: $condition) {
      id
      userId
      groupId
      user {
        id
        firstName
        lastName
        email
        phone
        isActive
        userimage
        accessToken
        refreshToken
        reserveID
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      group {
        id
        title
        numMembers
        isApproved
        creatorid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
