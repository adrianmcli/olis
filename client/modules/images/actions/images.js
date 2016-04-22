import {Cloudinary} from 'meteor/lepozepo:cloudinary';

export default {
  add({Meteor}, files) {
    const IMAGES_ADD = 'actions.images.add';

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

      _upload(files)
      .then(_addProfilePic)
      .catch(err => console.log(err));
    }
    catch (err) { console.log(err); }
  },

  sendMsg({Meteor, FlowRouter}, files) {
    const IMAGES_SEND_MSG = 'actions.images.sendMsg';
    const convoId = FlowRouter.getParam('convoId');

    function _sendMsg(cloudinaryRes) {
      const cloudinaryPublicId = cloudinaryRes.public_id;

      return new Promise((resolve, reject) => {
        Meteor.call('msgs.add', {convoId, cloudinaryPublicId}, err => {
          if (err) { reject(err); }
          else { resolve(); }
        });
      });
    }

    try {
      if (!Meteor.userId()) {
        throw new Meteor.Error(IMAGES_SEND_MSG, 'Must be logged in to upload images.');
      }
      if (!files) {
        throw new Meteor.Error(IMAGES_SEND_MSG, 'File must not be null or undefined.');
      }
      if (files.length !== 1) {
        throw new Meteor.Error(IMAGES_SEND_MSG, 'Must upload a single file.');
      }

      _upload(files)
      .then(_sendMsg)
      .catch(err => console.log(err));
    }
    catch (err) { console.log(err); }
  },
};

function _upload(files) {
  return new Promise((resolve, reject) => {
    Cloudinary.upload(files, {}, (err, res) => {
      if (err) { reject(err); }
      else { resolve(res); }
    });
  });
}
