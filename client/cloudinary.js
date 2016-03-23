import {Meteor} from 'meteor/meteor';

export default function () {
  $.cloudinary.config({
    cloud_name: Meteor.settings.public.cloudinary.cloud_name
  });
}
