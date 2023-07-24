import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email: string;
  readonly phone?: string | null;
  readonly isActive?: boolean | null;
  readonly userimage?: string | null;
  readonly rsvp?: (Rsvp | null)[] | null;
  readonly accessToken?: string | null;
  readonly refreshToken?: string | null;
  readonly reserveID?: string | null;
  readonly username?: string | null;
  readonly groups?: (GroupUser | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email: string;
  readonly phone?: string | null;
  readonly isActive?: boolean | null;
  readonly userimage?: string | null;
  readonly rsvp: AsyncCollection<Rsvp>;
  readonly accessToken?: string | null;
  readonly refreshToken?: string | null;
  readonly reserveID?: string | null;
  readonly username?: string | null;
  readonly groups: AsyncCollection<GroupUser>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerGroup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Group, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly numMembers?: number | null;
  readonly user?: (GroupUser | null)[] | null;
  readonly event?: (Event | null)[] | null;
  readonly isApproved?: boolean | null;
  readonly creatorid: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGroup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Group, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly numMembers?: number | null;
  readonly user: AsyncCollection<GroupUser>;
  readonly event: AsyncCollection<Event>;
  readonly isApproved?: boolean | null;
  readonly creatorid: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Group = LazyLoading extends LazyLoadingDisabled ? EagerGroup : LazyGroup

export declare const Group: (new (init: ModelInit<Group>) => Group) & {
  copyOf(source: Group, mutator: (draft: MutableModel<Group>) => MutableModel<Group> | void): Group;
}

type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly address: string;
  readonly description?: string | null;
  readonly start_datetime: string;
  readonly end_datetime?: string | null;
  readonly venue_name?: string | null;
  readonly isApproved?: boolean | null;
  readonly eventimage?: string | null;
  readonly organizerid?: string | null;
  readonly group?: Group | null;
  readonly groupid?: string | null;
  readonly rsvp?: (Rsvp | null)[] | null;
  readonly rsvp_total?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly address: string;
  readonly description?: string | null;
  readonly start_datetime: string;
  readonly end_datetime?: string | null;
  readonly venue_name?: string | null;
  readonly isApproved?: boolean | null;
  readonly eventimage?: string | null;
  readonly organizerid?: string | null;
  readonly group: AsyncItem<Group | undefined>;
  readonly groupid?: string | null;
  readonly rsvp: AsyncCollection<Rsvp>;
  readonly rsvp_total?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

type EagerRsvp = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Rsvp, 'id'>;
  };
  readonly id: string;
  readonly status?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly user?: User | null;
  readonly userid?: string | null;
  readonly event?: Event | null;
  readonly eventid?: string | null;
}

type LazyRsvp = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Rsvp, 'id'>;
  };
  readonly id: string;
  readonly status?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly user: AsyncItem<User | undefined>;
  readonly userid?: string | null;
  readonly event: AsyncItem<Event | undefined>;
  readonly eventid?: string | null;
}

export declare type Rsvp = LazyLoading extends LazyLoadingDisabled ? EagerRsvp : LazyRsvp

export declare const Rsvp: (new (init: ModelInit<Rsvp>) => Rsvp) & {
  copyOf(source: Rsvp, mutator: (draft: MutableModel<Rsvp>) => MutableModel<Rsvp> | void): Rsvp;
}

type EagerGroupUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GroupUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly groupId?: string | null;
  readonly user: User;
  readonly group: Group;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGroupUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GroupUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly groupId?: string | null;
  readonly user: AsyncItem<User>;
  readonly group: AsyncItem<Group>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type GroupUser = LazyLoading extends LazyLoadingDisabled ? EagerGroupUser : LazyGroupUser

export declare const GroupUser: (new (init: ModelInit<GroupUser>) => GroupUser) & {
  copyOf(source: GroupUser, mutator: (draft: MutableModel<GroupUser>) => MutableModel<GroupUser> | void): GroupUser;
}