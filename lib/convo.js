import {Astro} from 'meteor/jagi:astronomy';
import {Convos} from './collections';
import R from 'ramda';

const Convo = Astro.Class({
  name: 'Convo',
  collection: Convos,
  fields: {
    name: {
      type: 'string',
      default() { return 'Default Convo'; }
    },
    userIds: {
      type: 'array',
      default() { return []; }
    },
    teamId: {
      type: 'string',
      default() { return 'noTeamId'; }
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  },
  methods: {
    isUserInConvo(input) {
      const userIds = input.constructor === Array ? input : [ input ];
      return R.intersection(userIds, this.userIds).length === userIds.length;
    }
  }
});
export default Convo;
