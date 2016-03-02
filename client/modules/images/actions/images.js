import {Cloudinary} from 'meteor/lepozepo:cloudinary';

export default {
  add({Meteor}, files) {
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

    _upload()
    .then(_addProfilePic)
    .catch(err => console.log(err));
  }
};
