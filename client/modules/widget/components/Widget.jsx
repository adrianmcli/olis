import React, { Component } from 'react';
import { Widgets } from '/client/modules/widgets';
import RemoveIcon from 'material-ui/lib/svg-icons/navigation/close';

export default class Widget extends Component {
  render() {
    const {
      data, widgetId, noteId, userId, lock, type,
      remove, update, requestAndReleaseOtherLocks, releaseLock
    } = this.props;

    const WidgetType = Widgets[type];
    return (
      <div style={{position: 'relative', display: 'flex'}}>
        <WidgetType
          widgetId={widgetId}
          noteId={noteId}
          data={data}
          update={update}

          lock={lock}
          userId={userId}
          requestAndReleaseOtherLocks={requestAndReleaseOtherLocks}
          releaseLock={releaseLock}
        />
        <div style={getRemoveStyle().container} onClick={remove.bind(this, noteId, widgetId)}>
          <RemoveIcon style={getRemoveStyle().icon} color='rgba(0,0,0,0.5)'/>
        </div>
      </div>
    );
  }
}

function getRemoveStyle() {
  return {
    container: {
      position: 'absolute',
      top: '-12px',
      right: '-12px',
      backgroundColor: '#EEE',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12)',
      zIndex: '101',
    },
    icon: {
      width: '16px',
      height: '16px',
    },
  };
}
