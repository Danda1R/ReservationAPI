/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup($filter: ModelSubscriptionGroupFilterInput) {
    onCreateGroup(filter: $filter) {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup($filter: ModelSubscriptionGroupFilterInput) {
    onUpdateGroup(filter: $filter) {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup($filter: ModelSubscriptionGroupFilterInput) {
    onDeleteGroup(filter: $filter) {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
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
export const onCreateRsvp = /* GraphQL */ `
  subscription OnCreateRsvp($filter: ModelSubscriptionRsvpFilterInput) {
    onCreateRsvp(filter: $filter) {
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
export const onUpdateRsvp = /* GraphQL */ `
  subscription OnUpdateRsvp($filter: ModelSubscriptionRsvpFilterInput) {
    onUpdateRsvp(filter: $filter) {
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
export const onDeleteRsvp = /* GraphQL */ `
  subscription OnDeleteRsvp($filter: ModelSubscriptionRsvpFilterInput) {
    onDeleteRsvp(filter: $filter) {
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
export const onCreateGroupUser = /* GraphQL */ `
  subscription OnCreateGroupUser(
    $filter: ModelSubscriptionGroupUserFilterInput
  ) {
    onCreateGroupUser(filter: $filter) {
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
export const onUpdateGroupUser = /* GraphQL */ `
  subscription OnUpdateGroupUser(
    $filter: ModelSubscriptionGroupUserFilterInput
  ) {
    onUpdateGroupUser(filter: $filter) {
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
export const onDeleteGroupUser = /* GraphQL */ `
  subscription OnDeleteGroupUser(
    $filter: ModelSubscriptionGroupUserFilterInput
  ) {
    onDeleteGroupUser(filter: $filter) {
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
