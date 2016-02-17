import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Register from '../components/register.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,

});

export const composer = ({context, actions}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('posts.list').ready()) {
    const posts = Collections.Posts.find().fetch();
    onData(null, {posts});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Register);
