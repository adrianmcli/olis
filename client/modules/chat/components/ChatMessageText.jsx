import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {convertFromRaw, ContentState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = linkifyIt();
linkify.tlds(tlds);

export default class ChatMessageText extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  insertLinks(links, plainText) {
    if (!links || !links[0]) {
      return plainText
    }
    var last = 0;
    var result = [];
    links.map(link => {
      if (last < link.index) {
        result.push(escape(plainText.slice(last, link.index)).replace(/\r?\n/g, '<br>'));
      }
      result.push('<a target="_blank" href="');
      result.push(escape(link.url));
      result.push('">');
      result.push(escape(link.text));
      result.push('</a>');
      last = link.lastIndex;
    });
    if (last < plainText.length) {
      result.push(escape(plainText.slice(last)).replace(/\r?\n/g, '<br>'));
    }
    return result.join('');
  }

  render() {
    const rawContentState = this.props.content;
    const contentState = ContentState.createFromBlockArray(convertFromRaw(rawContentState));
    // const html = stateToHTML(contentState);
    // return <div dangerouslySetInnerHTML={{__html: html}} />;
    const plainText = contentState.getPlainText();
    const links = linkify.match(plainText);
    const linkedText = '<p>' + this.insertLinks(links, plainText) + '</p>';
    const output = decodeURIComponent(linkedText);
    return <div dangerouslySetInnerHTML={{__html: output}} />
  }
}
ChatMessageText.defaultProps = {
  content: 'Default content'
};
