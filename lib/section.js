import {Meteor} from 'meteor/meteor';
import {Astro} from 'meteor/jagi:astronomy';
import {Sections} from './collections';
import R from 'ramda';

const Section = Astro.Class({
  name: 'Section',
  collection: Sections,
  fields: {
    test: {
      type: 'string'
    }
  }
});
export default Section;
