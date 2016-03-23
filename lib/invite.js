import {Astro} from 'meteor/jagi:astronomy';
import {Invites} from './collections';

const Invite = Astro.Class({
  name: 'Invite',
  collection: Invites,
  fields: {
    userId: {
      type: 'string'
    },
    teamId: {
      type: 'string'
    },
    invitedBy: {
      type: 'string'
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  }
});
export default Invite;
