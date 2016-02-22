import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Badge from 'material-ui/lib/badge';

export default class Team extends React.Component {
  render() {
    const {active} = this.props;

    const badgeStyle = {
      top: '-5px',
      right: '-5px',
      pointerEvents: 'none',
      // backgroundColor: 'blue', // change badge colour here
    };

    const className = active ? 'team-item active' : 'team-item';

    return (
      <div>
        {/* A Team Button w/ a Notification Badge */}
        <Badge
          badgeContent={4}
          primary={true}
          style={{padding:'0',display:'block'}}
          badgeStyle={badgeStyle}
        >
          <div className={className}>
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/getsocial_now/128.jpg" alt=""/>
          </div>
        </Badge>
      </div>
    );
  }
}
Team.propTypes = {
  active: React.PropTypes.bool
}
Team.defaultProps = {
  active: false
}