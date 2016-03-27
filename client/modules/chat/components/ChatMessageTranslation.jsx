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
    const {translation, gettingTranslation} = this.props;

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
      const loadingColor = 'rgba(255,255,255,0.75)';
      const loadingStyle = {
        margin: 'auto',
        width: '20px',
        height: '20px',
      };
      return (
        <div className="translation">
          <hr />
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
