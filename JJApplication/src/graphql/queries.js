/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
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
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncGroups = /* GraphQL */ `
  query SyncGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGroups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const eventsByGroupid = /* GraphQL */ `
  query EventsByGroupid(
    $groupid: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByGroupid(
      groupid: $groupid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getRsvp = /* GraphQL */ `
  query GetRsvp($id: ID!) {
    getRsvp(id: $id) {
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
export const listRsvps = /* GraphQL */ `
  query ListRsvps(
    $filter: ModelRsvpFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRsvps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        createdAt
        updatedAt
        userid
        eventid
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncRsvps = /* GraphQL */ `
  query SyncRsvps(
    $filter: ModelRsvpFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRsvps(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        status
        createdAt
        updatedAt
        userid
        eventid
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const rsvpsByUserid = /* GraphQL */ `
  query RsvpsByUserid(
    $userid: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRsvpFilterInput
    $limit: Int
    $nextToken: String
  ) {
    rsvpsByUserid(
      userid: $userid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        createdAt
        updatedAt
        userid
        eventid
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const rsvpsByEventid = /* GraphQL */ `
  query RsvpsByEventid(
    $eventid: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRsvpFilterInput
    $limit: Int
    $nextToken: String
  ) {
    rsvpsByEventid(
      eventid: $eventid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        createdAt
        updatedAt
        userid
        eventid
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getGroupUser = /* GraphQL */ `
  query GetGroupUser($id: ID!) {
    getGroupUser(id: $id) {
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
export const listGroupUsers = /* GraphQL */ `
  query ListGroupUsers(
    $filter: ModelGroupUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        groupId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncGroupUsers = /* GraphQL */ `
  query SyncGroupUsers(
    $filter: ModelGroupUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGroupUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userId
        groupId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const groupUsersByUserId = /* GraphQL */ `
  query GroupUsersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupUsersByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const groupUsersByGroupId = /* GraphQL */ `
  query GroupUsersByGroupId(
    $groupId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupUsersByGroupId(
      groupId: $groupId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
