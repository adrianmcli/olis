import React from 'react';

import Paper from 'material-ui/lib/paper';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

export default class OnboardingWrapper extends React.Component {

  renderProgress() {
    const { dataSrc, currentStep } = this.props;
    const defaultItem = <ProgressItem key='default' description='You clicked sign up!' done/>;
    const progressItems = dataSrc.map( (stepItem, index) => {
      return (
          <ProgressItem
            key={index}
            description={stepItem.description}
            done={currentStep > index}
            current={currentStep === index}
            last={dataSrc.length - 1 === index}
          />
        );
    });
    return [ defaultItem, ...progressItems ];
  }

  renderStepPhrase(stepsLeft) {
    const style = {fontSize: '26px'};
    switch (stepsLeft) {
      case 0:
        return <span style={style}>Done!</span>;
      case 1:
        return <span style={style}>One more to go!</span>;
      default:
        return (
          <div>
            <span className="num-left">{ stepsLeft }</span>
            <span style={style}>steps left</span>
          </div>
        );
    }
  }

  render() {

    const paperStyle = {
      width: '770px',
      height: '500px',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden'
    };

    const contentContainerStyle = {
      width: '100%',
      padding: '0 40px 20px 24px',
      color: '#9e9e9e',
    };

    const titleStyle = {
      fontWeight: '300',
      marginTop: '30px',
    };

    const { dataSrc, currentStep } = this.props;
    const { title, content } = dataSrc[currentStep];
    const stepsLeft = dataSrc.length - currentStep - 1; // account for counting from 0

    return (
      <div className="onboarding-wrapper">
        <Paper style={paperStyle} zDepth={3}>
          <div className="onboarding-sidebar">
            <h1 className="sidebar-title">Registration</h1>
            <hr className="fancy-line" />
            <div className="steps-left-container">
            { this.renderStepPhrase(stepsLeft) }
            </div>
            <div className="progress-list">
              { this.renderProgress.bind(this)() }
            </div>
          </div>
          <div className="onboarding-shadow-container"></div>
          <div className="onboarding-main">
            <div style={contentContainerStyle}>
              <h1 style={titleStyle}> { title } </h1>
              <ReactCSSTransitionReplace transitionName="fade-wait" 
                               transitionEnterTimeout={500} transitionLeaveTimeout={500} overflowHidden={false}>
                { content }
              </ReactCSSTransitionReplace>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

import CheckIcon from 'material-ui/lib/svg-icons/toggle/check-box';
import EmptyIcon from 'material-ui/lib/svg-icons/toggle/check-box-outline-blank';

class ProgressItem extends React.Component {
  render() {
    const { done, current, last, description } = this.props;
    const itemColor = current ? 'white' : '#999';
    let icon = done ? <CheckIcon color="#2ECC40" /> : <EmptyIcon color={itemColor} />;
    const text = description ? description : 'You clicked sign up!';
    icon = last ? <EmptyIcon color="transparent" /> : icon;

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <div style={{marginRight: '12px'}}>{ icon }</div>
        <div style={{color: itemColor}}>{ text }</div>
      </div>
    );
  }
}
