import { findDOMNode } from 'react-dom';
import _ from 'lodash';

export const widgetSource = {
  beginDrag(props) {
    return {
      widgetId: props.widgetId,
      index: props.index
    };
  }
};

export function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

export const widgetTarget = {
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

export function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}
