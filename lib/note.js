import {Meteor} from 'meteor/meteor';
import {Astro} from 'meteor/jagi:astronomy';
import {Notes} from './collections';
import R from 'ramda';

const Note = Astro.Class({
  name: 'Note',
  collection: Notes,
  fields: {
    test: {
      type: 'string'
    }
  }
});
export default Note;
