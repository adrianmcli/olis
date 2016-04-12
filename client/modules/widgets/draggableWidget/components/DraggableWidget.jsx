import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import _ from 'lodash';
import { ItemTypes } from '/lib/constants/widgets';
import DragHandle from './DragHandle.jsx';

class DraggableWidget extends Component {
  render() {
    const { isDragging, connectDragSource, connectDragPreview, connectDropTarget } = this.props;
    const { children } = this.props;
    const containerStyle = {
      opacity: isDragging ? 0 : 1,
      display: 'flex',
      padding: '12px 12px 12px 0',
    };

    return connectDropTarget(connectDragPreview(
      <div style={containerStyle}>
        { connectDragSource(<div><DragHandle /></div>) } {/* div must be there */}
        <div style={{flexGrow: '1', maxWidth: 'calc(100% - 22px)'}}>{ children }</div>
      </div>
    ));
  }
}
DraggableWidget.propTypes = {
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


const widgetSource = {
  beginDrag(props) {
    return {
      widgetId: props.widgetId,
      index: props.index
    };
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const widgetTarget = {
  hover(props, monitor, component) {
    const { widgetId, index: dragIndex } = monitor.getItem();
    const { index: hoverIndex, moveWidget, noteId } = props;

    if (dragIndex === hoverIndex) { return; }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return; }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return; }

    const throttledMove = _.throttle(() => {
      // Time to actually perform the action
      moveWidget(noteId, widgetId, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }, 500);
    throttledMove();
  }
};

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export default _.flow(
  DragSource(ItemTypes.WIDGET, widgetSource, collectSource),
  DropTarget(ItemTypes.WIDGET, widgetTarget, collectTarget)
)(DraggableWidget);
