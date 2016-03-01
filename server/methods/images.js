import {Meteor} from 'meteor/meteor';

export default function () {
  Meteor.methods({
    'images.add'() {
      console.log('cloudinary haha');
      
    }
  });
}
