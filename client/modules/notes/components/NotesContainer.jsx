import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import NotesHeader from './NotesHeader.jsx';

export default class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {
      userId
    } = this.props;
    return (
      <div id="notes-container">
        <NotesHeader />
        <div className="notes-data-wrapper">

        </div>
      </div>
    );
  }
}
NotesContainer.defaultProps = {
  widgets: []
};
