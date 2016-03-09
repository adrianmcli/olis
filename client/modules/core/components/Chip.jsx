import React from 'react';

// import Avatar from 'material-ui/lib/avatar';
import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/cancel';

export default class Chip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  renderRemoveButton() {
    const iconStyle = {
      height: '20px',
      width: '20px',
      margin: '4px -6px 4px 4px',
      transition: 'none',
      cursor: 'pointer',
    };
    const iconColorDefault = 'rgba(0,0,0,0.3)';
    const iconColorHover = 'white';
    const iconColor = this.state.hover ? iconColorHover : iconColorDefault;
    return (
      <CloseIcon
        style={iconStyle}
        color={iconColor}
        size={20}
        onClick={this._handleClick.bind(this)}
      />
    );
  }

  _handleClick() {
    this.props.onRemoveClick.bind(this)();
  }

  _handleOnMouseEnter() {
    this.setState({hover: true});
  }

  _handleOnMouseLeave() {
    this.setState({hover: false});
  }

  render() {
    const { avatarSrc, username } = this.props;
    const chipStyle = {
      height: '32px',
      lineHeight: '32px',
      padding: '0 12px',
      fontSize: '13px',
      fontWeight: '500',
      backgroundColor: this.state.hover ? '#aaa' : '#efefef',
      borderRadius: '16px',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'default',
    };
    const avatarStyle = {
      margin: '0 8px 0 -12px',
      height: '32px',
      width: '32px',
      borderRadius: '50%',
    };

    const textStyle = {
      fontSize: '13px',
      fontWeight: '400',
      lineHeight: '16px',
      color: this.state.hover ? 'white' : 'rgba(0,0,0,0.87)',
    };
    return (
      <div
        style={chipStyle}
        onMouseEnter={this._handleOnMouseEnter.bind(this)}
        onMouseLeave={this._handleOnMouseLeave.bind(this)}
      >

        <AvatarWithDefault
          avatarSrc={avatarSrc}
          username={username}
          size={32}
          style={avatarStyle}
        />

        <span style={textStyle}>
          {username}
        </span>

        { this.renderRemoveButton() }

      </div>
    );
  }
}

Chip.defaultProps = {
  onRemoveClick: () => {alert(`remove ${this.props.username}`);},
  username: 'UserName',
};
