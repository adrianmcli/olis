import React from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SettingsCard extends React.Component {

  actions() {
    const {
      resetButtonText,
      handleReset,
      submitButtonText,
      handleSubmit,
      disableReset,
      disableSubmit,
      actionText,
    } = this.props;

    const textStyle = {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '14px',
      fontStyle: 'italic',
      marginLeft: '8px',
    };

    return (
      <div>
        { disableReset ? null :
          <FlatButton
            label={ resetButtonText }
            onClick={ handleReset }
          />
        }
        { disableSubmit ? null :
          <RaisedButton
            label={ submitButtonText }
            secondary={true}
            onClick={ handleSubmit }
          />
        }
        { actionText !== '' ? <div style={textStyle}>{ actionText }</div> : null }
      </div>
    );
  }

  render() {
    const {
      title,
      subtitle,
      style,
      initiallyExpanded,
      children,
    } = this.props;

    const defaultStyle = {marginBottom: '25px'};
    const cardStyle = style ? Object.assign(defaultStyle, style) : defaultStyle;
    const cardTextStyle = {
      background: '#efefef',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
    };

    return (
      <Card style={cardStyle} initiallyExpanded={initiallyExpanded}>
        <CardHeader
          title={ title }
          subtitle={ subtitle }
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true} style={cardTextStyle}>
          { children }
        </CardText>
        <CardActions expandable={true}>
          { this.actions() }
        </CardActions>
      </Card>
    );
  }
}

SettingsCard.defaultProps = {
  title: 'Setting Card Title',
  subtitle: 'Subtitle for the setting card, typically a sentence long.',
  children: <div>Child Nodes</div>,
  resetButtonText: 'Reset',
  submitButtonText: 'Submit',
  handleReset() {console.log('handleReset');},
  handleSubmit() {console.log('handleSubmit');},
  disableReset: false,
  disableSubmit: false,
  actionText: '',
  initiallyExpanded: false,
};
