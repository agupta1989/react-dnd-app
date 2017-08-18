import React, {Component} from 'react';
import { ItemTypes } from '../Constant';
import { DragSource } from 'react-dnd';
import Course from '../Course';

const getStyles = (props) => {
    const { isDragging, isDisabled } = props;
    const opacity = (isDisabled || isDragging) ? 0.5 : 1;

    return {
      opacity,
    };
}

const dragSource = {
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

class DraggableCourse extends Component {
    render() {
        const { connectDragSource, course, index, isDisabled } = this.props;
        return (
            connectDragSource(
                <div style={getStyles(this.props)}>
                    <Course isDisabled={isDisabled} course={course} index={index}/>
                </div>
            )
        );
    }
}

export default DragSource(ItemTypes.COURSE, dragSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})(DraggableCourse);

