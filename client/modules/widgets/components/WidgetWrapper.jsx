import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import _ from 'lodash';
import { ItemTypes } from '/lib/constants/widgets';
import { widgetSource, collectSource, widgetTarget, collectTarget } from '../utils/draggable';

import DragHandle from './DragHandle.jsx';
import Paper from 'material-ui/lib/paper';
import RemoveIcon from 'material-ui/lib/svg-icons/navigation/close';

class WidgetWrapper extends Component {
  render() {
    const {
      isDragging, connectDragSource, connectDragPreview, connectDropTarget,
      remove, noteId, widgetId
    } = this.props;
    const { children } = this.props;
    const containerStyle = {
      opacity: isDragging ? 0 : 1,
      display: 'flex',
      padding: '12px 12px 12px 0',
      position: 'relative',
    };
    const widgetContainerStyle = {
      flexGrow: '1',
      maxWidth: 'calc(100% - 22px)',
      overflow: 'auto',
      fontFamily: 'inherit',
    };

    return connectDropTarget(connectDragPreview(
      <div style={containerStyle}>
        { connectDragSource(<div><DragHandle /></div>) } {/* div must be there */}
        <Paper style={widgetContainerStyle}>
          { children }
        </Paper>
        <div style={getRemoveStyle().container} onClick={remove.bind(this, noteId, widgetId)}>
          <RemoveIcon style={getRemoveStyle().icon} color='rgba(0,0,0,0.5)'/>
        </div>
      </div>
    ));
  }
}
WidgetWrapper.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  children: PropTypes.node,

  index: PropTypes.number.isRequired,
  noteId: PropTypes.string.isRequired,
  widgetId: PropTypes.string.isRequired,
  moveWidget: PropTypes.func.isRequired
};

export default _.flow(
  DragSource(ItemTypes.WIDGET, widgetSource, collectSource),
  DropTarget(ItemTypes.WIDGET, widgetTarget, collectTarget)
)(WidgetWrapper);

function getRemoveStyle() {
  return {
    container: {
      position: 'absolute',
      top: '0',
      right: '0',
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
