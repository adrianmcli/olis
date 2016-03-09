import React from 'react';

import MuiDialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class Dialog extends React.Component {
  handleSubmit() {
    this.handleClose();
  }

  handleClose() {
    this.props.onRequestClose();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.open && this.props.open) {
      setTimeout(() => {
        this.props.onShow();
      },500);
    }
  }

  render() {
    const { open, title, width, submitText, cancelText, children } = this.props;

    const actions = [
      <FlatButton
      label={ cancelText }
      secondary={true}
      onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label={ submitText }
        primary={true}
        onClick={this.handleSubmit.bind(this)}
      />,
    ];

    const titleStyle = {
      color: 'white',
      backgroundColor: '#2F3F70',
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: '400',
      margin: '-24px -24px 0',
      padding: '24px 24px 16px',
    };

    return (
      <MuiDialog
        open={ open }
        onRequestClose={ this.handleClose.bind(this) }
        actions={ actions }
        contentStyle={{ width: `${width}px` }}
      >
      <h3 style={titleStyle}>
        { title }
      </h3>
        { children }
      </MuiDialog>
    );
  }
}

Dialog.defaultProps = {
  width: '700px',
  title: 'My Modal',
  onRequestClose() {console.log('onRequestClose()');},
  onShow() {console.log('onShow()');},
  submitText: 'Submit',
  cancelText: 'Cancel',
};
