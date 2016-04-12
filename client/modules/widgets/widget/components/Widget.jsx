import React, { Component } from 'react';
import { Widgets } from '/client/modules/widgets';
import RemoveIcon from 'material-ui/lib/svg-icons/navigation/close';

export default class Widget extends Component {
  render() {
    const { widget, removeWidget, update } = this.props;
    const { _id: widgetId, noteId, type } = widget;

    const WidgetType = Widgets[type];
    return (
      <div style={{position: 'relative', display: 'flex'}}>
        <WidgetType
          widgetId={widget._id}
          noteId={widget.noteId}
          data={widget.data}
          update={update}
        />
        <div style={getRemoveStyle().container} onClick={removeWidget.bind(this, noteId, widgetId)}>
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
    },
    icon: {
      width: '16px',
      height: '16px',
    },
  };
}
