import React from 'react';

export default class NoAccount extends React.Component {
  render() {
    return (
      <div>
        <h2>Register</h2>
        <a href="/register">Create a new account.</a>

        <h2>Has someone invited you to Olis alredy?</h2>
        <a href="/find-my-team">Find My Team</a>
      </div>
    );
  }
}