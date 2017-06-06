import React, {Component} from 'react';
import { ItemTypes } from '../Constant';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from "react-dom";
import Course from '../Course';

const getStyles = (props) => {
    const { left, top, isDragging, isDisabled } = props;
    const transform = `translate3d(${left}px, ${top}px, 0)`;
    const opacity = isDisabled ? 0.5 : (isDragging ? 0 : 1);

    return {
      transform,
      opacity,
    };
}

const courseSource = {
  beginDrag(props) {
    return {
       course: props.course,
       index: props.index,
       termId: props.termId
    };
  },
  canDrag(props, monitor) {
    if (props.isDisabled) {
      return false;
    } else {
      return true;
    }
  }
};

const termTarget = {
  hover(props, monitor, component) {
    const courseItem = monitor.getItem();
    const dragIndex = courseItem.index;
    const hoverIndex = props.index;
    const termId = props.termId;

    // Don't replace items with themselves
    if (termId === courseItem.course.termId && dragIndex === hoverIndex) {
      return;
    }

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
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard({dragIndex, hoverIndex, termId, course: courseItem.course});

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
  drop(props, monitor, component) {
      console.log("props", props);
  }
};


class DraggableCourse extends Component {
    render() {
        const { connectDragSource, connectDropTarget, course, index, isDisabled } = this.props;
        return (
            connectDragSource(connectDropTarget(
                <div style={getStyles(this.props)}>
                    <Course isDisabled={isDisabled} course={course} index={index}/>
                </div>
            ))
        );
    }
}

export default DropTarget(ItemTypes.COURSE, termTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource(ItemTypes.COURSE, courseSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})(DraggableCourse));

