import {Teams} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
// import {check} from 'meteor/check';

export default function () {
  Meteor.publish('teams.list', function () {
    // const userId = this.userid;

    const selector = {};
    const options = {
      fields: {_id: 1, title: 1},
    };

    return Teams.find(selector, options);
  });
}
