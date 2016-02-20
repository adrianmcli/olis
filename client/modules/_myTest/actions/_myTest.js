// All actions are automatically passed the context as the first arg
export default {
  register({Meteor}, {email, username, password}) {
    Meteor.call('test.register', {email: 'a', username: 'b', password: 'c'}, (err, res) => {
      if (err) { console.log(err); }
      else { console.log(res); }
    });
  }
};
