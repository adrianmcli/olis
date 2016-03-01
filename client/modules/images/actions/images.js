import {Cloudinary} from 'meteor/lepozepo:cloudinary';

export default {
  add({Meteor}, files) {
    Cloudinary.upload(files, {}, (err, res) => {
      if (err) { console.log(err); }
      else {
        // Meteor.call('account.addImage', (err, res) => {
        //   if (err) { console.log(err); }
        //   else { console.log(res); }
        // });
        console.log(res);
      }
    });
  }
};
