import React from 'react';

import MuiDialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class Dialog extends React.Component {
  handleSubmit() {
    this.props.onSubmit();
  }

  handleClose() {
    this.props.onRequestClose();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.open && this.props.open) {
      setTimeout(() => {
        this.props.onShow();
      },250);
    }
  }

  render() {
    const {
      open,
      title,
      width,
      submitLabel,
      cancelLabel,
      closeActionOnly,
      noActions,
      actions,
      children,
      ...other
    } = this.props;

    const defaultActions = [
      <FlatButton
      label={ cancelLabel }
      secondary={true}
      onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label={ submitLabel }
        primary={true}
        onClick={this.handleSubmit.bind(this)}
      />,
    ];

    const closeAction = [
      <FlatButton
        label="Close"
        secondary={true}
        onClick={this.handleClose.bind(this)}
      />,
    ];

    let _actions = defaultActions;

    if (closeActionOnly) {
      _actions = closeAction;
    } else if (actions) {
      _actions = actions;
    }

    const titleStyle = {
      color: 'white',
      backgroundColor: '#2F3F70',
      padding: '24px 24px 16px',
    };

    return (
      <MuiDialog
        open={ open }
        onRequestClose={ this.handleClose.bind(this) }
        actions={ noActions ? undefined : _actions }
        contentStyle={{ width: `${width}px` }}
        title={ title }
        titleStyle={ titleStyle }
        {...other}
      >
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
  submitLabel: 'Submit',
  cancelLabel: 'Cancel',
  onSubmit() {console.log('onSubmit()');},
  closeActionOnly: false,
  noActions: false,
};
