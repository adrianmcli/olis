import {Meteor} from 'meteor/meteor';
import {Cloudinary} from 'meteor/lepozepo:cloudinary';

export default function () {
  Cloudinary.config({
    cloud_name: Meteor.settings.cloudinary.cloud_name,
    api_key: Meteor.settings.cloudinary.api_key,
    api_secret: Meteor.settings.cloudinary.api_secret
  });
}
