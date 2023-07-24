// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Group, Event, Rsvp, GroupUser } = initSchema(schema);

export {
  User,
  Group,
  Event,
  Rsvp,
  GroupUser
};