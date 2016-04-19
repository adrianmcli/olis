import React from 'react';
import ReactMarkdown from 'react-markdown';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {convertFromRaw, ContentState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

export default class ChatMessageText extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const rawContentState = this.props.content;
    const contentState = ContentState.createFromBlockArray(convertFromRaw(rawContentState));
    const html = stateToHTML(contentState);
    return <div>{html}</div>;

    // return (
    //   <ReactMarkdown
    //     source={content}
    //     softBreak="br"
    //     escapeHtml
    //   />
    // );
  }
}
ChatMessageText.defaultProps = {
  content: 'Default content'
};
