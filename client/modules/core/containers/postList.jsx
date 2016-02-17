// import React from 'react';
import PostList from '../components/postList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('posts.list').ready()) {
    const posts = Collections.Posts.find().fetch();
    onData(null, {posts});
  }
};

// const Loading = () => (<div>test loading</div>);

export default composeAll(
  // composeWithTracker(composer, Loading),
  composeWithTracker(composer),
  useDeps()
)(PostList);
