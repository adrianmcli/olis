import React from 'react';
import ReactMarkdown from 'react-markdown';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class ChatMessageText extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {content} = this.props;
    // console.log(`ChatMessageText ${content}`);
    return (
      <ReactMarkdown
        source={content}
        softBreak="br"
        escapeHtml
      />
    );
  }
}
ChatMessageText.defaultProps = {
  content: 'Default content'
};
