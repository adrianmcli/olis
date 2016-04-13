import React from 'react';
import ReactMarkdown from 'react-markdown';
import Loading from '/client/modules/core/components/Loading.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class ChatMessageTranslation extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  renderTranslationArea() {
    const {translation, gettingTranslation, selfAuthor} = this.props;

    if (translation) {
      return (
        <div className="translation">
          <hr />
          <ReactMarkdown
            source={translation}
            softBreak="br"
            escapeHtml
          />
        </div>
      );
    }
    if (gettingTranslation) {
      const loadingColor = selfAuthor ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.5)';
      const loadingStyle = {
        margin: 'auto',
        width: '20px',
        height: '20px',
      };
      const hrStyle = {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.12)}',
      };
      return (
        <div className="translation">
          <hr style={hrStyle}/>
          <Loading spinnerName='cube-grid' style={loadingStyle} color={loadingColor}/>
        </div>
      );
    }
    return null;
  }

  render() {
    return this.renderTranslationArea();
  }
}
