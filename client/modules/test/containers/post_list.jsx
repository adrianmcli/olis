import React from 'react';
import PostList from '../components/post_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

// console.log('Meteor.users');
// console.log(Meteor.users);

// This is still visible as a global, in fact it seems like everything still is
// console.log('Accounts');
// console.log(Accounts);

export const depsMapper = (context) => ({
  context: () => context,
  test: 'test'
});

// If no depsMapper provided, default is:
// const depsMapper = (context, actions) => ({
//   context: () => context,
//   actions: () => actions
// });

// First arg is from the obj returned by depsMapper
export const composer = ({context, test}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('posts.list').ready()) {
    const posts = Collections.Posts.find().fetch();
    onData(null, {posts}); // posts is provided to the PostList as props
  }
};

const Loading = () => (<div>test loading</div>);
export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper) // Obj returned by deps mapper is the props obj to composer
)(PostList);
