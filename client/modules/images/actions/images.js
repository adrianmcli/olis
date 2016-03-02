import {Cloudinary} from 'meteor/lepozepo:cloudinary';

export default {
  add({Meteor}, files) {
    const IMAGES_ADD = 'actions.images.add';
    function _upload() {
      return new Promise((resolve, reject) => {
        Cloudinary.upload(files, {}, (err, res) => {
          if (err) { reject(err); }
          else { resolve(res); }
        });
      });
    }

    function _addProfilePic(cloudinaryRes) {
      return new Promise((resolve, reject) => {
        Meteor.call('account.addProfilePic', {cloudinaryPublicId: cloudinaryRes.public_id},
          (err, res) => {
            if (err) { reject(err); }
            else { resolve(res); }
          });
      });
    }

    try {
      if (!Meteor.userId()) {
        throw new Meteor.Error(IMAGES_ADD, 'Must be logged in to upload images.');
      }
      if (!files) {
        throw new Meteor.Error(IMAGES_ADD, 'File must not be null or undefined.');
      }
      if (files.length !== 1) {
        throw new Meteor.Error(IMAGES_ADD, 'Must upload a single file.');
      }

      _upload()
      .then(_addProfilePic)
      .catch(err => console.log(err));
    }
    catch (err) { console.log(err); }

  }
};
