import React from 'react';

const PostList = ({context, actions, posts}) => (
  <div className='postlist'>
    Test
    <div><button onClick={actions().test.register}>Register</button></div>
    <ul>
      {posts.map(post => (
        <li key={post._id}>
          <a href={`/post/${post._id}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default PostList;
