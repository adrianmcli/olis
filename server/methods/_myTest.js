import {Posts, Comments} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'posts.create'(_id, title, content) {
      check(_id, String);
      check(title, String);
      check(content, String);

      // Show the latency compensations
      Meteor._sleepForMs(500);

      // XXX: Do some user authorization
      const createdAt = new Date();
      const post = {_id, title, content, createdAt};
      Posts.insert(post);
    }
  });

  Meteor.methods({
    'posts.createComment'(_id, postId, text) {
      check(_id, String);
      check(postId, String);
      check(text, String);

      // Show the latency compensations
      Meteor._sleepForMs(500);

      // XXX: Do some user authorization
      const createdAt = new Date();
      const author = 'The User';
      const comment = {_id, postId, author, text, createdAt};
      Comments.insert(comment);
    }
  });

  const ACCOUNT_REGISTER = 'test.register';
  Meteor.methods({
    'test.register'({email, username, password}) {
      check(arguments[0], {
        email: String,
        username: String,
        password: String
      });

      function create(reject) {
        try {
          console.log('create');
          const userId = Accounts.createUser({username, email, password});
        }
        catch (e) {
          reject(e);
        }
      }

      function someTask() {
        console.log('someTask');
      }

      function longReject(reject) {
        console.log('longReject start');
        try {
          Meteor._sleepForMs(3000);
          throw new Meteor.Error(ACCOUNT_REGISTER, 'long reject end meteor error');

          // Doesn't work
          // Meteor.setTimeout(() => {
          //   throw new Meteor.Error(ACCOUNT_REGISTER, 'long reject end meteor error');
          // }, 3000);
        }
        catch (e) {
          reject({reason: 'long reject end'});
        }
      }

      function someTask2() {
        console.log('someTask2');
      }

      return new Promise((resolve, reject) => {
        // Everything will run, if something fails, that error will be sent back to client
        create(reject);
        someTask();
        longReject(reject);
        someTask2();
        resolve(`Welcome ${username}!`);
      })
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        throw new Meteor.Error(ACCOUNT_REGISTER, err.reason); // Sent back to client
      });
    }
  });
}
