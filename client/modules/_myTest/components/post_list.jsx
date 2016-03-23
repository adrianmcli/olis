import React from 'react';
import {Cloudinary} from 'meteor/lepozepo:cloudinary';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  handleChange(e) {
    const files = e.currentTarget.files;
    this.setState({
      files
    });
  }

  handleClick() {
    Cloudinary.upload(this.state.files, {}, (err, res) => {
      if (err) { console.log(err); }
      else { console.log(res); }
    });
  }

  render() {
    const {context, actions, posts} = this.props;
    return (
      <div className='postlist'>
        <div>Test</div>

        <div>
          <input type="file" ref="input" onChange={this.handleChange.bind(this)}></input>
          <button onClick={this.handleClick.bind(this)}>Upload!</button>
        </div>

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
  }
}

export default PostList;
